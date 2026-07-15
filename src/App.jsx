import { Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Seo from './components/Seo';

// Home sections
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';

// Pages
import About from './pages/About';
import ServiceAreas from './pages/ServiceAreas';
import AreaDetailPage from './pages/AreaDetailPage';
import ServicesPage from './pages/ServicesPage';
import StonePatios from './pages/StonePatios';
import OutdoorKitchens from './pages/OutdoorKitchens';
import OutdoorLighting from './pages/OutdoorLighting';
import Landscaping from './pages/Landscaping';
import ArtificialTurf from './pages/ArtificialTurf';
import VubaStone from './pages/VubaStone';
import Careers from './pages/Careers';
import OurStorySection from './components/OurStorySection';

function ScrollToTop() {
    const location = useLocation();
    useEffect(() => {
        if (location.hash) {
            const id = location.hash.slice(1);
            const tryScroll = (attempts = 0) => {
                const el = document.getElementById(id);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else if (attempts < 10) {
                    setTimeout(() => tryScroll(attempts + 1), 50);
                }
            };
            setTimeout(() => tryScroll(), 0);
        } else {
            window.scrollTo(0, 0);
        }
    }, [location.pathname, location.hash]);
    return null;
}

// Old portfolio galleries were merged into their service pages; keep deep links alive.
const PORTFOLIO_REDIRECTS = {
    'hardscaping': '/services/stone-patios',
    'landscaping': '/services/landscaping',
    'outdoor-kitchens': '/services/outdoor-kitchens',
    'turf': '/services/artificial-turf',
    'lighting': '/services/outdoor-lighting',
    'vuba-stone': '/vuba-stone',
};

function PortfolioRedirect() {
    const { slug } = useParams();
    return <Navigate to={PORTFOLIO_REDIRECTS[slug] ?? '/services'} replace />;
}

function HomePage() {
    return (
        <main>
            {/* Mirrors index.html so client-side nav back home restores the default meta */}
            <Seo
                title="Coast to Coast Landscape & Design — Luxury Hardscape & Drought-Ready Landscaping in Corpus Christi, TX"
                description="Coast to Coast Landscape & Design crafts high-end outdoor environments — stone terraces, custom retaining walls, permeable hardscape, and drought-ready landscapes across Corpus Christi, Rockport, Port Aransas, and the Coastal Bend."
                path="/"
            />
            <Hero />
            <ServicesSection showHeader={true} showCta={false} />
            <OurStorySection showValues={false} />
            <Process />
            <Testimonials />
            <ContactForm />
        </main>
    );
}

function App() {
    return (
        <>
            <ScrollToTop />
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/service-areas" element={<ServiceAreas />} />
                <Route path="/service-areas/:slug" element={<AreaDetailPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/stone-patios" element={<StonePatios />} />
                <Route path="/services/outdoor-kitchens" element={<OutdoorKitchens />} />
                <Route path="/services/outdoor-lighting" element={<OutdoorLighting />} />
                <Route path="/services/landscaping" element={<Landscaping />} />
                <Route path="/services/artificial-turf" element={<ArtificialTurf />} />
                <Route path="/vuba-stone" element={<VubaStone />} />
                <Route path="/about" element={<About />} />
                <Route path="/portfolio" element={<Navigate to="/services" replace />} />
                <Route path="/portfolio/:slug" element={<PortfolioRedirect />} />
                <Route path="/careers" element={<Careers />} />
            </Routes>
            <Footer />
            <Analytics />
            <SpeedInsights />
        </>
    );
}

export default App;
