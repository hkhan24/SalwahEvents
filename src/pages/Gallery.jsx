import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

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
    src: 'https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/3621ec1da3f678245879bd2f73f1ed70.jpg',
    category: 'weddings',
    alt: 'Elegant wedding reception table with glowing candles and floral centrepieces.',
  },
  {
    id: 2,
    src: 'https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/7974f17656fb39d58658bec8cd1baea7.jpg',
    category: 'stages',
    alt: 'Luxurious wedding stage setup with rich drapery and floral arrangements.',
  },
  {
    id: 3,
    src: 'https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/41c92a692526f11f5a38dc27d068bafe.png',
    category: 'catering',
    alt: 'Close-up of gourmet halal catering platters beautifully laid out for a wedding.',
  },
  {
    id: 4,
    src: 'https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/ae9e98cbcfee8054b8a4fdc85d33a8f0.png',
    category: 'desserts',
    alt: 'Colorful wedding dessert display with traditional Indian sweets and stylish presentation.',
  },
  {
    id: 5,
    src: 'https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/6c77043e074f82ca081cb33331935fd7.jpg',
    category: 'weddings',
    alt: 'Indian bride and groom during their wedding ceremony.',
  },
  {
    id: 6,
    src: 'https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/ac1eae29fe9d0d5f78a0f1a8ea3f8711.jpg',
    category: 'stages',
    alt: 'Beautifully decorated mandap for a Hindu wedding ceremony.',
  },
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
        <title>Wedding Catering & Stage Decoration Gallery | Salwah Events</title>
        <meta name="description" content="Explore our gallery of halal wedding catering, stage setups, and luxury event decorations. See how Salwah Events creates unforgettable celebrations across the UK." />
      </Helmet>
      
      <div className="bg-black">
        <PageHeader 
          title="Our" 
          gradientText="Gallery" 
          subtitle="A glimpse into the unforgettable Indian weddings we've crafted across the UK." 
          imageUrl="https://horizons-cdn.hostinger.com/f8034716-902c-4f05-a25e-2c26f4bc9157/194b46702fed826a257a419d3b09cbc4.png"
        />

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
      </div>
    </>
  );
};

export default Gallery;