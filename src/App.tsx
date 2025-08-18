import React ,{ Suspense, lazy }from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import {ScrollToTop} from './pages/ScrollToTop';
import NotFoundPage from './pages/NotFoundPage';

const HomePage = lazy(() => import("./pages/HomePage"));
const BuyPage = lazy(() => import("./pages/BuyPage"));
const RentPage = lazy(() => import("./pages/RentPage"));
const SellPage = lazy(() => import("./pages/SellPage"));
const PropertyDetailsPage = lazy(() => import("./pages/PropertyDetailsPage"));

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen">
        <Header />
        <main className="flex-1">
           <Suspense
            fallback={
              <div className="flex items-center justify-center py-20 text-lg text-gray-600">
                Loading...
              </div>
            }
          >
          <Routes>
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
  );
}

export default App;