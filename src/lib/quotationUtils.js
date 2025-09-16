import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const initialQuotationState = () => ({
  meta: {
    clientName: '',
    venue: '',
    eventType: '',
    eventDate: null,
    time: '',
    guestCount: 1,
    contactNumber: '',
    quotationNo: `SAL-Q-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    issueDate: new Date(),
  },
  sections: [
    {
      id: uuidv4(),
      title: 'Food',
      mode: 'itemised',
      items: [{ id: uuidv4(), name: '', notes: '', price: '' }],
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

const formatCurrency = (value) => new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
}).format(Number(value) || 0);

export const exportQuotationToPDF = async (quotation, calculatedTotals) => {
  try {
    const doc = new jsPDF();
    const GOLD = '#D4AF37';
    const WHITE = '#FFFFFF';
    const NAVY = '#07052D';
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;

    const drawPageTemplate = (isFirstPage) => {
      doc.setFillColor(NAVY);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
      
      if(isFirstPage) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(28);
        doc.setTextColor(GOLD);
        doc.text('Salwah Events & Catering', pageWidth / 2, 25, { align: 'center' });

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(24);
        doc.setTextColor(GOLD);
        doc.text('Quotation', pageWidth / 2, 35, { align: 'center' });
    
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(WHITE);
        doc.text('Phone: 07359 337887 | Email: info@salwahevents.com', pageWidth / 2, 45, { align: 'center' });
        doc.text('Website: www.salwahevents.com | VAT Registration Number: 497422947', pageWidth / 2, 50, { align: 'center' });
        doc.text('Address: 19 Unit 7 Landmark, Commercial Rd, Edmonton, London, N18 1UB', pageWidth / 2, 55, { align: 'center' });
        
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(GOLD);
        doc.text('Our Services:', pageWidth / 2, 65, { align: 'center' });
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(WHITE);
        doc.text('Catering | Decor | Full Event Management | Custom Requests', pageWidth / 2, 70, { align: 'center' });

        doc.setDrawColor(GOLD);
        doc.line(14, 85, pageWidth -14, 85);
      }
    };

    drawPageTemplate(true);
    
    const meta = quotation.meta;
    const metaContent = [
      ['Client:', meta.clientName || 'N/A'],
      ['Venue:', meta.venue || 'N/A'],
      ['Event Date:', meta.eventDate ? format(new Date(meta.eventDate), 'dd/MM/yyyy') : 'N/A'],
      ['Guests:', meta.guestCount || 'N/A'],
      ['Contact:', meta.contactNumber || 'N/A'],
    ];

    const metaContent2 = [
      ['Quotation No:', meta.quotationNo || 'N/A'],
      ['Issue Date:', meta.issueDate ? format(new Date(meta.issueDate), 'dd/MM/yyyy') : 'N/A'],
      ['Event Time:', meta.time || 'N/A'],
      ['Event Type:', meta.eventType || 'N/A'],
      ['', ''],
    ];

    doc.autoTable({
        startY: 95,
        body: metaContent,
        theme: 'plain',
        styles: { fontSize: 10, textColor: WHITE, font: 'helvetica' },
        columnStyles: { 0: { fontStyle: 'bold', cellWidth: 30, textColor: GOLD } },
        tableWidth: (pageWidth / 2) - 14 - 2,
    });
    
    doc.autoTable({
        startY: 95,
        body: metaContent2,
        theme: 'plain',
        styles: { fontSize: 10, textColor: WHITE, font: 'helvetica' },
        columnStyles: { 0: { fontStyle: 'bold', cellWidth: 30, textColor: GOLD } },
        tableWidth: (pageWidth / 2) - 14 - 2,
        margin: { left: pageWidth / 2 + 2 },
    });

    let lastY = doc.autoTable.previous.finalY;

    for (const section of quotation.sections) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor(GOLD);
      
      const startYForSection = lastY + 12;
      if (startYForSection + 40 > pageHeight) { // rough check for space
        doc.addPage();
        drawPageTemplate(false);
        lastY = 20;
      }

      doc.text(section.title, 14, lastY + 12);
      
      const sectionTotal = section.mode === 'itemised'
        ? section.items.reduce((acc, item) => acc + (Number(item.price) || 0), 0)
        : Number(section.subtotal) || 0;
        
      const bodyData = section.mode === 'itemised'
          ? section.items.map(item => [item.name, item.notes, item.price ? formatCurrency(Number(item.price)) : formatCurrency(0)])
          : section.items.map(item => [item.name, item.notes, '']);
      
      doc.autoTable({
        startY: lastY + 18,
        head: [['Item', 'Notes', 'Price']],
        body: bodyData,
        foot: [['Section Total', '', formatCurrency(sectionTotal)]],
        theme: 'grid',
        styles: { textColor: WHITE, fillColor: NAVY, lineColor: GOLD, lineWidth: 0.1, font: 'helvetica' },
        headStyles: { fillColor: GOLD, textColor: NAVY, fontStyle: 'bold' },
        footStyles: { fillColor: GOLD, textColor: NAVY, fontStyle: 'bold' },
        columnStyles: { 2: { halign: 'right' } },
        didDrawPage: (data) => {
          if (data.pageNumber > 1) {
            drawPageTemplate(false);
          }
        },
      });
      lastY = doc.autoTable.previous.finalY + 10;
    }

    const startYForTotals = lastY + 10;
    if (startYForTotals + 80 > pageHeight) { // rough check for totals
      doc.addPage();
      drawPageTemplate(false);
      lastY = 20;
    }

    const totalsBody = [
      { content: 'Subtotal', styles: { halign: 'right', fontStyle: 'bold' } },
      formatCurrency(calculatedTotals.subtotal),
    ];
    if (quotation.totals.discountEnabled && calculatedTotals.discount > 0) {
      totalsBody.push({ content: 'Discount', styles: { halign: 'right', fontStyle: 'bold' } });
      totalsBody.push(`-${formatCurrency(calculatedTotals.discount)}`);
    }
    if (quotation.totals.vatEnabled) {
      totalsBody.push({ content: `VAT (${quotation.totals.vatRate}%)`, styles: { halign: 'right', fontStyle: 'bold' } });
      totalsBody.push(formatCurrency(calculatedTotals.vatAmount));
    }
    
    const totalsData = [];
    for (let i = 0; i < totalsBody.length; i += 2) {
        totalsData.push([totalsBody[i], totalsBody[i + 1]]);
    }
    
    const finalTotals = [
      [{ content: 'Total Cost', styles: { halign: 'right', fontStyle: 'bold', textColor: NAVY, fontSize: 14 } }, { content: formatCurrency(calculatedTotals.grandTotal), styles: { fontStyle: 'bold', fontSize: 14, textColor: NAVY } }],
    ];

    doc.autoTable({
      startY: lastY,
      head: [[{content:'Quotation Summary', colSpan: 2, styles:{halign:'center', fontStyle:'bold', fillColor:GOLD, textColor:NAVY}}]],
      body: totalsData,
      theme: 'grid',
      styles: { textColor: WHITE, fillColor: NAVY, lineColor: GOLD, lineWidth: 0.1, halign: 'right', font: 'helvetica' },
      tableWidth: 90,
      margin: { left: pageWidth - 14 - 90 },
      columnStyles: { 0: { font: 'helvetica' }, 1: { font: 'helvetica' } },
      didDrawPage: (data) => {
        if (data.pageNumber > 1) {
          drawPageTemplate(false);
        }
      },
    });
    
    lastY = doc.autoTable.previous.finalY;

    doc.autoTable({
        startY: lastY,
        body: finalTotals,
        theme: 'grid',
        styles: { textColor: WHITE, fillColor: NAVY, lineColor: GOLD, lineWidth: 0.1, halign: 'right', font: 'helvetica' },
        tableWidth: 90,
        margin: { left: pageWidth - 14 - 90 },
        didParseCell: function(data) {
          if (data.row.index === finalTotals.length - 1) {
            data.cell.styles.fillColor = GOLD;
          }
        },
        didDrawPage: (data) => {
          if (data.pageNumber > 1) {
            drawPageTemplate(false);
          }
        },
    });
    
    lastY = doc.autoTable.previous.finalY;
    
    if (quotation.totals.showCostPerHead && calculatedTotals.costPerHead > 0) {
      const costPerHeadData = [
        [{ content: 'Cost Per Head', styles: { fontStyle: 'bold', textColor: NAVY } }, { content: formatCurrency(calculatedTotals.costPerHead), styles: { textColor: NAVY } }]
      ];
      doc.autoTable({
        startY: lastY + 5,
        body: costPerHeadData,
        theme: 'grid',
        styles: { textColor: WHITE, fillColor: GOLD, lineColor: GOLD, lineWidth: 0.1, halign: 'right', font: 'helvetica' },
        tableWidth: 90,
        margin: { left: pageWidth - 14 - 90 },
        didDrawPage: (data) => {
          if (data.pageNumber > 1) {
            drawPageTemplate(false);
          }
        },
      });
    }
    
    doc.save(`Quotation_${quotation.meta.quotationNo}.pdf`);
    return true;
  } catch (error) {
    console.error("Failed to generate PDF:", error);
    return false;
  }
};

export const exportQuotationToJSON = (quotation) => {
  const jsonString = JSON.stringify(quotation, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `quotation_${quotation.meta.quotationNo}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const importQuotationFromJSON = (jsonText, onComplete, onError) => {
  try {
    const parsed = JSON.parse(jsonText);
    
    if (!parsed.meta || !parsed.sections || !parsed.totals) {
      throw new Error("Invalid JSON structure");
    }

    if (parsed.meta.eventDate) {
      parsed.meta.eventDate = new Date(parsed.meta.eventDate);
    }
    if (parsed.meta.issueDate) {
      parsed.meta.issueDate = new Date(parsed.meta.issueDate);
    }

    parsed.sections = parsed.sections.map(section => ({
      ...section,
      id: section.id || uuidv4(),
      items: section.items.map(item => ({
        ...item,
        id: item.id || uuidv4(),
      })),
    }));

    onComplete(parsed);
  } catch (error) {
    console.error("JSON Import Error:", error);
    onError();
  }
};