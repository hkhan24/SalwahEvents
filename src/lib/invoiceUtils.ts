import { format } from 'date-fns';
import jsPDF from 'jspdf';
import autoTable, { type UserOptions } from 'jspdf-autotable';
import { SITE } from '@/data/site';

export interface LineItem {
  id: string;
  name: string;
  notes: string;
  price: string;
}

export interface DocumentSection {
  id: string;
  title: string;
  mode: 'itemised' | 'subtotal';
  items: LineItem[];
  subtotal: string;
  isCollapsed: boolean;
}

export interface InvoiceState {
  meta: {
    clientName: string;
    venue: string;
    eventType: string;
    eventDate: string;
    time: string;
    guestCount: number | string;
    contactNumber: string;
    invoiceNo: string;
    issueDate: string;
  };
  sections: DocumentSection[];
  totals: {
    discountEnabled: boolean;
    discount: string;
    vatEnabled: boolean;
    vatRate: string;
    depositPaid: string;
    showCostPerHead: boolean;
  };
}

export interface InvoiceTotals {
  subtotal: number;
  discount: number;
  vatAmount: number;
  grandTotal: number;
  amountDue: number;
  costPerHead: number;
}

export const makeId = () =>
  typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export const initialInvoiceState = (): InvoiceState => ({
  meta: {
    clientName: '',
    venue: '',
    eventType: '',
    eventDate: '',
    time: '',
    guestCount: 1,
    contactNumber: '',
    invoiceNo: `SAL-I-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
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
    depositPaid: '',
    showCostPerHead: false,
  },
});

export const formatGBP = (value: number | string) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(Number(value) || 0);

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

export const exportInvoiceToPDF = (invoice: InvoiceState, calculatedTotals: InvoiceTotals): boolean => {
  try {
    const doc = new jsPDF();
    const GOLD = '#D4AF37';
    const WHITE = '#FFFFFF';
    const BLACK = '#000000';
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;

    const drawPageTemplate = (isFirstPage: boolean) => {
      doc.setFillColor(BLACK);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');

      if (isFirstPage) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(26);
        doc.setTextColor(GOLD);
        doc.text(SITE.businessName, pageWidth / 2, 24, { align: 'center' });

        doc.setFontSize(22);
        doc.text('Invoice', pageWidth / 2, 34, { align: 'center' });

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

    const meta = invoice.meta;
    const metaContent = [
      ['Client:', meta.clientName || 'N/A'],
      ['Venue:', meta.venue || 'N/A'],
      ['Event Date:', safeFormatDate(meta.eventDate)],
      ['Guests:', String(meta.guestCount || 'N/A')],
      ['Contact:', meta.contactNumber || 'N/A'],
    ];

    const metaContent2 = [
      ['Invoice No:', meta.invoiceNo || 'N/A'],
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

    for (const section of invoice.sections) {
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
        styles: { textColor: WHITE, fillColor: BLACK, lineColor: GOLD, lineWidth: 0.1, font: 'helvetica' },
        headStyles: { fillColor: GOLD, textColor: BLACK, fontStyle: 'bold' },
        footStyles: { fillColor: GOLD, textColor: BLACK, fontStyle: 'bold' },
        columnStyles: { 2: { halign: 'right' } },
        didDrawPage: (data) => {
          if (data.pageNumber > 1) drawPageTemplate(false);
        },
      });
      lastY = sectionFinalY + 10;
    }

    if (lastY + 90 > pageHeight) {
      doc.addPage();
      drawPageTemplate(false);
      lastY = 20;
    }

    const totalsData: unknown[][] = [
      [{ content: 'Subtotal', styles: { halign: 'right', fontStyle: 'bold' } }, formatGBP(calculatedTotals.subtotal)],
    ];
    if (invoice.totals.discountEnabled && calculatedTotals.discount > 0) {
      totalsData.push([
        { content: 'Discount', styles: { halign: 'right', fontStyle: 'bold' } },
        `-${formatGBP(calculatedTotals.discount)}`,
      ]);
    }
    if (invoice.totals.vatEnabled) {
      totalsData.push([
        { content: `VAT (${invoice.totals.vatRate}%)`, styles: { halign: 'right', fontStyle: 'bold' } },
        formatGBP(calculatedTotals.vatAmount),
      ]);
    }
    if (Number(invoice.totals.depositPaid) > 0) {
      totalsData.push([
        { content: 'Deposit Paid', styles: { halign: 'right', fontStyle: 'bold' } },
        `-${formatGBP(invoice.totals.depositPaid)}`,
      ]);
    }

    lastY = runAutoTable(doc, {
      startY: lastY,
      head: [[{ content: 'Invoice Summary', colSpan: 2, styles: { halign: 'center', fontStyle: 'bold', fillColor: GOLD, textColor: BLACK } }]],
      body: totalsData as never,
      theme: 'grid',
      styles: { textColor: WHITE, fillColor: BLACK, lineColor: GOLD, lineWidth: 0.1, halign: 'right', font: 'helvetica' },
      tableWidth: 92,
      margin: { left: pageWidth - 14 - 92 },
    });

    lastY = runAutoTable(doc, {
      startY: lastY,
      body: [
        [
          { content: 'Amount Due', styles: { halign: 'right', fontStyle: 'bold', textColor: BLACK, fontSize: 13, fillColor: GOLD } },
          { content: formatGBP(calculatedTotals.amountDue), styles: { fontStyle: 'bold', fontSize: 13, textColor: BLACK, fillColor: GOLD } },
        ],
      ],
      theme: 'grid',
      styles: { lineColor: GOLD, lineWidth: 0.1, halign: 'right', font: 'helvetica' },
      tableWidth: 92,
      margin: { left: pageWidth - 14 - 92 },
    });

    let paymentStartY = lastY + 12;

    if (invoice.totals.showCostPerHead && calculatedTotals.costPerHead > 0) {
      const cphY = runAutoTable(doc, {
        startY: lastY + 4,
        body: [
          [
            { content: 'Cost Per Head', styles: { fontStyle: 'bold', textColor: BLACK, fillColor: GOLD } },
            { content: formatGBP(calculatedTotals.costPerHead), styles: { textColor: BLACK, fillColor: GOLD } },
          ],
        ],
        theme: 'grid',
        styles: { lineColor: GOLD, lineWidth: 0.1, halign: 'right', font: 'helvetica' },
        tableWidth: 92,
        margin: { left: pageWidth - 14 - 92 },
      });
      paymentStartY = cphY + 12;
    }

    lastY = paymentStartY;
    if (lastY + 35 > pageHeight) {
      doc.addPage();
      drawPageTemplate(false);
      lastY = 20;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(GOLD);
    doc.text('Payment Details:', 14, lastY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(WHITE);
    doc.text('Please make payment to the following account:', 14, lastY + 7);
    doc.text('Account Name: Salwah Events & Catering', 14, lastY + 12);
    doc.text('Account Number: 53003353', 14, lastY + 17);
    doc.text('Sort Code: 04-00-03', 14, lastY + 22);
    doc.text(`Reference: ${invoice.meta.invoiceNo || 'Invoice'}`, 14, lastY + 27);

    doc.save(`Invoice_${invoice.meta.invoiceNo}.pdf`);
    return true;
  } catch (err) {
    console.error('Failed to generate invoice PDF:', err);
    return false;
  }
};

export const exportInvoiceToJSON = (invoice: InvoiceState) => {
  const blob = new Blob([JSON.stringify(invoice, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `invoice_${invoice.meta.invoiceNo}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const parseInvoiceJSON = (jsonText: string): InvoiceState => {
  const parsed = JSON.parse(jsonText);
  if (!parsed.meta || !parsed.sections || !parsed.totals) {
    throw new Error('Invalid invoice JSON structure');
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
