import { Property, Agent } from '../types';

export const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@vistahaven.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Experienced real estate professional with 10+ years in luxury properties.',
    rating: 4.9,
    reviewCount: 127,
    properties: ['1', '2', '3']
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael@vistahaven.com',
    phone: '+1 (555) 234-5678',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Specializing in modern condos and downtown properties.',
    rating: 4.8,
    reviewCount: 89,
    properties: ['4', '5']
  }
];

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Luxury Villa',
    price: 1250000,
    location: 'Beverly Hills, CA',
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    type: 'house',
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    featured: true,
    trending: true,
    description: 'Stunning modern villa with panoramic city views, featuring high-end finishes and smart home technology.',
    amenities: ['Pool', 'Gym', 'Garden', 'Garage', 'Security System'],
    yearBuilt: 2020,
    parking: 2,
    agent: mockAgents[0],
    coordinates: { lat: 34.0736, lng: -118.4004 },
    category: 'buy'
  },
  {
    id: '2',
    title: 'Downtown Penthouse',
    price: 850000,
    location: 'Manhattan, NY',
    bedrooms: 2,
    bathrooms: 2,
    area: 1800,
    type: 'apartment',
    images: [
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    featured: true,
    trending: false,
    description: 'Luxurious penthouse in the heart of Manhattan with breathtaking skyline views.',
    amenities: ['Concierge', 'Rooftop Terrace', 'Gym', 'Doorman'],
    yearBuilt: 2018,
    parking: 1,
    agent: mockAgents[1],
    coordinates: { lat: 40.7589, lng: -73.9851 },
    category: 'buy'
  },
  {
    id: '3',
    title: 'Cozy Family Home',
    price: 650000,
    location: 'Austin, TX',
    bedrooms: 3,
    bathrooms: 2,
    area: 2100,
    type: 'house',
    images: [
      'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    featured: false,
    trending: true,
    description: 'Perfect family home in a quiet neighborhood with excellent schools nearby.',
    amenities: ['Backyard', 'Fireplace', 'Updated Kitchen', 'Hardwood Floors'],
    yearBuilt: 2015,
    parking: 2,
    agent: mockAgents[0],
    coordinates: { lat: 30.2672, lng: -97.7431 },
    category: 'buy'
  },
  {
    id: '4',
    title: 'Modern Condo',
    price: 420000,
    location: 'Seattle, WA',
    bedrooms: 1,
    bathrooms: 1,
    area: 900,
    type: 'condo',
    images: [
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    featured: false,
    trending: false,
    description: 'Stylish modern condo with city views and premium amenities.',
    amenities: ['Gym', 'Pool', 'Concierge', 'Balcony'],
    yearBuilt: 2019,
    parking: 1,
    agent: mockAgents[1],
    coordinates: { lat: 47.6062, lng: -122.3321 },
    category: 'rent'
  }
];

export const featuredLocations = [
  {
    name: 'Beverly Hills',
    image: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=600',
    properties: 45
  },
  {
    name: 'Manhattan',
    image: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=600',
    properties: 128
  },
  {
    name: 'Austin',
    image: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=600',
    properties: 67
  },
  {
    name: 'Seattle',
    image: 'https://images.pexels.com/photos/2539462/pexels-photo-2539462.jpeg?auto=compress&cs=tinysrgb&w=600',
    properties: 89
  }
];