import jsPDF from 'jspdf';
import 'jspdf-autotable';

const addPdfHeaderFooter = (doc, title) => {
  const pageCount = doc.internal.getNumberOfPages();

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    
    doc.setFontSize(16);
    doc.setTextColor(212, 175, 55);
    doc.text('Salwah Events & Catering', 14, 15);

    const footerText = 'Salwah Events Ltd | 07359 337887 | info@salwahevents.com';
    doc.setFontSize(8);
    doc.setTextColor(150);
    const textWidth = doc.getStringUnitWidth(footerText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const x = (doc.internal.pageSize.width - textWidth) / 2;
    doc.text(footerText, x, doc.internal.pageSize.height - 10);
  }
  
  return doc;
};

export const generatePdfWithHeaderFooter = (title, mainContent) => {
  let doc = new jsPDF();
  
  doc.setFontSize(18);
  doc.setTextColor(40);
  doc.text(title, 14, 28);
  
  mainContent(doc);

  doc = addPdfHeaderFooter(doc, title);
  
  return doc;
};