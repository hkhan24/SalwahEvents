
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Phone, Mail, MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    location: '',
    message: '',
    honeypot: '', // Honeypot field
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.honeypot) {
      console.log("Bot detected!");
      return; 
    }
    
    const mailtoLink = `mailto:info@salwahevents.com?subject=Event Enquiry: ${formData.eventType} on ${formData.eventDate}&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0APhone: ${formData.phone}%0D%0AEvent Type: ${formData.eventType}%0D%0AEvent Date: ${formData.eventDate}%0D%0ALocation: ${formData.location}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
    window.location.href = mailtoLink;
    toast({
      title: "Redirecting to your email client...",
      description: "Please send the pre-filled email to complete your enquiry.",
    });
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
    'Wedding',
    'Walima',
    'Mendhi',
    'Nikkah',
    'Aqiqah',
    'Corporate Event',
    'Charity Event',
    'Private Party',
    'Other'
  ];

  return (
    <>
      <Helmet>
        <title>Contact Salwah Events | Book Halal Catering & Event Services UK</title>
        <meta name="description" content="Get in touch with Salwah Events for halal wedding catering, stage decoration, and event management. Call 07359 337887, WhatsApp us, or use our enquiry form today." />
      </Helmet>

      <section className="relative pt-32 pb-20 hero-pattern">
        <div className="absolute inset-0 bg-black/60"></div>
        <img  class="absolute inset-0 w-full h-full object-cover" alt="Contact the Salwah Events team for halal wedding catering in the UK." src="https://images.unsplash.com/photo-1596550190504-8cd94a80b3bb?w=800" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white text-shadow">
              Contact <span className="gradient-text">Us</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-sans text-shadow">
              Let's start planning your perfect event together in London and surrounding areas.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-black" id="contact-form">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="glass-effect p-8 rounded-lg"
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
                  <input type="date" name="eventDate" value={formData.eventDate} onChange={handleInputChange} className="w-full px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white font-sans focus:outline-none focus:border-gold transition-colors" placeholder="Event Date" />
                </div>
                <textarea name="message" value={formData.message} onChange={handleInputChange} rows={5} className="w-full px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white font-sans focus:outline-none focus:border-gold transition-colors resize-none" placeholder="Tell us more about your event (guest count, requirements, etc.)"></textarea>
                <Button type="submit" className="w-full bg-gold hover:bg-gold-dark text-black font-semibold py-4 text-lg">
                  Send Enquiry
                  <Send className="ml-2" size={20} />
                </Button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="glass-effect p-8 rounded-lg">
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
              
              <div className="glass-effect rounded-lg overflow-hidden h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158857.0395249813!2d-0.2416815349688282!3d51.52877184085964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761e0969562635%3A0xed43594fb3763f6!2sLandmark%20Commercial%20Centre%2C%20Commercial%20Rd%2C%20London%20N18%201UB!5e0!3m2!1sen!2suk!4v1721834534653!5m2!1sen!2suk"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
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
    </>
  );
};

export default Contact;
