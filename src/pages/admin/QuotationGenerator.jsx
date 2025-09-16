import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Plus } from 'lucide-react';

import { initialQuotationState, exportQuotationToPDF, exportQuotationToJSON, importQuotationFromJSON } from '@/lib/quotationUtils';
import QuotationHeader from '@/pages/admin/quotation-generator/QuotationHeader';
import ClientInfoSection from '@/pages/admin/quotation-generator/ClientInfoSection';
import InvoiceSection from '@/pages/admin/invoice-generator/InvoiceSection'; // Re-usable
import TotalsSidebar from '@/pages/admin/quotation-generator/TotalsSidebar';

const QuotationGenerator = () => {
  const { toast } = useToast();
  const [quotation, setQuotation] = useState(initialQuotationState);
  const [isMounted, setIsMounted] = useState(false);

  const calculatedTotals = useMemo(() => {
    const subtotal = quotation.sections.reduce((acc, section) => {
      const sectionTotal = section.mode === 'itemised'
        ? section.items.reduce((itemAcc, item) => itemAcc + (Number(item.price) || 0), 0)
        : Number(section.subtotal) || 0;
      return acc + sectionTotal;
    }, 0);

    const discount = quotation.totals.discountEnabled ? (Number(quotation.totals.discount) || 0) : 0;
    const subtotalAfterDiscount = subtotal - discount;
    const vatAmount = quotation.totals.vatEnabled ? subtotalAfterDiscount * ((Number(quotation.totals.vatRate) || 0) / 100) : 0;
    const grandTotal = subtotalAfterDiscount + vatAmount;
    const guestCount = Number(quotation.meta.guestCount) || 1;
    const costPerHead = grandTotal > 0 && guestCount > 0 ? grandTotal / guestCount : 0;

    return { subtotal, discount, vatAmount, grandTotal, costPerHead };
  }, [quotation]);

  const saveDraft = useCallback(() => {
    try {
      localStorage.setItem('quotationDraft', JSON.stringify(quotation));
      toast({ title: 'Draft Saved!', description: 'Your quotation has been saved locally.' });
    } catch (error) {
      toast({ title: 'Save Failed', description: 'Could not save draft to local storage.', variant: 'destructive' });
    }
  }, [quotation, toast]);

  useEffect(() => {
    const loadedDraft = localStorage.getItem('quotationDraft');
    if (loadedDraft) {
      try {
        const parsed = JSON.parse(loadedDraft);
        if (parsed.meta) {
          parsed.meta.eventDate = parsed.meta.eventDate ? new Date(parsed.meta.eventDate) : null;
          parsed.meta.issueDate = parsed.meta.issueDate ? new Date(parsed.meta.issueDate) : new Date();
        }
        setQuotation(parsed);
      } catch (error) {
        console.error("Failed to parse quotation draft from localStorage", error);
        localStorage.removeItem('quotationDraft');
      }
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const handler = setTimeout(() => {
      localStorage.setItem('quotationDraft', JSON.stringify(quotation));
    }, 10000);
    return () => clearTimeout(handler);
  }, [quotation, isMounted]);

  const handleUpdateQuotation = useCallback((updater) => {
    setQuotation(updater);
  }, []);

  const addSection = () => {
    const newSection = {
      id: uuidv4(),
      title: 'New Section',
      mode: 'itemised',
      items: [{ id: uuidv4(), name: '', notes: '', price: '' }],
      subtotal: '',
      isCollapsed: false,
    };
    handleUpdateQuotation(prev => ({ ...prev, sections: [...prev.sections, newSection] }));
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const newSections = Array.from(quotation.sections);
    const [reorderedItem] = newSections.splice(result.source.index, 1);
    newSections.splice(result.destination.index, 0, reorderedItem);
    handleUpdateQuotation(prev => ({ ...prev, sections: newSections }));
  };
  
  const resetQuotation = () => {
    setQuotation(initialQuotationState());
    localStorage.removeItem('quotationDraft');
    toast({ title: 'Quotation Reset', description: 'The form has been cleared.' });
  };

  const duplicateQuotation = () => {
    const newQuotationNo = initialQuotationState().meta.quotationNo;
    setQuotation(prev => ({ ...prev, meta: { ...prev.meta, quotationNo: newQuotationNo } }));
    toast({ title: 'Quotation Duplicated', description: `A new quotation has been created with number ${newQuotationNo}.` });
  };
  
  const handleExportPDF = async () => {
    toast({ title: 'Generating PDF...', description: 'Your quotation is being created.' });
    const success = await exportQuotationToPDF(quotation, calculatedTotals);
    if (!success) {
      toast({ title: 'Error!', description: 'Could not generate PDF. Please try again.', variant: 'destructive'});
    }
  };
  
  const handleExportJSON = () => exportQuotationToJSON(quotation);

  const handleImportJSON = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      importQuotationFromJSON(
        e.target.result,
        (newQuotation) => {
          setQuotation(newQuotation);
          toast({ title: 'JSON Imported!', description: 'Quotation data has been loaded.' });
        },
        () => toast({ title: 'Import Failed', description: 'Could not parse the JSON file.', variant: 'destructive' })
      );
    };
    reader.readAsText(file);
    event.target.value = null;
  };
  
  return (
    <>
      <Helmet>
        <title>Quotation Generator | Salwah Events Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="bg-black text-white min-h-screen">
        <QuotationHeader
          onSave={saveDraft}
          onDuplicate={duplicateQuotation}
        />

        <main className="max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <ClientInfoSection 
                meta={quotation.meta} 
                updateMeta={(newMeta) => handleUpdateQuotation(prev => ({ ...prev, meta: newMeta }))}
              />

              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="sections">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-6">
                      {quotation.sections.map((section, index) => (
                        <Draggable key={section.id} draggableId={section.id} index={index}>
                          {(provided) => (
                            <InvoiceSection
                              section={section}
                              provided={provided}
                              updateInvoice={handleUpdateQuotation}
                            />
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              <Button onClick={addSection} variant="outline" className="w-full border-gold text-gold hover:bg-gold hover:text-black">
                <Plus className="mr-2 h-4 w-4" /> Add Section
              </Button>
            </div>

            <TotalsSidebar
              totals={quotation.totals}
              calculatedTotals={calculatedTotals}
              updateTotals={(newTotals) => handleUpdateQuotation(prev => ({ ...prev, totals: newTotals }))}
              onImport={handleImportJSON}
              onExportJSON={handleExportJSON}
              onExportPDF={handleExportPDF}
              onReset={resetQuotation}
            />
          </div>
        </main>
      </div>
    </>
  );
};

export default QuotationGenerator;