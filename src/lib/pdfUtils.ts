import jsPDF from 'jspdf';
import { SITE } from '@/data/site';

export function addPdfHeaderFooter(doc: jsPDF): jsPDF {
  const pageCount = doc.internal.pages.length - 1;

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(16);
    doc.setTextColor(212, 175, 55);
    doc.text(SITE.businessName, 14, 15);

    const footerText = `${SITE.legalName} | ${SITE.phoneDisplay} | ${SITE.email}`;
    doc.setFontSize(8);
    doc.setTextColor(150);
    const textWidth =
      (doc.getStringUnitWidth(footerText) * doc.getFontSize()) / doc.internal.scaleFactor;
    const x = (doc.internal.pageSize.width - textWidth) / 2;
    doc.text(footerText, x, doc.internal.pageSize.height - 10);
  }

  return doc;
}

export function generatePdfWithHeaderFooter(
  title: string,
  mainContent: (doc: jsPDF) => void
): jsPDF {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.setTextColor(40);
  doc.text(title, 14, 28);

  mainContent(doc);
  return addPdfHeaderFooter(doc);
}
