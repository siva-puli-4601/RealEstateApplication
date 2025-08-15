import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { featuredLocations } from '../../data/mockData';

export const FeaturedLocations: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Popular Neighborhoods
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore the most sought-after locations with the best amenities and lifestyle
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {featuredLocations.map((location, index) => (
            <motion.div key={location.name} variants={itemVariants}>
              <Card className="group cursor-pointer h-full">
                <div className="relative overflow-hidden">
                  <img
                    src={location.image}
                    alt={location.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <h3 className="text-lg font-bold">{location.name}</h3>
                    </div>
                    <p className="text-sm opacity-90">
                      {location.properties} properties
                    </p>
                  </div>
                </div>
                
                <div className="p-4">
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between text-blue-600 font-semibold"
                  >
                    <span>Explore Properties</span>
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
          >
            View All Locations
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};