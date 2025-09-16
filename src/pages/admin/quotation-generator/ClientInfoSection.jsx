import React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';

const InputField = ({ label, id, ...props }) => (
  <div>
    <Label htmlFor={id} className="text-sm font-medium text-gray-300">{label}</Label>
    <input
      id={id}
      className="mt-1 w-full bg-black/50 border border-gold/30 rounded-md px-3 py-2 text-white focus:border-gold focus:ring-gold/50 transition-colors"
      {...props}
    />
  </div>
);

const DatePickerField = ({ label, id, value, onChange }) => (
  <div>
    <Label htmlFor={id} className="text-sm font-medium text-gray-300">{label}</Label>
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant={"outline"}
          className={cn(
            "mt-1 w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-[#1A1C22] border-gold" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  </div>
);

const ClientInfoSection = ({ meta, updateMeta }) => {
  const handleUpdate = (key, value) => {
    updateMeta({ ...meta, [key]: value });
  };

  return (
    <div className="bg-blue-900/20 p-6 rounded-xl border border-blue-500/50">
      <h2 className="text-2xl font-serif font-bold text-gold mb-6">Client Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
        <InputField id="clientName" label="Client Name" value={meta.clientName} onChange={(e) => handleUpdate('clientName', e.target.value)} />
        <InputField id="venue" label="Venue" value={meta.venue} onChange={(e) => handleUpdate('venue', e.target.value)} />
        <InputField id="eventType" label="Type of Event" value={meta.eventType} onChange={(e) => handleUpdate('eventType', e.target.value)} />
        
        <DatePickerField id="eventDate" label="Date of Event" value={meta.eventDate} onChange={(date) => handleUpdate('eventDate', date)} />
        <InputField id="time" label="Time" value={meta.time} onChange={(e) => handleUpdate('time', e.target.value)} />
        <InputField id="guestCount" label="No. of Guests" type="number" min="1" value={meta.guestCount} onChange={(e) => handleUpdate('guestCount', e.target.value)} />
        
        <InputField id="contactNumber" label="Contact Number" value={meta.contactNumber} onChange={(e) => handleUpdate('contactNumber', e.target.value)} />
        <InputField id="quotationNo" label="Quotation No." value={meta.quotationNo} onChange={(e) => handleUpdate('quotationNo', e.target.value)} />
        <DatePickerField id="issueDate" label="Issue Date" value={meta.issueDate} onChange={(date) => handleUpdate('issueDate', date)} />
      </div>
    </div>
  );
};

export default ClientInfoSection;