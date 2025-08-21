export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: 'house' | 'apartment' | 'condo' | 'townhouse';
  images: string[];
  featured: boolean;
  trending: boolean;
  description: string;
  amenities: string[];
  yearBuilt: number;
  parking: number;
  agent: Agent;
  coordinates: {
    lat: number;
    lng: number;
  };
  category:'buy' | 'rent' | 'sell';
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  bio: string;
  rating: number;
  reviewCount: number;
  properties: string[];
}

export interface SearchFilters {
  location: string;
  minPrice: number;
  maxPrice: number;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  minArea: number;
  maxArea: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  type: 'buyer' | 'agent' | 'admin';
  password?: string; 
  avatar?: string;
  savedProperties: string[];
  savedSearches: SearchFilters[];
  isActive?: boolean;
  joinedDate?: string;
  lastLogin?: string;
}

export interface AdminStats {
  totalProperties: number;
  totalUsers: number;
  totalAgents: number;
  activeListings: number;
  pendingApprovals: number;
}

export interface AgentProperty extends Property {
  status: 'active' | 'pending' | 'sold' | 'draft';
  views: number;
  inquiries: number;
  dateAdded: string;
}