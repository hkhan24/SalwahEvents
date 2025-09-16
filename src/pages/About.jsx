import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Award, Heart, UserCheck, Users } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

const About = () => {
  const values = [
    {
      title: 'Quality',
      description: 'From the freshness of our ingredients to the fine details of our decor, we never compromise on quality.',
      icon: Award
    },
    {
      title: 'Inclusivity',
      description: 'We create welcoming, Halal-centric environments where every guest feels respected and celebrated.',
      icon: Heart
    },
    {
      title: 'Professionalism',
      description: 'Our experienced team provides reliable, seamless service, ensuring your event is executed flawlessly.',
      icon: UserCheck
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Salwah Events | Asian Wedding Catering & Event Specialists UK</title>
        <meta name="description" content="Learn about Salwah Events & Catering — UK specialists in halal weddings, catering, and event management. Our story, values, and commitment to excellence." />
      </Helmet>

      <div className="bg-black">
        <PageHeader 
          title="Your Trusted Asian" 
          gradientText="Event Partner" 
          subtitle="Passionately creating premium, unforgettable events across London and surrounding areas." 
          imageUrl="https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/b445c5ad2f354581bfee6f2202b85fe1.png"
        />
        
        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
                  Our <span className="text-gold">Story</span>
                </h2>
                <p className="text-lg text-gray-300 font-sans leading-relaxed">
                  Salwah Events & Catering was born from a simple desire: to provide the UK Muslim community with a premium, reliable, and truly Halal event service. We saw a need for specialists in Asian wedding catering who understand the cultural and religious nuances of our celebrations, without compromising on luxury and professionalism.
                </p>
                <p className="text-lg text-gray-300 font-sans leading-relaxed">
                  As a family-led business based in London, we pour our hearts into every wedding, aqiqah, and corporate function. We are more than just planners; we are your trusted partners, dedicated to making your event seamless and beautiful, with UK wedding packages that reflect your values.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <img  class="w-full h-96 object-cover rounded-lg shadow-2xl" alt="A beautiful table setting at a Salwah Events Indian wedding in the UK." src="https://images.unsplash.com/photo-1560145726-2ef8f8d77913?w=800" />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                Our Core <span className="text-gold">Values</span>
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-6 glass-effect rounded-lg hover-lift"
                >
                  <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-gold">
                    <value.icon className="text-gold" size={32} />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-300 font-sans">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative h-96"
              >
                <img  class="w-full h-full object-cover rounded-lg shadow-2xl" alt="A team of professional event caterers working together in a kitchen." src="https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/43258d92ed41e3ffc802c7923ad39074.jpg" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gold/20 rounded-lg flex items-center justify-center border border-gold">
                    <Users className="text-gold" size={32} />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
                    Our <span className="text-gold">Professional Team</span>
                  </h2>
                </div>
                <p className="text-lg text-gray-300 font-sans leading-relaxed">
                  At the heart of Salwah Events is a collective of passionate and experienced professionals. Our team comprises culinary artists who masterfully create authentic Halal dishes, visionary designers who transform venues into dreamscapes, and meticulous planners who ensure every detail is executed to perfection.
                </p>
                <p className="text-lg text-gray-300 font-sans leading-relaxed">
                  Together, we work seamlessly to bring your vision to life. Our shared commitment to excellence and our deep understanding of cultural traditions ensure that your event is not just successful, but truly unforgettable.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;