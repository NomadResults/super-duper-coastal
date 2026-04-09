import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Home sections
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import BeforeAfter from './components/BeforeAfter';
import WhyUs from './components/WhyUs';
import Capabilities from './components/Capabilities';
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
import Portfolio from './pages/Portfolio';
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

function HomePage() {
    return (
        <main>
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
                <Route path="/about" element={<About />} />
                <Route path="/portfolio" element={<Portfolio />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
