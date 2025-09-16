import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Copy } from 'lucide-react';

const QuotationHeader = ({ onSave, onDuplicate }) => {
  return (
    <header className="bg-[#1A1C22] py-3 px-4 sm:px-6 lg:px-8 sticky top-0 z-20 border-b border-gold/20">
      <div className="max-w-screen-2xl mx-auto flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-xl md:text-2xl font-serif font-bold text-white">
          Salwah Events & Catering — <span className="text-gold">Quotation Generator</span>
        </h1>
        <div className="flex items-center flex-wrap gap-2">
          <Button onClick={onSave} variant="outline" size="sm"><Save className="h-4 w-4 mr-2" /> Save Draft</Button>
          <Button onClick={onDuplicate} variant="outline" size="sm"><Copy className="h-4 w-4 mr-2" /> Duplicate</Button>
        </div>
      </div>
    </header>
  );
};

export default QuotationHeader;