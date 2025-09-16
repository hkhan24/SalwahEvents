import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Copy, Download, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHeader from '@/components/PageHeader';

const InvitationGenerator = () => {
  const { toast } = useToast();
  const [eventType, setEventType] = useState('Reception');
  const [tone, setTone] = useState('Formal');

  const generatedText = useMemo(() => {
    const templates = {
      Reception: {
        Formal: "The families of [Couple's Names] request the pleasure of your company at the wedding reception of their beloved children.\nPlease join us to celebrate this joyous occasion.\n\nDate: [Date]\nTime: [Time]\nVenue: [Venue Address]",
        Traditional: "With the blessings of the Almighty, we invite you to share in our happiness at the Walima reception of our son/daughter [Name] with [Spouse's Name]. Your presence is the most precious gift.\n\nDate: [Date]\nTime: [Time]\nVenue: [Venue Address]",
        Modern: "Let's celebrate love! You are invited to the wedding reception of [Couple's Names]. Get ready for an evening of dining, dancing, and making memories.\n\nDate: [Date]\nTime: [Time]\nVenue: [Venue Address]",
        Fun: "Eat, drink, and get married! Join us for the party of a lifetime as we celebrate [Couple's Names] tying the knot. Bring your dancing shoes!\n\nDate: [Date]\nTime: [Time]\nVenue: [Venue Address]",
      },
      Nikah: {
        Formal: "Mr. & Mrs. [Father's Name] request the honour of your presence at the Nikah ceremony of their daughter/son [Name] to [Spouse's Name].\n\nDate: [Date]\nTime: [Time]\nVenue: [Venue Address]",
        Traditional: "In the name of Allah, the Most Gracious, the Most Merciful. We cordially invite you to witness the holy union of our children [Couple's Names] at their Nikah ceremony. Your prayers and presence are requested.\n\nDate: [Date]\nTime: [Time]\nVenue: [Venue Address]",
        Modern: "Two hearts, one commitment. Please join us for the Nikah ceremony of [Couple's Names] as they begin their journey together.\n\nDate: [Date]\nTime: [Time]\nVenue: [Venue Address]",
        Fun: "It's official! We're making it halal. Come and be a part of our Nikah ceremony as [Couple's Names] say 'Qubool Hai'.\n\nDate: [Date]\nTime: [Time]\nVenue: [Venue Address]",
      },
      Mehndi: {
        Formal: "You are cordially invited to an evening of music and dance to celebrate the upcoming wedding of [Name] at their Mehndi ceremony.\n\nDate: [Date]\nTime: [Time]\nVenue: [Venue Address]",
        Traditional: "A night of henna, vibrant colours, and joyful songs. Please join us for the Mehndi celebration in honour of [Name].\n\nDate: [Date]\nTime: [Time]\nVenue: [Venue Address]",
        Modern: "Let the festivities begin! We would be delighted to have you at the Mehndi party for [Name]. Let's celebrate with music, dance, and lots of fun.\n\nDate: [Date]\nTime: [Time]\nVenue: [Venue Address]",
        Fun: "Get your henna on! It's time for [Name]'s Mehndi party. Come ready to dance the night away!\n\nDate: [Date]\nTime: [Time]\nVenue: [Venue Address]",
      },
      Walima: {
        Formal: "The family of [Groom's Name] requests the pleasure of your company at the Walima celebration hosted in honour of his marriage to [Bride's Name].\n\nDate: [Date]\nTime: [Time]\nVenue: [Venue Address]",
        Traditional: "To celebrate the blessed union of our son [Groom's Name] with [Bride's Name], we invite you to join us for a Walima feast. We seek your blessings for the couple.\n\nDate: [Date]\nTime: [Time]\nVenue: [Venue Address]",
        Modern: "Celebrating a new beginning. We'd be honoured if you would join us for the Walima dinner for [Couple's Names].\n\nDate: [Date]\nTime: [Time]\nVenue: [Venue Address]",
        Fun: "The 'I Do's' are done, now let's have some fun! You're invited to the Walima party for [Couple's Names].\n\nDate: [Date]\nTime: [Time]\nVenue: [Venue Address]",
      },
      Engagement: {
        Formal: "You are invited to celebrate the engagement of [Couple's Names]. Join us as they begin their journey towards marriage.\n\nDate: [Date]\nTime: [Time]\nVenue: [Venue Address]",
        Traditional: "With hearts full of joy, we invite you to the engagement ceremony of our children, [Couple's Names].\n\nDate: [Date]\nTime: [Time]\nVenue: [Venue Address]",
        Modern: "She said yes! Please join us to celebrate the engagement of [Couple's Names].\n\nDate: [Date]\nTime: [Time]\nVenue: [Venue Address]",
        Fun: "He put a ring on it! Come celebrate the engagement of [Couple's Names] with us!\n\nDate: [Date]\nTime: [Time]\nVenue: [Venue Address]",
      },
    };
    return templates[eventType][tone];
  }, [eventType, tone]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText);
    toast({ title: "Copied to Clipboard!", description: "Invitation text is ready to paste." });
  };

  const downloadTxt = () => {
    const footer = "\n\nGenerated by Salwah Events Ltd\n07359 337887 | info@salwahevents.com";
    const content = generatedText + footer;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'invitation_text.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ title: "TXT File Downloaded!", description: "Your invitation text is saved." });
  };

  const breadcrumbItems = [
    { name: 'Home', link: '/' },
    { name: 'Resources', link: '/resources' },
    { name: 'Invitation Text Generator' },
  ];

  return (
    <>
      <Helmet>
        <title>Free Wedding Invitation Generator | Salwah Events</title>
        <meta name="description" content="Generate professional and creative wedding invitation wording for your Nikah, Walima, Mehndi, or reception. Copy or download for free." />
      </Helmet>
      <div className="bg-black">
        <PageHeader title="Invitation Text" gradientText="Generator" subtitle="Generate professional invitation wording in seconds." />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#2A2E39] p-8 rounded-xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Event Type</label>
                <select value={eventType} onChange={e => setEventType(e.target.value)} className="w-full bg-black/50 border border-gold/30 rounded-md px-3 py-2 text-white">
                  <option>Reception</option>
                  <option>Nikah</option>
                  <option>Mehndi</option>
                  <option>Walima</option>
                  <option>Engagement</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Tone</label>
                <select value={tone} onChange={e => setTone(e.target.value)} className="w-full bg-black/50 border border-gold/30 rounded-md px-3 py-2 text-white">
                  <option>Formal</option>
                  <option>Traditional</option>
                  <option>Modern</option>
                  <option>Fun</option>
                </select>
              </div>
            </div>

            <div className="bg-black/30 p-6 rounded-lg border border-gold/20 min-h-[200px]">
              <p className="text-white whitespace-pre-wrap font-serif text-lg">{generatedText}</p>
            </div>

            <div className="flex gap-4 mt-8">
              <Button onClick={copyToClipboard} className="w-full text-lg py-6"><Copy size={20} className="mr-2" /> Copy Text</Button>
              <Button onClick={downloadTxt} className="w-full text-lg py-6"><Download size={20} className="mr-2" /> Download .txt</Button>
            </div>
          </motion.div>

          <div className="mt-16 bg-[#2A2E39] p-8 rounded-xl">
            <h3 className="text-2xl font-serif font-bold text-gold mb-4">How to Use</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Select the type of event and the desired tone from the dropdowns.</li>
              <li>Review the auto-generated invitation wording in the text box.</li>
              <li>Use the "Copy Text" button to copy it to your clipboard, or "Download .txt" to save it.</li>
              <li>Paste the text into your editor and replace placeholders like [Name] and [Venue] with your details.</li>
            </ul>
            <Link to="/resources" className="inline-flex items-center mt-6 text-gold hover:text-white">
              <ArrowLeft size={18} className="mr-2" />
              Back to Resources
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvitationGenerator;