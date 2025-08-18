import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, DollarSign, Home } from 'lucide-react';
import { Button } from '../ui/Button';

export const HeroSection: React.FC = () => {
    const navigate = useNavigate();
    const [searchData, setSearchData] = useState({
        location: '',
        priceRange: '',
        propertyType: ''
    });

    const handleSearch = () => {
        // Navigate to buy page with search parameters
        const params = new URLSearchParams();
        if (searchData.location) params.set('location', searchData.location);
        if (searchData.priceRange) params.set('priceRange', searchData.priceRange);
        if (searchData.propertyType) params.set('propertyType', searchData.propertyType);

        navigate(`/buy?${params.toString()}`);
    };

    const handleQuickAction = (action: string) => {
        navigate(`/${action.toLowerCase()}`);
    };

    return (
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 min-h-screen flex items-center">
            {/* Background Image Overlay */}
            <div
                className="absolute inset-0 bg-black bg-opacity-40"
                style={{
                    backgroundImage: 'url(https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1600)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-bold text-slate-700 mb-6"
                    >
                        Find Your Dream
                        <motion.span
                            initial={{ backgroundPosition: "0% 50%" }}
                            animate={{ backgroundPosition: "200% 50%" }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-[length:200%_200%]"
                        >
                            Home Today
                        </motion.span>
                    </motion.h1>
                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="bg-white rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {/* Location */}
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Location
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Enter city or neighborhood"
                                        value={searchData.location}
                                        onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Price Range
                                </label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                    <select
                                        value={searchData.priceRange}
                                        onChange={(e) => setSearchData({ ...searchData, priceRange: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                    >
                                        <option value="">Any Price</option>
                                        <option value="0-300000">Under $300K</option>
                                        <option value="300000-500000">$300K - $500K</option>
                                        <option value="500000-750000">$500K - $750K</option>
                                        <option value="750000-1000000">$750K - $1M</option>
                                        <option value="1000000+">$1M+</option>
                                    </select>
                                </div>
                            </div>

                            {/* Property Type */}
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Property Type
                                </label>
                                <div className="relative">
                                    <Home className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                    <select
                                        value={searchData.propertyType}
                                        onChange={(e) => setSearchData({ ...searchData, propertyType: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                    >
                                        <option value="">Any Type</option>
                                        <option value="house">House</option>
                                        <option value="apartment">Apartment</option>
                                        <option value="condo">Condo</option>
                                        <option value="townhouse">Townhouse</option>
                                    </select>
                                </div>
                            </div>

                            {/* Search Button */}
                            <div className="flex items-end">
                                <Button
                                    onClick={handleSearch}
                                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex items-center justify-center gap-2"
                                    size="lg"
                                >
                                    <Search className="h-5 w-5" />
                                    <span>Search</span>
                                </Button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                        className="flex flex-wrap justify-center gap-4 mt-8"
                    >
                        {['Buy', 'Rent', 'Sell'].map((action, index) => (
                            <motion.button
                                key={action}
                                onClick={() => handleQuickAction(action)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 bg-white bg-opacity-20 backdrop-blur-sm text-gray-700 rounded-full hover:bg-opacity-30 transition-all duration-200"
                            >
                                {action} Properties
                            </motion.button>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};