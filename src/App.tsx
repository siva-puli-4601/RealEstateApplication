import React ,{ Suspense, lazy }from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import {ScrollToTop} from './pages/ScrollToTop';
import NotFoundPage from './pages/NotFoundPage';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

const HomePage = lazy(() => import("./pages/HomePage"));
const BuyPage = lazy(() => import("./pages/BuyPage"));
const RentPage = lazy(() => import("./pages/RentPage"));
const SellPage = lazy(() => import("./pages/SellPage"));
const PropertyDetailsPage = lazy(() => import("./pages/PropertyDetailsPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

function App() {
  return (
    <AuthProvider>
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
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/buy" element={<BuyPage />} />
            <Route path="/rent" element={<RentPage />} />
            <Route path="/sell" element={<SellPage />} />
            <Route path="/buy" element={<BuyPage />} />
            <Route path="/property/:id" element={<PropertyDetailsPage />} />
             <Route path="*" element={<NotFoundPage />} />
          </Routes>
           </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;