import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

const BlogIndex = () => {
  const posts = [
    {
      title: 'Top 5 Menu Ideas for an Indian Wedding in London',
      description: 'From classic curries to modern fusion, discover mouth-watering menu ideas that will delight your guests and celebrate your heritage.',
      link: '/blog/top-5-menu-ideas-for-an-indian-wedding-in-london',
      date: 'August 29, 2025',
      tags: ['Catering', 'Indian Wedding'],
      imageSrc: 'https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/94c87c67748800aed34e4aee047d3655.png',
      imageAlt: 'A delicious spread of Indian wedding food.'
    },
    {
      title: 'How to Plan a Pakistani Nikah Ceremony – A Checklist',
      description: 'A step-by-step guide to planning a beautiful and meaningful Nikah ceremony, covering everything from legal requirements to decor.',
      link: '/blog/how-to-plan-a-pakistani-nikah-ceremony-a-checklist',
      date: 'August 29, 2025',
      tags: ['Planning', 'Pakistani Wedding'],
      imageSrc: 'https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/a02febce7837107e129066516a9cc30c.png',
      imageAlt: 'A couple during a traditional Pakistani Nikah ceremony.'
    },
    {
      title: 'Best Wedding Venues in East London for Asian Weddings',
      description: 'Explore our curated list of the top venues in East London that are perfect for hosting grand Asian weddings, complete with tips on what to look for.',
      link: '/blog/best-wedding-venues-in-east-london-for-asian-weddings',
      date: 'August 29, 2025',
      tags: ['Venues', 'London'],
      imageSrc: 'https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/0d0acf43a1f38de25dc2b2678f9e6203.png',
      imageAlt: 'An elegant wedding venue in East London decorated for an Asian wedding.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Wedding Planning Blog | Salwah Events | London</title>
        <meta name="description" content="Expert tips and inspiration for planning your perfect Asian wedding in London. Read our blog for advice on catering, venues, decor, and more." />
      </Helmet>
      <div className="bg-black">
        <PageHeader 
          title="Our Wedding" 
          gradientText="Planning Blog" 
          subtitle="Expert tips, trends, and inspiration for your perfect day."
          imageUrl="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800"
        />

        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.map((post, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#2A2E39] rounded-xl overflow-hidden flex flex-col group hover-lift"
                >
                  <Link to={post.link} className="block">
                    <img  class="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105" alt={post.imageAlt} src={post.imageSrc} />
                  </Link>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center text-sm text-gray-400 mb-2">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{post.date}</span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-white mb-3 flex-grow">
                      <Link to={post.link} className="hover:text-gold transition-colors">{post.title}</Link>
                    </h3>
                    <p className="text-gray-300 font-sans text-sm mb-4">{post.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-xs bg-gold/10 text-gold px-2 py-1 rounded-full flex items-center">
                          <Tag className="w-3 h-3 mr-1" /> {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto">
                      <Link to={post.link} className="inline-flex items-center text-gold font-semibold group-hover:text-white transition-colors">
                        Read More <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogIndex;