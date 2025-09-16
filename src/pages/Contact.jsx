import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Phone, Mail, MessageSquare, Send, Calendar as CalendarIcon, Loader2, ArrowRight, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import PageHeader from '@/components/PageHeader';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: null,
    location: '',
    message: '',
    honeypot: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, eventDate: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.honeypot) return;

    setIsLoading(true);
    const payload = new FormData();
    payload.append("access_key", "131d93a8-6307-4ab4-b2dd-ae1c564038af");
    payload.append("from_name", "Salwah Events Website");
    payload.append("subject", `New Enquiry from ${formData.name}`);
    
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'eventDate' && value) {
        payload.append(key, format(value, "yyyy-MM-dd"));
      } else if (value) {
        payload.append(key, value);
      }
    });

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload,
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Failed to send");

      toast({
        title: "Enquiry Sent! ✅",
        description: "Thank you for your message. Our team will get back to you shortly.",
        variant: "default",
        className: "bg-green-600 border-green-600 text-white"
      });

      setFormData({
        name: '', email: '', phone: '',
        eventType: '', eventDate: null, location: '',
        message: '', honeypot: ''
      });
    } catch (err) {
      toast({
        title: "Failed to send",
        description: err.message || "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '07359 337887',
      href: 'tel:07359337887'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'info@salwahevents.com',
      href: 'mailto:info@salwahevents.com'
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp',
      details: 'Chat with us',
      href: 'https://wa.me/447359337887'
    }
  ];

  const eventTypes = [
    'Wedding', 'Walima', 'Mendhi', 'Nikkah', 'Aqiqah', 
    'Corporate Event', 'Charity Event', 'Private Party', 'Other'
  ];

  return (
    <>
      <Helmet>
        <title>Contact Salwah Events | Book Asian Wedding Catering & Event Services London & Surrounding Areas</title>
        <meta name="description" content="Get in touch with Salwah Events for halal wedding catering, stage decoration, and event management. Call 07359 337887, WhatsApp us, or use our enquiry form today." />
      </Helmet>
      
      <div className="bg-black">
        <PageHeader 
          title="Contact" 
          gradientText="Us" 
          subtitle="Let's start planning your perfect event together in London and surrounding areas." 
          imageUrl="https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/3219ae43640fd3e69fb8cb9d56ab7b70.png"
        />

        <section className="py-20 bg-black" id="contact-form">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-[#2A2E39] p-8 rounded-xl"
              >
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                  Send us a <span className="text-gold">Message</span>
                </h2>
                <p className="text-lg text-gray-300 font-sans mb-8">
                  Fill out the form below and our event catering UK team will get back to you shortly.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <input type="text" name="honeypot" className="hidden" value={formData.honeypot} onChange={handleInputChange} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white font-sans focus:outline-none focus:border-gold transition-colors" placeholder="Full Name *" />
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white font-sans focus:outline-none focus:border-gold transition-colors" placeholder="Email Address *" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white font-sans focus:outline-none focus:border-gold transition-colors" placeholder="Phone Number *" />
                    <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white font-sans focus:outline-none focus:border-gold transition-colors" placeholder="Event Location / Postcode" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <select name="eventType" value={formData.eventType} onChange={handleInputChange} required className="w-full px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white font-sans focus:outline-none focus:border-gold transition-colors">
                      <option value="">Select Event Type *</option>
                      {eventTypes.map((type) => (<option key={type} value={type}>{type}</option>))}
                    </select>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal px-4 py-3 bg-black/50 border border-gold/30 rounded-lg hover:bg-black/70 hover:text-white",
                            !formData.eventDate && "text-gray-400"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.eventDate ? format(formData.eventDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-black border-gold/50" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.eventDate}
                          onSelect={handleDateChange}
                          initialFocus
                          className="text-white"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <textarea name="message" value={formData.message} onChange={handleInputChange} rows={5} className="w-full px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white font-sans focus:outline-none focus:border-gold transition-colors resize-none" placeholder="Tell us more about your event (guest count, requirements, etc.)"></textarea>
                  
                  <Button type="submit" disabled={isLoading} className="w-full bg-gold hover:bg-gold-dark text-black font-semibold py-4 text-lg disabled:opacity-70 disabled:cursor-not-allowed">
                    {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2" size={20} />}
                    {isLoading ? 'Sending...' : 'Send Enquiry'}
                  </Button>
                </form>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="bg-[#2A2E39] p-8 rounded-xl shadow-xl border border-gold/20">
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">Contact Information</h2>
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <a key={index} href={info.href} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 group">
                        <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center border border-gold/30 group-hover:bg-gold transition-colors duration-300">
                          <info.icon className="text-gold group-hover:text-black" size={24} />
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-white group-hover:text-gold transition-colors duration-300">{info.title}</p>
                          <p className="text-gray-300">{info.details}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="relative bg-[#2A2E39] rounded-2xl p-8 shadow-xl border border-gold/20 flex flex-col hover-lift">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gold/20 rounded-lg flex items-center justify-center border border-gold">
                      <FileText className="text-gold" size={32} />
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-white">Get an Accurate Quote</h2>
                  </div>
                  <p className="text-gray-300 font-sans leading-relaxed flex-grow">
                     For a more accurate quote, please use the <Link to="/resources/quote-builder" className="text-gold underline hover:no-underline">quote builder</Link> to pick your custom options, then email the generated PDF to us.
                  </p>
                </div>

                <div className="bg-[#2A2E39] rounded-xl overflow-hidden h-96 p-1">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158857.0395249813!2d-0.2416815349688282!3d51.52877184085964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761e0969562635%3A0xed43594fb3763f6!2sLandmark%20Commercial%20Centre%2C%20Commercial%20Rd%2C%20London%20N18%201UB!5e0!3m2!1sen!2suk!4v1721834534653!5m2!1sen!2suk"
                    width="100%"
                    height="100%"
                    style={{ border: 0, borderRadius: '0.6rem' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map of Salwah Events & Catering in London"
                  ></iframe>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;