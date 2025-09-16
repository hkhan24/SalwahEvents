import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';

const BlogMenuIdeas = () => {
  return (
    <>
      <Helmet>
        <title>Top 5 Menu Ideas for an Indian Wedding in London | Salwah Events</title>
        <meta name="description" content="Struggling with your menu? Explore our top 5 menu ideas for a spectacular Indian wedding in London, from traditional thalis to modern fusion food stations." />
      </Helmet>
      <div className="bg-black text-gray-300">
        <PageHeader 
          title="Indian Wedding" 
          gradientText="Menu Ideas" 
          subtitle="Top 5 Menu Ideas for an Unforgettable Indian Wedding in London"
          imageUrl="https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/94c87c67748800aed34e4aee047d3655.png"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className="prose prose-invert prose-lg mx-auto prose-p:leading-relaxed prose-headings:font-serif prose-headings:text-gold prose-a:text-gold prose-a:no-underline hover:prose-a:underline prose-strong:text-gold-light prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2">
            <div className="flex items-center text-sm text-gray-400 mb-4">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Published on August 29, 2025</span>
              <span className="mx-2">|</span>
              <Tag className="w-4 h-4 mr-2" />
              <span>Catering, Indian Wedding</span>
            </div>

            <p className="lead">
              The heart of any Indian wedding celebration is, without a doubt, the food. It’s a feast for the senses, a reflection of heritage, and a way to show hospitality to your cherished guests. As a leading provider of <Link to="/services/asian-wedding-catering">Asian wedding catering in London</Link>, we've seen firsthand how a well-crafted menu can elevate the entire event. If you're looking for inspiration, here are our top 5 menu ideas for a spectacular Indian wedding in London.
            </p>

            <h2>1. The Traditional Thali Experience</h2>
            <p>
              For an authentic and intimate dining experience, consider a traditional thali. Each guest receives a large platter laden with small bowls (katoris) filled with a variety of dishes: <strong>dal, sabzi, paneer, raita, pickles, and a sweet</strong>. This approach offers a wonderful diversity of flavours and textures in one sitting. It’s a fantastic way to showcase regional specialties, whether you're honouring Gujarati, Punjabi, or South Indian roots.
            </p>
            <img  class="w-full rounded-lg my-8" alt="A beautifully arranged traditional Indian wedding thali with multiple dishes." src="https://images.unsplash.com/photo-1614218116116-436c7fe66c37" />

            <h2>2. Interactive Live Food Stations</h2>
            <p>
              Bring theatre and excitement to your reception with live food stations. This modern approach is a huge crowd-pleaser. Imagine a chef expertly flipping <strong>roomali rotis</strong>, a <strong>chaat corner</strong> with customisable pani puri and bhel puri, or a <strong>live tandoor</strong> pulling out fresh kebabs and naan. Live stations not only provide delicious, freshly-made food but also create a vibrant, market-style atmosphere that encourages guests to mingle.
            </p>

            <h2>3. The Grand Buffet: A Feast for All</h2>
            <p>
              The grand buffet is a classic for a reason. It allows you to offer a wide variety of dishes to cater to every palate, which is essential for large guest lists with diverse tastes. A successful buffet requires careful planning. We recommend organising it by course (starters, mains, desserts) and cuisine type. Ensure you have a good balance of vegetarian and non-vegetarian options, and don't forget staples like biryani, rice, and a selection of breads. Our <Link to="/packages">wedding packages</Link> often include extensive buffet options.
            </p>

            <h2>4. Indo-Western Fusion Menu</h2>
            <p>
              For the modern couple, a fusion menu can be a delightful surprise. This concept blends Indian spices and cooking techniques with Western dishes. Think <strong>'naan-pizzas'</strong> with a chicken tikka topping, <strong>mini sliders</strong> with spiced lamb patties, or <strong>pasta with a creamy makhani sauce</strong>. It’s a playful and sophisticated way to reflect a multicultural identity and offer something unique to your guests.
            </p>
            <img  class="w-full rounded-lg my-8" alt="An elegant display of Indo-Western fusion canapés at a London wedding." src="https://images.unsplash.com/photo-1620287061103-5f12d822b0a5" />

            <h2>5. Themed Regional Cuisine</h2>
            <p>
              Celebrate your specific heritage by designing a menu around a single region of India. A <strong>Hyderabadi-themed menu</strong> could feature rich biryanis and haleem, while a <strong>Keralan menu</strong> might focus on seafood, appams, and coconut-based curries. This creates a cohesive and deeply personal culinary journey for your guests, telling the story of your family's roots through flavour. It’s a wonderful way to make your wedding feel truly unique.
            </p>
            <p>
              No matter which direction you choose, the key is quality ingredients and expert execution. A great menu is balanced, caters to various dietary needs, and flows well with the overall timeline of your event.
            </p>

            <div className="bg-[#2A2E39] p-8 rounded-xl my-12 text-center not-prose">
              <h3 className="text-2xl font-serif font-bold text-gold mb-4">Ready to Craft Your Dream Menu?</h3>
              <p className="text-gray-300 mb-6">
                Our culinary team is passionate about creating bespoke menus that tell your story. Let's discuss your vision and design a feast that your guests will talk about for years to come.
              </p>
              <Button asChild className="bg-gold hover:bg-gold-dark text-black font-semibold px-8 py-3">
                <Link to="/contact">
                  Discuss Your Menu
                  <ArrowRight className="ml-2" size={18} />
                </Link>
              </Button>
            </div>
          </article>
        </div>
      </div>
    </>
  );
};

export default BlogMenuIdeas;