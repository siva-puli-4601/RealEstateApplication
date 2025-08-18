import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, Grid, List, Search, Calendar, Key } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { FilterPanel } from '../components/ui/FilterPanel';
import { PropertyCard } from '../components/ui/PropertyCard';
import { mockProperties } from '../data/mockData';
import { Property } from '../types';

const RentPage: React.FC = () => {
    const [properties, setProperties] = useState<Property[]>(mockProperties);
    const [filteredProperties, setFilteredProperties] = useState<Property[]>(mockProperties);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sortBy, setSortBy] = useState('newest');
    const [searchQuery, setSearchQuery] = useState('');

    // Convert buy prices to rental prices (rough estimation)
    const rentalProperties = properties.map(property => ({
        ...property,
        price: Math.round(property.price * 0.001) // Convert to monthly rent
    }));

    useEffect(() => {
        let filtered = [...rentalProperties];

        // Apply search query
        if (searchQuery) {
            filtered = filtered.filter(property =>
                property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                property.location.toLowerCase().includes(searchQuery.toLowerCase())
            );
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
    }, [searchQuery, sortBy]);

    const handleApplyFilters = (filters: any) => {
        let filtered = [...rentalProperties];

        // Apply all filters (similar to BuyPage but for rental prices)
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
            <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <div className="flex items-center justify-center mb-4">
                            <Key className="h-12 w-12 mr-4" />
                            <h1 className="text-4xl md:text-5xl font-bold">
                                Find Your Perfect Rental
                            </h1>
                        </div>
                        <p className="text-xl mb-8 max-w-2xl mx-auto">
                            Discover amazing rental properties with flexible lease terms and move-in ready homes
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto">
                            <div className="relative">
                                <Search className="absolute left-4 top-5 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search rental properties by location..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="bg-white w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 text-lg focus:ring-2 focus:ring-white focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-slate-300 bg-opacity-20 backdrop-blur-sm rounded-xl p-6"
                            >
                                <Calendar className="h-8 w-8 mx-auto mb-2" />
                                <h3 className="text-2xl font-bold">Flexible Leases</h3>
                                <p className="text-sm opacity-90">6-24 month options</p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-slate-300 bg-opacity-20 backdrop-blur-sm rounded-xl p-6"
                            >
                                <Key className="h-8 w-8 mx-auto mb-2" />
                                <h3 className="text-2xl font-bold">Move-in Ready</h3>
                                <p className="text-sm opacity-90">Furnished options available</p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-slate-300 bg-opacity-20 backdrop-blur-sm rounded-xl p-6"
                            >
                                <Search className="h-8 w-8 mx-auto mb-2" />
                                <h3 className="text-2xl font-bold">Virtual Tours</h3>
                                <p className="text-sm opacity-90">View before you visit</p>
                            </motion.div>
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
                            onClick={() => setIsFilterOpen(true)}
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
                            <option value="price-low">Rent: Low to High</option>
                            <option value="price-high">Rent: High to Low</option>
                            <option value="area">Largest First</option>
                        </select>
                    </div>

                    <div className="flex items-center space-x-2">
                        <span className="text-gray-600">
                            {filteredProperties.length} rentals available
                        </span>
                        <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'bg-white text-gray-600'}`}
                            >
                                <Grid className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 ${viewMode === 'list' ? 'bg-green-600 text-white' : 'bg-white text-gray-600'}`}
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
                    className={`grid gap-6 ${viewMode === 'grid'
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
                            <div className="relative">
                                <PropertyCard property={property} />
                                {/* Rental Badge */}
                                <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                    For Rent
                                </div>
                                {/* Monthly Rent Display */}
                                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                                    ${property.price}/month
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Filter Panel */}
            <FilterPanel
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                onApplyFilters={handleApplyFilters}
            />
        </div>
    );
};

export default RentPage;