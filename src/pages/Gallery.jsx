import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'weddings', name: 'Weddings' },
    { id: 'stages', name: 'Stages' },
    { id: 'catering', name: 'Catering' },
    { id: 'desserts', name: 'Desserts' }
  ];

  const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-EXAMPLE1?w=800',
    category: 'weddings',
    alt: 'Elegant wedding reception table with glowing candles and floral centrepieces.',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-EXAMPLE2?w=800',
    category: 'stages',
    alt: 'Luxurious wedding stage setup with rich drapery and floral arrangements.',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-EXAMPLE3?w=800',
    category: 'catering',
    alt: 'Close-up of gourmet halal catering platters beautifully laid out for a wedding.',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-EXAMPLE4?w=800',
    category: 'desserts',
    alt: 'Colorful wedding dessert display with traditional Indian sweets and stylish presentation.',
  },
  // Add more entries as needed...
];

  
  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredImages.length;
    } else {
      newIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    }
    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <>
      <Helmet>
        <title>Wedding Catering & Event Gallery | Salwah Events UK</title>
        <meta name="description" content="Explore our gallery of halal wedding catering, stage setups, and luxury event decorations. See how Salwah Events creates unforgettable celebrations across the UK." />
      </Helmet>

      <section className="relative pt-32 pb-20 hero-pattern">
        <div className="absolute inset-0 bg-black/60"></div>
        <img  class="absolute inset-0 w-full h-full object-cover" alt="A collage of beautiful UK Indian wedding photos from our halal catering and decoration services." src="https://images.unsplash.com/photo-1499318582548-7c7f62bf3bae?w=800" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white text-shadow">
              Our <span className="gradient-text">Gallery</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-sans text-shadow">
              A glimpse into the unforgettable Indian weddings we've crafted across the UK.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-black sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-sans font-medium transition-all duration-300 text-sm md:text-base ${
                  selectedCategory === category.id
                    ? 'bg-gold text-black'
                    : 'bg-gray-800/50 border border-gold/30 text-gold hover:bg-gold hover:text-black'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="relative group cursor-pointer overflow-hidden rounded-lg hover-lift aspect-w-1 aspect-h-1"
                  onClick={() => openLightbox(image)}
                >
                  <img  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" alt={image.alt} src={image.src} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4">
                      <p className="text-white font-serif font-semibold text-lg capitalize">{image.category}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{type: "spring", stiffness: 200, damping: 25}}
              className="relative max-w-5xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img  class="w-auto h-auto max-w-full max-h-[90vh] object-contain rounded-lg mx-auto" alt={selectedImage.alt} src={selectedImage.src} />
              
              <button
                onClick={() => navigateImage('prev')}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              
              <button
                onClick={() => navigateImage('next')}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
              
              <button
                onClick={closeLightbox}
                className="absolute top-0 right-0 -mt-4 -mr-4 w-10 h-10 bg-gold rounded-full flex items-center justify-center text-black hover:bg-gold-dark transition-colors"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;