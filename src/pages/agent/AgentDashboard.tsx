import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  TrendingUp, 
  Building, 
  Users, 
  DollarSign,
  Search,
  Filter
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { mockProperties } from '../../data/mockData';
import { AgentProperty } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

 const AgentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock agent properties with additional fields
  const agentProperties: AgentProperty[] = mockProperties.map(property => ({
    ...property,
    status: property.featured ? 'active' : 'draft',
    views: Math.floor(Math.random() * 500) + 50,
    inquiries: Math.floor(Math.random() * 20) + 1,
    dateAdded: '2024-01-15'
  }));

  const stats = {
    totalListings: agentProperties.length,
    activeListings: agentProperties.filter(p => p.status === 'active').length,
    totalViews: agentProperties.reduce((sum, p) => sum + p.views, 0),
    totalInquiries: agentProperties.reduce((sum, p) => sum + p.inquiries, 0)
  };

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </Card>
  );

  const PropertyCard = ({ property }: { property: AgentProperty }) => (
    <Card className="overflow-hidden">
      <div className="relative">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            property.status === 'active' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
          }`}>
            {property.status}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex space-x-2">
          <button className="p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100">
            <Edit className="h-4 w-4 text-gray-600" />
          </button>
          <button className="p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100">
            <Trash2 className="h-4 w-4 text-red-600" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
        <p className="text-2xl font-bold text-blue-600 mb-4">
          ${property.price.toLocaleString()}
        </p>
        
        <div className="grid grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
          <div className="text-center">
            <Eye className="h-4 w-4 mx-auto mb-1" />
            <span className="font-semibold">{property.views}</span>
            <p>Views</p>
          </div>
          <div className="text-center">
            <Users className="h-4 w-4 mx-auto mb-1" />
            <span className="font-semibold">{property.inquiries}</span>
            <p>Inquiries</p>
          </div>
          <div className="text-center">
            <Building className="h-4 w-4 mx-auto mb-1" />
            <span className="font-semibold">{property.bedrooms}</span>
            <p>Beds</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button size="sm" className="flex-1">
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agent Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}</p>
        </div>
        <Button className="flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Add New Property
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Listings"
          value={stats.totalListings}
          icon={Building}
          color="bg-blue-500"
        />
        <StatCard
          title="Active Listings"
          value={stats.activeListings}
          icon={TrendingUp}
          color="bg-green-500"
        />
        <StatCard
          title="Total Views"
          value={stats.totalViews}
          icon={Eye}
          color="bg-purple-500"
        />
        <StatCard
          title="Inquiries"
          value={stats.totalInquiries}
          icon={Users}
          color="bg-orange-500"
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('cards')}
            className={`p-2 rounded ${viewMode === 'cards' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
          >
            <Building className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-2 rounded ${viewMode === 'table' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Properties Display */}
      {viewMode === 'cards' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {agentProperties.map((property, index) => (
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
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Property
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Views
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Inquiries
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {agentProperties.map((property) => (
                    <tr key={property.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-12 h-12 rounded-lg object-cover mr-4"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{property.title}</div>
                            <div className="text-sm text-gray-500">{property.location}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ${property.price.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          property.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {property.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {property.views}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {property.inquiries}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default AgentDashboard;