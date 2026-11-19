import { format } from 'date-fns';
import jsPDF from 'jspdf';
import autoTable, { type UserOptions } from 'jspdf-autotable';
import { SITE } from '@/data/site';
import { formatGBP, makeId, type DocumentSection, type LineItem } from '@/lib/invoiceUtils';

export interface QuotationState {
  meta: {
    clientName: string;
    venue: string;
    eventType: string;
    eventDate: string;
    time: string;
    guestCount: number | string;
    contactNumber: string;
    quotationNo: string;
    issueDate: string;
  };
  sections: DocumentSection[];
  totals: {
    discountEnabled: boolean;
    discount: string;
    vatEnabled: boolean;
    vatRate: string;
    showCostPerHead: boolean;
  };
}

export interface QuotationTotals {
  subtotal: number;
  discount: number;
  vatAmount: number;
  grandTotal: number;
  costPerHead: number;
}

export const initialQuotationState = (): QuotationState => ({
  meta: {
    clientName: '',
    venue: '',
    eventType: '',
    eventDate: '',
    time: '',
    guestCount: 1,
    contactNumber: '',
    quotationNo: `SAL-Q-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    issueDate: new Date().toISOString().split('T')[0],
  },
  sections: [
    {
      id: makeId(),
      title: 'Food',
      mode: 'itemised',
      items: [{ id: makeId(), name: '', notes: '', price: '' }],
      subtotal: '',
      isCollapsed: false,
    },
  ],
  totals: {
    discountEnabled: false,
    discount: '',
    vatEnabled: false,
    vatRate: '20',
    showCostPerHead: false,
  },
});

const runAutoTable = (doc: jsPDF, options: UserOptions): number => {
  autoTable(doc, options);
  const lastTable = (doc as unknown as { lastAutoTable?: { finalY?: number } }).lastAutoTable;
  return lastTable?.finalY ?? (typeof options.startY === 'number' ? options.startY : 0);
};

const safeFormatDate = (dateStr: string) => {
  if (!dateStr) return 'N/A';
  const d = new Date(dateStr);
  return Number.isNaN(d.getTime()) ? dateStr : format(d, 'dd/MM/yyyy');
};

export const exportQuotationToPDF = (
  quotation: QuotationState,
  calculatedTotals: QuotationTotals
): boolean => {
  try {
    const doc = new jsPDF();
    const GOLD = '#D4AF37';
    const WHITE = '#FFFFFF';
    const NAVY = '#07052D';
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;

    const drawPageTemplate = (isFirstPage: boolean) => {
      doc.setFillColor(NAVY);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');

      if (isFirstPage) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(26);
        doc.setTextColor(GOLD);
        doc.text(SITE.businessName, pageWidth / 2, 24, { align: 'center' });

        doc.setFontSize(22);
        doc.text('Quotation', pageWidth / 2, 34, { align: 'center' });

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(WHITE);
        doc.text(`Phone: ${SITE.phoneDisplay} | Email: ${SITE.email}`, pageWidth / 2, 44, { align: 'center' });
        doc.text(`Website: www.salwahevents.com | VAT Registration Number: ${SITE.vatNo}`, pageWidth / 2, 49, {
          align: 'center',
        });
        doc.text(`Address: ${SITE.address.full}`, pageWidth / 2, 54, { align: 'center' });

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(GOLD);
        doc.text('Our Services:', pageWidth / 2, 64, { align: 'center' });
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(WHITE);
        doc.text('Catering | Decor | Full Event Management | Custom Requests', pageWidth / 2, 69, {
          align: 'center',
        });

        doc.setDrawColor(GOLD);
        doc.line(14, 80, pageWidth - 14, 80);
      }
    };

    drawPageTemplate(true);

    const meta = quotation.meta;
    const metaContent = [
      ['Client:', meta.clientName || 'N/A'],
      ['Venue:', meta.venue || 'N/A'],
      ['Event Date:', safeFormatDate(meta.eventDate)],
      ['Guests:', String(meta.guestCount || 'N/A')],
      ['Contact:', meta.contactNumber || 'N/A'],
    ];

    const metaContent2 = [
      ['Quotation No:', meta.quotationNo || 'N/A'],
      ['Issue Date:', safeFormatDate(meta.issueDate)],
      ['Event Time:', meta.time || 'N/A'],
      ['Event Type:', meta.eventType || 'N/A'],
      ['', ''],
    ];

    const y1 = runAutoTable(doc, {
      startY: 88,
      body: metaContent,
      theme: 'plain',
      styles: { fontSize: 10, textColor: WHITE, font: 'helvetica' },
      columnStyles: { 0: { fontStyle: 'bold', cellWidth: 30, textColor: GOLD } },
      tableWidth: pageWidth / 2 - 16,
    });

    const y2 = runAutoTable(doc, {
      startY: 88,
      body: metaContent2,
      theme: 'plain',
      styles: { fontSize: 10, textColor: WHITE, font: 'helvetica' },
      columnStyles: { 0: { fontStyle: 'bold', cellWidth: 30, textColor: GOLD } },
      tableWidth: pageWidth / 2 - 16,
      margin: { left: pageWidth / 2 + 2 },
    });

    let lastY = Math.max(y1, y2, 95);

    for (const section of quotation.sections) {
      if (lastY + 50 > pageHeight) {
        doc.addPage();
        drawPageTemplate(false);
        lastY = 20;
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(GOLD);
      doc.text(section.title || 'Section', 14, lastY + 12);

      const sectionTotal =
        section.mode === 'itemised'
          ? section.items.reduce((acc, item) => acc + (Number(item.price) || 0), 0)
          : Number(section.subtotal) || 0;

      const bodyData =
        section.mode === 'itemised'
          ? section.items.map((item) => [item.name, item.notes, formatGBP(item.price)])
          : section.items.map((item) => [item.name, item.notes, '']);

      const sectionFinalY = runAutoTable(doc, {
        startY: lastY + 17,
        head: [['Item', 'Notes', 'Price']],
        body: bodyData,
        foot: [['Section Total', '', formatGBP(sectionTotal)]],
        theme: 'grid',
        styles: { textColor: WHITE, fillColor: NAVY, lineColor: GOLD, lineWidth: 0.1, font: 'helvetica' },
        headStyles: { fillColor: GOLD, textColor: NAVY, fontStyle: 'bold' },
        footStyles: { fillColor: GOLD, textColor: NAVY, fontStyle: 'bold' },
        columnStyles: { 2: { halign: 'right' } },
        didDrawPage: (data) => {
          if (data.pageNumber > 1) drawPageTemplate(false);
        },
      });
      lastY = sectionFinalY + 10;
    }

    if (lastY + 80 > pageHeight) {
      doc.addPage();
      drawPageTemplate(false);
      lastY = 20;
    }

    const totalsData: unknown[][] = [
      [{ content: 'Subtotal', styles: { halign: 'right', fontStyle: 'bold' } }, formatGBP(calculatedTotals.subtotal)],
    ];
    if (quotation.totals.discountEnabled && calculatedTotals.discount > 0) {
      totalsData.push([
        { content: 'Discount', styles: { halign: 'right', fontStyle: 'bold' } },
        `-${formatGBP(calculatedTotals.discount)}`,
      ]);
    }
    if (quotation.totals.vatEnabled) {
      totalsData.push([
        { content: `VAT (${quotation.totals.vatRate}%)`, styles: { halign: 'right', fontStyle: 'bold' } },
        formatGBP(calculatedTotals.vatAmount),
      ]);
    }

    lastY = runAutoTable(doc, {
      startY: lastY,
      head: [[{ content: 'Quotation Summary', colSpan: 2, styles: { halign: 'center', fontStyle: 'bold', fillColor: GOLD, textColor: NAVY } }]],
      body: totalsData as never,
      theme: 'grid',
      styles: { textColor: WHITE, fillColor: NAVY, lineColor: GOLD, lineWidth: 0.1, halign: 'right', font: 'helvetica' },
      tableWidth: 92,
      margin: { left: pageWidth - 14 - 92 },
    });

    lastY = runAutoTable(doc, {
      startY: lastY,
      body: [
        [
          { content: 'Total Cost', styles: { halign: 'right', fontStyle: 'bold', textColor: NAVY, fontSize: 13, fillColor: GOLD } },
          { content: formatGBP(calculatedTotals.grandTotal), styles: { fontStyle: 'bold', fontSize: 13, textColor: NAVY, fillColor: GOLD } },
        ],
      ],
      theme: 'grid',
      styles: { lineColor: GOLD, lineWidth: 0.1, halign: 'right', font: 'helvetica' },
      tableWidth: 92,
      margin: { left: pageWidth - 14 - 92 },
    });

    if (quotation.totals.showCostPerHead && calculatedTotals.costPerHead > 0) {
      runAutoTable(doc, {
        startY: lastY + 4,
        body: [
          [
            { content: 'Cost Per Head', styles: { fontStyle: 'bold', textColor: NAVY, fillColor: GOLD } },
            { content: formatGBP(calculatedTotals.costPerHead), styles: { textColor: NAVY, fillColor: GOLD } },
          ],
        ],
        theme: 'grid',
        styles: { lineColor: GOLD, lineWidth: 0.1, halign: 'right', font: 'helvetica' },
        tableWidth: 92,
        margin: { left: pageWidth - 14 - 92 },
      });
    }

    doc.save(`Quotation_${quotation.meta.quotationNo}.pdf`);
    return true;
  } catch (err) {
    console.error('Failed to generate quotation PDF:', err);
    return false;
  }
};

export const exportQuotationToJSON = (quotation: QuotationState) => {
  const blob = new Blob([JSON.stringify(quotation, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `quotation_${quotation.meta.quotationNo}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const parseQuotationJSON = (jsonText: string): QuotationState => {
  const parsed = JSON.parse(jsonText);
  if (!parsed.meta || !parsed.sections || !parsed.totals) {
    throw new Error('Invalid quotation JSON structure');
  }
  const toIsoDate = (val: unknown) => {
    if (!val) return '';
    if (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}/.test(val)) return val.slice(0, 10);
    const d = new Date(String(val));
    return Number.isNaN(d.getTime()) ? '' : d.toISOString().split('T')[0];
  };
  return {
    ...parsed,
    meta: {
      ...parsed.meta,
      eventDate: toIsoDate(parsed.meta.eventDate),
      issueDate: toIsoDate(parsed.meta.issueDate) || new Date().toISOString().split('T')[0],
    },
    sections: parsed.sections.map((section: DocumentSection) => ({
      ...section,
      id: section.id || makeId(),
      items: (section.items || []).map((item: LineItem) => ({
        ...item,
        id: item.id || makeId(),
      })),
    })),
  };
};
