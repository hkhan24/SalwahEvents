import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Download, Upload, FileText, RefreshCw } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const formatCurrency = (value) => {
    const number = Number(value);
    if (isNaN(number)) return '£0.00';
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(number);
};

const TotalRow = ({ label, value }) => (
    <div className="flex justify-between items-center">
        <span className="text-gray-300">{label}</span>
        <span className="font-medium">{value}</span>
    </div>
);

const TotalsSidebar = ({ totals, calculatedTotals, updateTotals, onImport, onExportJSON, onExportPDF, onReset }) => {
  const handleUpdate = (key, value) => {
    updateTotals({ ...totals, [key]: value });
  };

  return (
    <div className="lg:col-span-1">
      <div className="bg-[#2A2E39] p-6 rounded-xl sticky top-24 space-y-4 border border-gold/20">
        <h2 className="text-2xl font-serif font-bold text-gold mb-4">Totals & Options</h2>
        
        <div className="space-y-4 text-base">
          <TotalRow label="Subtotal" value={formatCurrency(calculatedTotals.subtotal)} />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch id="discount-mode" checked={totals.discountEnabled} onCheckedChange={(checked) => handleUpdate('discountEnabled', checked)} aria-label="Toggle discount" />
              <Label htmlFor="discount-mode">Discount</Label>
            </div>
            <AnimatePresence>
              {totals.discountEnabled && (
                <motion.input
                  initial={{ width: 0, opacity: 0 }} animate={{ width: "8rem", opacity: 1 }} exit={{ width: 0, opacity: 0 }}
                  type="number" placeholder="0.00" aria-label="Discount amount"
                  className="w-32 bg-black/50 border border-gold/30 rounded-md px-2 py-1 text-right"
                  value={totals.discount}
                  onChange={(e) => handleUpdate('discount', e.target.value)}
                />
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch id="vat-mode" checked={totals.vatEnabled} onCheckedChange={(checked) => handleUpdate('vatEnabled', checked)} aria-label="Toggle VAT" />
              <Label htmlFor="vat-mode">VAT</Label>
            </div>
            <AnimatePresence>
            {totals.vatEnabled && (
                <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: "8rem", opacity: 1 }} exit={{ width: 0, opacity: 0 }} className="flex items-center gap-2">
                    <input
                      type="number" placeholder="20" aria-label="VAT rate"
                      className="w-20 bg-black/50 border border-gold/30 rounded-md px-2 py-1 text-right"
                      value={totals.vatRate}
                      onChange={(e) => handleUpdate('vatRate', e.target.value)}
                    />
                    <span className="text-gray-400">%</span>
                </motion.div>
            )}
            </AnimatePresence>
          </div>
          {totals.vatEnabled && <TotalRow label="VAT Amount" value={formatCurrency(calculatedTotals.vatAmount)} />}

          <div className="border-t border-gold/20 my-2"></div>
          <div className="flex justify-between font-bold text-xl">
            <span>Grand Total</span>
            <span>{formatCurrency(calculatedTotals.grandTotal)}</span>
          </div>

          <div className="flex justify-between items-center">
            <Label htmlFor="deposit-paid">Deposit Paid</Label>
            <input
              id="deposit-paid"
              type="number" placeholder="0.00" aria-label="Deposit paid amount"
              className="w-32 bg-black/50 border border-gold/30 rounded-md px-2 py-1 text-right"
              value={totals.depositPaid}
              onChange={(e) => handleUpdate('depositPaid', e.target.value)}
            />
          </div>
          
          <div className="flex justify-between font-bold text-2xl text-gold pt-2 border-t border-gold/20">
            <span>Amount Due</span>
            <span>{formatCurrency(calculatedTotals.amountDue)}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-gold/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch id="cph-mode" checked={totals.showCostPerHead} onCheckedChange={(checked) => handleUpdate('showCostPerHead', checked)} aria-label="Toggle cost per head" />
                <Label htmlFor="cph-mode">Show Cost Per Head</Label>
              </div>
              <AnimatePresence>
                {totals.showCostPerHead && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-bold">
                    {formatCurrency(calculatedTotals.costPerHead)}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
        </div>

        <div className="pt-6 border-t border-gold/20 space-y-3">
          <input type="file" id="json-upload-sidebar" accept=".json" onChange={onImport} className="hidden" />
          <Button asChild variant="outline" className="w-full">
            <label htmlFor="json-upload-sidebar" className="cursor-pointer flex items-center justify-center"><Upload className="h-4 w-4 mr-2" /> Import JSON</label>
          </Button>
          <Button onClick={onExportJSON} variant="outline" className="w-full">
            <Download className="h-4 w-4 mr-2" /> Export JSON
          </Button>
          <Button onClick={onExportPDF} className="w-full bg-gold text-black hover:bg-gold/90">
            <FileText className="h-4 w-4 mr-2" /> Download PDF
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full"><RefreshCw className="h-4 w-4 mr-2" /> Reset Form</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently clear the current invoice form.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onReset}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default TotalsSidebar;