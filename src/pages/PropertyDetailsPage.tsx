import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Share2, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar,
  Car,
  Phone,
  Mail,
  MessageCircle,
  Eye,
  Play,
  Camera
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { mockProperties } from '../data/mockData';

 const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams();
  const property = mockProperties.find(p => p.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'photos' | 'virtual' | '3d'>('photos');

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Not Found</h2>
          <p className="text-gray-600">The property you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Image Gallery */}
      <section className="relative h-96 md:h-[600px] bg-black">
        <div className="relative h-full overflow-hidden">
          {viewMode === 'photos' && (
            <motion.img
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={property.images[currentImageIndex]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          )}
          
          {viewMode === 'virtual' && (
            <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
              <div className="text-center text-white">
                <Play className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Virtual Tour</h3>
                <p className="text-lg opacity-90">360° Interactive Experience</p>
                <Button className="mt-4" size="lg">
                  Start Virtual Tour
                </Button>
              </div>
            </div>
          )}
          
          {viewMode === '3d' && (
            <div className="w-full h-full bg-gradient-to-br from-green-900 to-blue-900 flex items-center justify-center">
              <div className="text-center text-white">
                <Eye className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">3D Walkthrough</h3>
                <p className="text-lg opacity-90">Immersive Property Experience</p>
                <Button className="mt-4" size="lg">
                  Launch 3D Tour
                </Button>
              </div>
            </div>
          )}

          {/* Navigation Arrows (only for photos) */}
          {viewMode === 'photos' && property.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* View Mode Selector */}
          <div className="absolute bottom-4 left-4 flex space-x-2">
            <button
              onClick={() => setViewMode('photos')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'photos' 
                  ? 'bg-white text-gray-900' 
                  : 'bg-black bg-opacity-50 text-white hover:bg-opacity-70'
              }`}
            >
              <Camera className="h-4 w-4 inline mr-1" />
              Photos
            </button>
            <button
              onClick={() => setViewMode('virtual')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'virtual' 
                  ? 'bg-white text-gray-900' 
                  : 'bg-black bg-opacity-50 text-white hover:bg-opacity-70'
              }`}
            >
              <Play className="h-4 w-4 inline mr-1" />
              Virtual Tour
            </button>
            <button
              onClick={() => setViewMode('3d')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === '3d' 
                  ? 'bg-white text-gray-900' 
                  : 'bg-black bg-opacity-50 text-white hover:bg-opacity-70'
              }`}
            >
              <Eye className="h-4 w-4 inline mr-1" />
              3D Tour
            </button>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <button className="p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all">
              <Heart className="h-5 w-5" />
            </button>
            <button className="p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all">
              <Share2 className="h-5 w-5" />
            </button>
          </div>

          {/* Image Counter */}
          {viewMode === 'photos' && (
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {property.images.length}
            </div>
          )}
        </div>
      </section>

      {/* Property Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-8">
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{property.location}</span>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {property.title}
                </h1>
                
                <div className="text-4xl font-bold text-blue-600 mb-6">
                  ${property.price.toLocaleString()}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <Bed className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                  <div className="text-center">
                    <Bath className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                  <div className="text-center">
                    <Square className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.area}</div>
                    <div className="text-sm text-gray-600">Sq Ft</div>
                  </div>
                  <div className="text-center">
                    <Car className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.parking}</div>
                    <div className="text-sm text-gray-600">Parking</div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {property.description}
                </p>
                
                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div>
                    <span className="font-semibold text-gray-900">Property Type:</span>
                    <span className="ml-2 text-gray-600 capitalize">{property.type}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Year Built:</span>
                    <span className="ml-2 text-gray-600">{property.yearBuilt}</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Amenities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Location</h2>
                <div className="h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                    <p className="text-gray-600">Interactive Map Coming Soon</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Contact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="p-6">
                <div className="text-center mb-6">
                  <img
                    src={property.agent.avatar}
                    alt={property.agent.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-bold text-gray-900">{property.agent.name}</h3>
                  <p className="text-gray-600">Real Estate Agent</p>
                  <div className="flex items-center justify-center mt-2">
                    <span className="text-yellow-500">⭐</span>
                    <span className="ml-1 text-gray-600">
                      {property.agent.rating} ({property.agent.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Agent
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Schedule Viewing
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Mortgage Calculator */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Mortgage Calculator</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Down Payment
                    </label>
                    <input
                      type="number"
                      placeholder="20%"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Interest Rate
                    </label>
                    <input
                      type="number"
                      placeholder="6.5%"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Loan Term
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>30 years</option>
                      <option>15 years</option>
                      <option>20 years</option>
                    </select>
                  </div>
                  <Button className="w-full">Calculate Payment</Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;