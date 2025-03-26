import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import RegistrosPage from './pages/RegistrosPage';
import AvisoPrivacidad from './pages/AvisoPrivacidad.jsx';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        {/* Aseguramos que el Navbar esté siempre en primer plano */}
        <div className="main-nav-container">
          <Navbar />
        </div>
        <main className="flex-grow main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogDetailPage />} />
            <Route path="/registros" element={<RegistrosPage />} />
            <Route path="/aviso-privacidad" element={<AvisoPrivacidad />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;