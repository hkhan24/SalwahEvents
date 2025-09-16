import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Trash2, ChevronDown, GripVertical, Plus } from 'lucide-react';

const formatCurrency = (value) => {
  const number = Number(value);
  if (isNaN(number) || value === null || value === undefined || value === '') return '';
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(number);
};

const ItemRow = ({ item, updateItem, removeItem }) => (
  <div className="grid grid-cols-12 gap-2 items-center">
    <input
      placeholder="Item Name"
      className="col-span-5 bg-black/50 border border-gold/30 rounded-md px-3 py-2 text-sm"
      value={item.name}
      onChange={(e) => updateItem(item.id, { name: e.target.value })}
      aria-label="Item Name"
    />
    <input
      placeholder="Notes (optional)"
      className="col-span-4 bg-black/50 border border-gold/30 rounded-md px-3 py-2 text-sm"
      value={item.notes}
      onChange={(e) => updateItem(item.id, { notes: e.target.value })}
      aria-label="Item Notes"
    />
    <input
      type="number"
      placeholder="0.00"
      className="col-span-2 bg-black/50 border border-gold/30 rounded-md px-3 py-2 text-sm text-right"
      value={item.price}
      onChange={(e) => updateItem(item.id, { price: e.target.value })}
      aria-label="Item Price"
    />
    <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="col-span-1 text-red-500 hover:bg-red-500/10" aria-label={`Remove ${item.name || 'item'}`}>
      <Trash2 size={16} />
    </Button>
  </div>
);

const InvoiceSection = ({ section, provided, updateInvoice }) => {

  const handleUpdate = (props) => {
    updateInvoice(prev => ({
      ...prev,
      sections: prev.sections.map(s => s.id === section.id ? { ...s, ...props } : s)
    }));
  };

  const handleItemUpdate = (itemId, props) => {
    const newItems = section.items.map(i => i.id === itemId ? { ...i, ...props } : i);
    handleUpdate({ items: newItems });
  };
  
  const addItem = () => handleUpdate({ items: [...section.items, { id: uuidv4(), name: '', notes: '', price: '' }] });
  
  const removeItem = (itemId) => handleUpdate({ items: section.items.filter(i => i.id !== itemId) });

  const removeSection = () => {
    if (window.confirm(`Are you sure you want to delete the "${section.title}" section?`)) {
        updateInvoice(prev => ({ ...prev, sections: prev.sections.filter(s => s.id !== section.id) }));
    }
  };

  const sectionTotal = section.mode === 'itemised'
    ? section.items.reduce((acc, item) => acc + (Number(item.price) || 0), 0)
    : Number(section.subtotal) || 0;

  return (
    <div ref={provided.innerRef} {...provided.draggableProps} className="bg-[#2A2E39] rounded-xl border border-gold/20">
      <div className="p-4 flex flex-wrap justify-between items-center gap-4 border-b border-gold/20">
        <div className="flex items-center gap-2">
          <div {...provided.dragHandleProps} className="cursor-grab text-gray-400" aria-label={`Drag to reorder ${section.title} section`}>
            <GripVertical />
          </div>
          <input
            className="bg-transparent text-xl font-serif font-bold text-gold focus:outline-none w-full"
            value={section.title}
            onChange={(e) => handleUpdate({ title: e.target.value })}
            aria-label="Section Title"
          />
        </div>
        <div className="flex items-center gap-4">
          <RadioGroup value={section.mode} onValueChange={(value) => handleUpdate({ mode: value })} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="itemised" id={`r1-${section.id}`} />
              <Label htmlFor={`r1-${section.id}`}>Itemised</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="subtotal" id={`r2-${section.id}`} />
              <Label htmlFor={`r2-${section.id}`}>Subtotal</Label>
            </div>
          </RadioGroup>
          <Button variant="ghost" size="icon" onClick={removeSection} className="text-red-500 hover:bg-red-500/10" aria-label={`Delete ${section.title} section`}>
            <Trash2 size={18} />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleUpdate({ isCollapsed: !section.isCollapsed })} className="text-gray-400" aria-label={section.isCollapsed ? `Expand ${section.title} section` : `Collapse ${section.title} section`}>
            <motion.div animate={{ rotate: section.isCollapsed ? 0 : 180 }}><ChevronDown /></motion.div>
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {!section.isCollapsed && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                {section.items.map((item) => <ItemRow key={item.id} item={item} updateItem={handleItemUpdate} removeItem={removeItem} />)}
              </div>
              <div className="flex items-center justify-between">
                <Button onClick={addItem} size="sm" variant="outline" className="border-gold/50 text-gold/80 hover:bg-gold/10">
                  <Plus size={16} className="mr-2" /> Add Item
                </Button>
                {section.mode === 'subtotal' && (
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`subtotal-${section.id}`}>Section Subtotal</Label>
                    <input
                      id={`subtotal-${section.id}`}
                      type="number"
                      className="w-32 bg-black/50 border border-gold/30 rounded-md px-3 py-2 text-sm text-right"
                      value={section.subtotal}
                      onChange={(e) => handleUpdate({ subtotal: e.target.value })}
                      aria-label="Section Subtotal"
                    />
                  </div>
                )}
              </div>
              <div className="pt-2 border-t border-gold/20 flex justify-end font-bold text-white">
                Section Total: {formatCurrency(sectionTotal)}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InvoiceSection;