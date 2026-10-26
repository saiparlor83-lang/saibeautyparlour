import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col justify-between">
      <SEO
        title="Page Not Found | Sai Beauty Parlour"
        description="The page you are looking for does not exist at Sai Beauty Parlour in Simara, Nepal."
        noindex={true}
      />
      <NavBar forceScrolled={true} />
      <div className="pt-40 pb-20 px-4 text-center max-w-lg mx-auto flex-grow flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold font-serif mb-4 text-[#d6006e]">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-gray-400 text-sm mb-8">
          Sorry, the page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-[#d6006e] hover:bg-[#b0005a] text-white font-bold rounded-lg transition-colors text-sm uppercase tracking-wider"
        >
          Return to Homepage
        </Link>
      </div>
      <Footer />
    </div>
  );
}
