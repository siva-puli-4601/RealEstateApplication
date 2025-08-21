import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './pages/ScrollToTop';
import NotFoundPage from './pages/NotFoundPage';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';
import { LoadScript } from '@react-google-maps/api';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

const HomePage = lazy(() => import("./pages/HomePage"));
const BuyPage = lazy(() => import("./pages/BuyPage"));
const RentPage = lazy(() => import("./pages/RentPage"));
const SellPage = lazy(() => import("./pages/SellPage"));
const PropertyDetailsPage = lazy(() => import("./pages/PropertyDetailsPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const DashboardLayout = lazy(() => import("./components/layout/DashboardLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AgentDashboard = lazy(() => import("./pages/agent/AgentDashboard"));


function App() {
  return (
    <AuthProvider>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen">
            <Header />
            <main className="flex-1">
              <Suspense
                fallback={
                  <div className="min-h-screen flex items-center justify-center bg-slate-600">
                    <div className="loader"></div>
                  </div>
                }
              >

                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  {/* Admin Routes */}
                  <Route path="/admin/*" element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <DashboardLayout />
                    </ProtectedRoute>
                  }>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="properties" element={<AdminDashboard />} />
                    <Route path="users" element={<AdminDashboard />} />
                    <Route path="settings" element={<AdminDashboard />} />
                  </Route>

                  {/* Agent Routes */}
                  <Route path="/agent/*" element={
                    <ProtectedRoute allowedRoles={['agent']}>
                      <DashboardLayout />
                    </ProtectedRoute>
                  }>
                    <Route path="dashboard" element={<AgentDashboard />} />
                    <Route path="listings" element={<AgentDashboard />} />
                    <Route path="add-property" element={<AgentDashboard />} />
                  </Route>
                  <Route path="/profile" element={
                    <ProtectedRoute allowedRoles={['buyer', 'agent', 'admin']}>
                      <ProfilePage />
                    </ProtectedRoute>
                  } />
                
                <Route path="/" element={<HomePage />} />
                <Route path="/buy" element={<BuyPage />} />
                <Route path="/rent" element={<RentPage />} />
                <Route path="/sell" element={<SellPage />} />
                <Route path="/property/:id" element={<PropertyDetailsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </LoadScript>
    </AuthProvider >
  );
}

export default App;