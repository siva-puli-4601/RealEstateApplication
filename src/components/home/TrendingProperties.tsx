import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, TrendingUp, Bed, Bath, Square } from 'lucide-react';
import { Card } from '../ui/Card';
import { mockProperties } from '../../data/mockData';

export const TrendingProperties: React.FC = () => {
  const trendingProperties = mockProperties.filter(property => property.trending);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % trendingProperties.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + trendingProperties.length) % trendingProperties.length);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="h-8 w-8 text-green-500 mr-3" />
            <h2 className="text-4xl font-bold text-gray-900">
              Trending Properties
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Properties that are gaining popularity and high demand
          </p>
        </motion.div>

        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                {trendingProperties.slice(currentIndex, currentIndex + 2).map((property, index) => (
                  <Card key={property.id} className="group cursor-pointer">
                    <div className="relative overflow-hidden">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          Trending
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                      <div className="absolute bottom-6 left-6 text-white">
                        <h3 className="text-2xl font-bold mb-2">{property.title}</h3>
                        <p className="text-3xl font-bold text-green-400">
                          ${property.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Bed className="h-5 w-5 mr-2" />
                          <span>{property.bedrooms} beds</span>
                        </div>
                        <div className="flex items-center">
                          <Bath className="h-5 w-5 mr-2" />
                          <span>{property.bathrooms} baths</span>
                        </div>
                        <div className="flex items-center">
                          <Square className="h-5 w-5 mr-2" />
                          <span>{property.area} sqft</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {property.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img
                            src={property.agent.avatar}
                            alt={property.agent.name}
                            className="w-10 h-10 rounded-full mr-3"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">
                              {property.agent.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              ⭐ {property.agent.rating} ({property.agent.reviewCount})
                            </p>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          View Details
                        </motion.button>
                      </div>
                    </div>
                  </Card>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors z-10"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors z-10"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </motion.button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(trendingProperties.length / 2) }).map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                onClick={() => setCurrentIndex(index * 2)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  Math.floor(currentIndex / 2) === index ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};