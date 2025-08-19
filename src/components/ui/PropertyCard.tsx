import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bed, Bath, Square, MapPin, Heart, Eye } from 'lucide-react';
import { Property } from '../../types';
import { Card } from './Card';
import { useAuth } from '../../contexts/AuthContext';

interface PropertyCardProps {
  property: Property;
  showAgent?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  showAgent = true 
}) => {
  const { user, toggleBookmark, isBookmarked } = useAuth();
  const bookmarked = isBookmarked(property.id);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (user) {
      toggleBookmark(property.id);
    }
  };

  return (
    <Card className="group cursor-pointer">
      <Link to={`/property/${property.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col space-y-2">
            {property.featured && (
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Featured
              </span>
            )}
            {property.trending && (
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Trending
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
              onClick={handleBookmarkClick}
            >
              <Heart className={`h-5 w-5 transition-colors ${
                bookmarked 
                  ? 'text-red-500 fill-red-500' 
                  : 'text-gray-600 hover:text-red-500'
              }`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <Eye className="h-5 w-5 text-gray-600 hover:text-blue-500" />
            </motion.button>
          </div>

          {/* Property Type */}
          <div className="absolute bottom-4 right-4">
            <span className="bg-black bg-opacity-60 text-white px-2 py-1 rounded text-sm capitalize">
              {property.type}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.location}</span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {property.title}
          </h3>
          
          <p className="text-2xl font-bold text-blue-600 mb-4">
            ${property.price.toLocaleString()}
          </p>
          
          <div className="flex items-center justify-between text-gray-600 mb-4">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.bedrooms} beds</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.bathrooms} baths</span>
            </div>
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.area} sqft</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {property.description}
          </p>
          
          {showAgent && (
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center">
                <img
                  src={property.agent.avatar}
                  alt={property.agent.name}
                  className="w-8 h-8 rounded-full mr-3"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {property.agent.name}
                  </p>
                  <p className="text-xs text-gray-600">
                    ⭐ {property.agent.rating} ({property.agent.reviewCount} reviews)
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Link>
    </Card>
  );
};