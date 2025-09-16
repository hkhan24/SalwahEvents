import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Plus } from 'lucide-react';

import { initialInvoiceState, exportToPDF, exportToJSON, importFromJSON } from '@/lib/invoiceUtils';
import InvoiceHeader from '@/pages/admin/invoice-generator/InvoiceHeader';
import ClientInfoSection from '@/pages/admin/invoice-generator/ClientInfoSection';
import InvoiceSection from '@/pages/admin/invoice-generator/InvoiceSection';
import TotalsSidebar from '@/pages/admin/invoice-generator/TotalsSidebar';

const InvoiceGenerator = () => {
  const { toast } = useToast();
  const [invoice, setInvoice] = useState(initialInvoiceState);
  const [isMounted, setIsMounted] = useState(false);

  const calculatedTotals = useMemo(() => {
    const subtotal = invoice.sections.reduce((acc, section) => {
      const sectionTotal = section.mode === 'itemised'
        ? section.items.reduce((itemAcc, item) => itemAcc + (Number(item.price) || 0), 0)
        : Number(section.subtotal) || 0;
      return acc + sectionTotal;
    }, 0);

    const discount = invoice.totals.discountEnabled ? (Number(invoice.totals.discount) || 0) : 0;
    const subtotalAfterDiscount = subtotal - discount;
    const vatAmount = invoice.totals.vatEnabled ? subtotalAfterDiscount * ((Number(invoice.totals.vatRate) || 0) / 100) : 0;
    const grandTotal = subtotalAfterDiscount + vatAmount;
    const depositPaid = Number(invoice.totals.depositPaid) || 0;
    const amountDue = grandTotal - depositPaid;
    const guestCount = Number(invoice.meta.guestCount) || 1;
    const costPerHead = amountDue > 0 && guestCount > 0 ? amountDue / guestCount : 0;

    return { subtotal, discount, vatAmount, grandTotal, amountDue, costPerHead };
  }, [invoice]);

  const saveDraft = useCallback(() => {
    try {
      localStorage.setItem('invoiceDraft', JSON.stringify(invoice));
      toast({ title: 'Draft Saved!', description: 'Your invoice has been saved locally.' });
    } catch (error) {
      toast({ title: 'Save Failed', description: 'Could not save draft to local storage.', variant: 'destructive' });
    }
  }, [invoice, toast]);

  useEffect(() => {
    const loadedDraft = localStorage.getItem('invoiceDraft');
    if (loadedDraft) {
      try {
        const parsed = JSON.parse(loadedDraft);
        if (parsed.meta) {
          parsed.meta.eventDate = parsed.meta.eventDate ? new Date(parsed.meta.eventDate) : null;
          parsed.meta.issueDate = parsed.meta.issueDate ? new Date(parsed.meta.issueDate) : new Date();
        }
        setInvoice(parsed);
      } catch (error) {
        console.error("Failed to parse invoice draft from localStorage", error);
        localStorage.removeItem('invoiceDraft');
      }
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const handler = setTimeout(() => {
      localStorage.setItem('invoiceDraft', JSON.stringify(invoice));
    }, 10000);
    return () => clearTimeout(handler);
  }, [invoice, isMounted]);

  const handleUpdateInvoice = useCallback((updater) => {
    setInvoice(updater);
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
    handleUpdateInvoice(prev => ({ ...prev, sections: [...prev.sections, newSection] }));
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const newSections = Array.from(invoice.sections);
    const [reorderedItem] = newSections.splice(result.source.index, 1);
    newSections.splice(result.destination.index, 0, reorderedItem);
    handleUpdateInvoice(prev => ({ ...prev, sections: newSections }));
  };
  
  const resetInvoice = () => {
    setInvoice(initialInvoiceState());
    localStorage.removeItem('invoiceDraft');
    toast({ title: 'Invoice Reset', description: 'The form has been cleared.' });
  };

  const duplicateInvoice = () => {
    const newInvoiceNo = initialInvoiceState().meta.invoiceNo;
    setInvoice(prev => ({ ...prev, meta: { ...prev.meta, invoiceNo: newInvoiceNo } }));
    toast({ title: 'Invoice Duplicated', description: `A new invoice has been created with number ${newInvoiceNo}.` });
  };
  
  const handleExportPDF = async () => {
    toast({ title: 'Generating PDF...', description: 'Your invoice is being created.' });
    const success = await exportToPDF(invoice, calculatedTotals);
    if (!success) {
      toast({ title: 'Error!', description: 'Could not generate PDF. Please try again.', variant: 'destructive'});
    }
  };
  
  const handleExportJSON = () => exportToJSON(invoice);

  const handleImportJSON = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      importFromJSON(
        e.target.result,
        (newInvoice) => {
          setInvoice(newInvoice);
          toast({ title: 'JSON Imported!', description: 'Invoice data has been loaded.' });
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
        <title>Invoice Generator | Salwah Events Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="bg-black text-white min-h-screen">
        <InvoiceHeader
          onSave={saveDraft}
          onDuplicate={duplicateInvoice}
        />

        <main className="max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <ClientInfoSection 
                meta={invoice.meta} 
                updateMeta={(newMeta) => handleUpdateInvoice(prev => ({ ...prev, meta: newMeta }))}
              />

              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="sections">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-6">
                      {invoice.sections.map((section, index) => (
                        <Draggable key={section.id} draggableId={section.id} index={index}>
                          {(provided) => (
                            <InvoiceSection
                              section={section}
                              provided={provided}
                              updateInvoice={handleUpdateInvoice}
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
              totals={invoice.totals}
              calculatedTotals={calculatedTotals}
              updateTotals={(newTotals) => handleUpdateInvoice(prev => ({ ...prev, totals: newTotals }))}
              onImport={handleImportJSON}
              onExportJSON={handleExportJSON}
              onExportPDF={handleExportPDF}
              onReset={resetInvoice}
            />
          </div>
        </main>
      </div>
    </>
  );
};

export default InvoiceGenerator;