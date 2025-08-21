import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  Settings,
  Users,
  Building,
  Plus,
  Heart,
  Search,
  BarChart3,
  Shield,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, hasRole } = useAuth();
  const location = useLocation();

  const getNavigationItems = () => {
    if (hasRole("admin")) {
      return [
        { name: "Dashboard", href: "/admin/dashboard", icon: BarChart3 },
        { name: "Manage Properties", href: "/admin/properties", icon: Building },
        { name: "Manage Users", href: "/admin/users", icon: Users },
        { name: "Settings", href: "/admin/settings", icon: Settings },
      ];
    }

    if (hasRole("agent")) {
      return [
        { name: "Dashboard", href: "/agent/dashboard", icon: BarChart3 },
        { name: "My Listings", href: "/agent/listings", icon: Building },
        { name: "Add Property", href: "/agent/add-property", icon: Plus },
        { name: "Profile", href: "/profile", icon: Users },
      ];
    }

    // Default user navigation
    return [
      { name: "Browse Properties", href: "/buy", icon: Search },
      { name: "Saved Properties", href: "/profile", icon: Heart },
      { name: "Profile", href: "/profile", icon: Users },
    ];
  };

  const navigationItems = getNavigationItems();

  return (
    <>
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ 
          x: isOpen ? 0 : -300,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50 lg:relative lg:translate-x-0 ${
          isOpen ? 'block' : 'hidden lg:block'
        }`}
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        }}
      >
        <div className="p-6">
          {/* User Info */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <img
                src={
                  user?.avatar ||
                  "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400"
                }
                alt={user?.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold text-gray-900">{user?.name}</p>
                <p className="text-sm text-gray-600 capitalize flex items-center">
                  {hasRole("admin") && <Shield className="h-3 w-3 mr-1" />}
                  {user?.type}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose} // close sidebar on mobile
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </motion.div>

      {/* Overlay (mobile only) */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-40 lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
};