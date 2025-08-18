import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Home, TrendingUp, MapPin, Calendar, Wrench, DollarSign, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

 const SellPage: React.FC = () => {
  const [propertyData, setPropertyData] = useState({
    address: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    yearBuilt: '',
    condition: '',
       renovations: [] as string[], 
    lotSize: '',
    garage: ''
  });

  const [estimatedValue, setEstimatedValue] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const renovationOptions = [
    'Kitchen Remodel',
    'Bathroom Renovation',
    'New Flooring',
    'Fresh Paint',
    'New Roof',
    'HVAC System',
    'Windows Replacement',
    'Landscaping'
  ];

  const handleRenovationToggle = (renovation: string) => {
    setPropertyData(prev => ({
      ...prev,
      renovations: prev.renovations.includes(renovation)
        ? prev.renovations.filter((r: string) => r !== renovation)
        : [...prev.renovations, renovation]
    }));
  };

  const calculateEstimate = () => {
    setIsCalculating(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      // Basic calculation logic (simplified)
      let baseValue = 200000; // Base value
      
      // Area factor
      if (propertyData.area) {
        baseValue += Number(propertyData.area) * 150;
      }
      
      // Bedroom factor
      if (propertyData.bedrooms) {
        baseValue += Number(propertyData.bedrooms) * 25000;
      }
      
      // Bathroom factor
      if (propertyData.bathrooms) {
        baseValue += Number(propertyData.bathrooms) * 15000;
      }
      
      // Age factor
      if (propertyData.yearBuilt) {
        const age = 2024 - Number(propertyData.yearBuilt);
        baseValue -= age * 1000; // Depreciation
      }
      
      // Condition factor
      const conditionMultiplier = {
        'excellent': 1.2,
        'good': 1.1,
        'fair': 1.0,
        'poor': 0.85
      };
      baseValue *= conditionMultiplier[propertyData.condition as keyof typeof conditionMultiplier] || 1;
      
      // Renovation bonus
      baseValue += propertyData.renovations.length * 15000;
      
      // Property type factor
      const typeMultiplier = {
        'house': 1.0,
        'condo': 0.85,
        'townhouse': 0.95,
        'apartment': 0.8
      };
      baseValue *= typeMultiplier[propertyData.propertyType as keyof typeof typeMultiplier] || 1;
      
      setEstimatedValue(Math.round(baseValue));
      setIsCalculating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <Calculator className="h-12 w-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Sell Your Property
              </h1>
            </div>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Get an instant estimate of your property's value with our advanced calculator
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Property Details Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Home className="h-6 w-6 mr-2 text-purple-600" />
                Property Details
              </h2>

              <div className="space-y-6">
                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Property Address
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your property address"
                    value={propertyData.address}
                    onChange={(e) => setPropertyData({...propertyData, address: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type
                  </label>
                  <select
                    value={propertyData.propertyType}
                    onChange={(e) => setPropertyData({...propertyData, propertyType: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select Type</option>
                    <option value="house">House</option>
                    <option value="condo">Condo</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="apartment">Apartment</option>
                  </select>
                </div>

                {/* Bedrooms & Bathrooms */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bedrooms
                    </label>
                    <select
                      value={propertyData.bedrooms}
                      onChange={(e) => setPropertyData({...propertyData, bedrooms: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select</option>
                      {[1,2,3,4,5,6].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bathrooms
                    </label>
                    <select
                      value={propertyData.bathrooms}
                      onChange={(e) => setPropertyData({...propertyData, bathrooms: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select</option>
                      {[1,1.5,2,2.5,3,3.5,4,4.5,5].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Area & Year Built */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Square Footage
                    </label>
                    <input
                      type="number"
                      placeholder="e.g., 2000"
                      value={propertyData.area}
                      onChange={(e) => setPropertyData({...propertyData, area: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="h-4 w-4 inline mr-1" />
                      Year Built
                    </label>
                    <input
                      type="number"
                      placeholder="e.g., 2010"
                      value={propertyData.yearBuilt}
                      onChange={(e) => setPropertyData({...propertyData, yearBuilt: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Condition */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Condition
                  </label>
                  <select
                    value={propertyData.condition}
                    onChange={(e) => setPropertyData({...propertyData, condition: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select Condition</option>
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Needs Work</option>
                  </select>
                </div>

                {/* Recent Renovations */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <Wrench className="h-4 w-4 inline mr-1" />
                    Recent Renovations (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {renovationOptions.map(renovation => (
                      <label key={renovation} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={propertyData.renovations.includes(renovation)}
                          onChange={() => handleRenovationToggle(renovation)}
                          className="mr-2 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-700">{renovation}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Calculate Button */}
                <Button
                  onClick={calculateEstimate}
                  disabled={isCalculating || !propertyData.address || !propertyData.propertyType}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  size="lg"
                >
                  {isCalculating ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="mr-2"
                      >
                        <Calculator className="h-5 w-5" />
                      </motion.div>
                      Calculating...
                    </>
                  ) : (
                    <>
                      <Calculator className="h-5 w-5 mr-2" />
                      Calculate Property Value
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Results & Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Estimated Value */}
            {estimatedValue && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Card className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Estimated Property Value
                    </h3>
                    <div className="text-4xl font-bold text-purple-600 mb-4">
                      ${estimatedValue.toLocaleString()}
                    </div>
                    <p className="text-gray-600 mb-6">
                      Based on current market conditions and property details
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-white rounded-lg p-3">
                        <div className="font-semibold text-gray-900">Market Range</div>
                        <div className="text-purple-600">
                          ${Math.round(estimatedValue * 0.9).toLocaleString()} - ${Math.round(estimatedValue * 1.1).toLocaleString()}
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-3">
                        <div className="font-semibold text-gray-900">Price per sq ft</div>
                        <div className="text-purple-600">
                          ${propertyData.area ? Math.round(estimatedValue / Number(propertyData.area)) : 'N/A'}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Why Sell With Us */}
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <CheckCircle className="h-6 w-6 mr-2 text-green-500" />
                Why Sell With VistaHaven?
              </h3>
              <div className="space-y-4">
                {[
                  'Expert market analysis and pricing strategy',
                  'Professional photography and virtual tours',
                  'Extensive marketing reach and network',
                  'Dedicated agent support throughout the process',
                  'Competitive commission rates',
                  'Fast closing assistance'
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center"
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Contact CTA */}
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Ready to Sell?
              </h3>
              <p className="text-gray-600 mb-6">
                Get a detailed market analysis and connect with our top-rated agents.
              </p>
              <div className="space-y-3">
                <Button className="w-full" size="lg">
                  Schedule Free Consultation
                </Button>
                <Button variant="outline" className="w-full">
                  Download Market Report
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SellPage;