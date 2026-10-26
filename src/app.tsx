import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
const LandingPage = lazy(() => import('./pages/LandingPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const Gallery = lazy(() => import('./pages/GalleryPage'));
const HairServicesPage = lazy(() => import('./pages/HairServicesPage'));
const SkincareServicesPage = lazy(() => import('./pages/SkincareServicesPage'));
const MakeupServicesPage = lazy(() => import('./pages/MakeupServicesPage'));
const NailsSpaServicesPage = lazy(() => import('./pages/NailsSpaServicesPage'));
const WeddingServicesPage = lazy(() => import('./pages/WeddingServicesPage'));
import ScrollToTop from './components/ScrollToTop';
const CoursePage = lazy(() => import('./pages/CoursePage'));
const CourseDetail = lazy(() => import('./pages/CourseDetail'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-white" />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services/hair" element={<HairServicesPage />} />
          <Route path="/services/skincare" element={<SkincareServicesPage />} />
          <Route path="/services/makeup" element={<MakeupServicesPage />} />
          <Route path="/services/nails-spa" element={<NailsSpaServicesPage />} />
          <Route path="/services/wedding" element={<WeddingServicesPage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/course" element={<CoursePage />} />
          <Route path="/courses" element={<CoursePage />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;