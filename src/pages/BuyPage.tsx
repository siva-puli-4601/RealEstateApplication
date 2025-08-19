import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, Grid, List, SortAsc, MapPin, Search } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { FilterPanel } from '../components/ui/FilterPanel';
import { PropertyCard } from '../components/ui/PropertyCard';
import { mockProperties } from '../data/mockData';
import { Property } from '../types';

 const BuyPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(mockProperties);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');

  // Initialize filters from URL params
  const initialFilters = {
    location: searchParams.get('location') || '',
    priceRange: searchParams.get('priceRange') || '',
    propertyType: searchParams.get('propertyType') || ''
  };

  useEffect(() => {
    let filtered = properties.filter(pro=>pro.category === 'buy');

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply URL filters
    if (initialFilters.location) {
      filtered = filtered.filter(property =>
        property.location.toLowerCase().includes(initialFilters.location.toLowerCase())
      );
    }

    if (initialFilters.propertyType) {
      filtered = filtered.filter(property =>
        property.type === initialFilters.propertyType
      );
    }

    if (initialFilters.priceRange) {
      const [min, max] = initialFilters.priceRange.split('-').map(Number);
      filtered = filtered.filter(property => {
        if (max) {
          return property.price >= min && property.price <= max;
        } else {
          return property.price >= min;
        }
      });
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => b.yearBuilt - a.yearBuilt);
        break;
      case 'area':
        filtered.sort((a, b) => b.area - a.area);
        break;
      default:
        break;
    }

    setFilteredProperties(filtered);
  }, [searchQuery, sortBy, properties, initialFilters.location, initialFilters.propertyType, initialFilters.priceRange]);

  const handleApplyFilters = (filters: any) => {
    let filtered = properties.filter(pro=>pro.category === 'buy');

    // Apply all filters
    if (filters.minPrice) {
      filtered = filtered.filter(property => property.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(property => property.price <= Number(filters.maxPrice));
    }
    if (filters.propertyType) {
      filtered = filtered.filter(property => property.type === filters.propertyType);
    }
    if (filters.bedrooms) {
      filtered = filtered.filter(property => property.bedrooms >= Number(filters.bedrooms));
    }
    if (filters.bathrooms) {
      filtered = filtered.filter(property => property.bathrooms >= Number(filters.bathrooms));
    }
    if (filters.minArea) {
      filtered = filtered.filter(property => property.area >= Number(filters.minArea));
    }
    if (filters.maxArea) {
      filtered = filtered.filter(property => property.area <= Number(filters.maxArea));
    }
    if (filters.yearBuilt) {
      filtered = filtered.filter(property => property.yearBuilt >= Number(filters.yearBuilt));
    }
    if (filters.amenities && filters.amenities.length > 0) {
      filtered = filtered.filter(property =>
        filters.amenities.some((amenity: string) => property.amenities.includes(amenity))
      );
    }

    setFilteredProperties(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Dream Home
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Discover the perfect property from our extensive collection of homes, apartments, and condos
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by location, property name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 text-lg focus:ring-2 focus:ring-white focus:outline-none"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="area">Largest First</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-gray-600">
              {filteredProperties.length} properties found
            </span>
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}
        >
          {filteredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </motion.div>

        {filteredProperties.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or filters to find more properties.
            </p>
            <Button onClick={() => setIsFilterOpen(true)}>
              Adjust Filters
            </Button>
          </motion.div>
        )}
      </div>

      {/* Filter Panel */}
      <FilterPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={handleApplyFilters}
        initialFilters={initialFilters}
      />
    </div>
  );
};

export default BuyPage;