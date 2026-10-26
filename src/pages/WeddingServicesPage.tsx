import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { imageUrl } from '../assets';

const WeddingServicesPage = () => {
    const weddingPackages = [
        {
            name: "Full Makeup Packages",
            note: "All services include hairstyling.",
            subcategory: true,
            items: [
                { name: "Bridal Makeup", desc: "Includes Hydrafacial, Acrylic Nail Extension, Manicure & Pedicure, Waxing", price: "NPR 18,000" },
                { name: "Reception Makeup", desc: "Includes Hydrafacial, Acrylic Nail Extension, Manicure & Pedicure, Waxing", price: "NPR 12,000" },
                { name: "Engagement Makeup", desc: "Includes Hydrafacial & Acrylic Nail Extension, Waxing", price: "NPR 10,000" }
            ]
        },
        {
            name: "Non-Bridal Makeup (Bridesmaids / Other Occasions)",
            note: "All services include hairstyling.",
            subcategory: true,
            items: [
                { name: "Party Attend Makeup", desc: "As per the hair styling requirement", price: "NPR 2,000" },
                { name: "Evening Makeup", desc: "Elegant evening look + Hair Styling", price: "NPR 1,500" },
                { name: "Baby Shower Makeup", desc: "Glowing maternity makeup + Hair Styling", price: "NPR 5,000" },
                { name: "Bratamanda Makeup", desc: "Traditional ceremony makeup + Hair Styling", price: "NPR 5,500" },
                { name: "Rice Feeding Makeup", desc: "Special occasion makeup + Hair Styling", price: "NPR 4,000" },
                { name: "Anniversary Makeup", desc: "Romantic celebration makeup + Hair Styling", price: "NPR 6,500" }
            ]
        },
        {
            name: "Makeup Only",
            note: "All services include hairstyling.",
            subcategory: true,
            items: [
                { name: "Bridal Makeup", desc: "Includes Facial + Hair Styling", price: "NPR 12,500" },
                { name: "Engagement Makeup", desc: "Complete engagement look + Facial", price: "NPR 5,500" },
                { name: "Reception Makeup", desc: "Includes Facial ", price: "NPR 10,500" }
            ]
        },
        {
            name: "Bridal Packages (Without Makeup)",
            subcategory: true,
            items: [
                { name: "Complete Pre-Bridal Package", desc: "Waxing Full Body, Full Face Threading, Full Body Scrub, Gold Facial, Full Body Massage, Deluxe Manicure & Pedicure, Hair Treatment, Bio Seaweed Gel Nail (Tip Extension with Bride Gel Nail), Bio Seaweed Gel Permanent Bridal Nails (Include own toe nails). Includes hair styling/treatment.", price: "NPR 15,000" }
            ]
        },
        {
            name: "Mehendi Services",
            subcategory: true,
            items: [
                { name: "Bride Mehendi", desc: "Traditional intricate bridal henna design", price: "From NPR 3,500" },
                { name: "Bridesmaid Mehendi", desc: "Beautiful henna designs for bridesmaids", price: "From NPR 2,000" },
                { name: "Festive Mehendi", desc: "Festival and celebration henna designs", price: "From NPR 1,500" }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <SEO
                title="Bridal & Wedding Beauty Packages | Sai Beauty Parlour"
                description="Complete bridal packages at Sai Beauty Parlour in Simara. Expert wedding makeup, bridal hair styling, saree/dupatta draping, and pre-bridal skincare routines."
                url="https://saibeautyparlour.com/services/wedding"
            />
            {/* Header */}
            <NavBar forceScrolled={true} />


            <main className="pt-28 pb-24 content-container">
                {/* Hero Section */}
                <div className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="text-center md:text-left">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-[#c85a9f] mb-4">Bridal Specialist</h4>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 text-gray-900">Wedding Packages</h1>
                        <p className="text-gray-500 max-w-lg mx-auto md:mx-0 text-lg font-light leading-relaxed">
                            Make your special day unforgettable with our comprehensive wedding beauty packages, from bridal makeup to family styling.
                        </p>
                    </div>
                    <div className="w-full flex justify-center md:justify-end">
                        <div className="aspect-square w-full max-w-[420px] max-h-[420px] rounded-2xl overflow-hidden shadow-2xl relative">
                            <img
                                src={imageUrl('sai1.jpg')}
                                alt="Wedding Package Services"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                width="420"
                                height="420"
                                loading="eager"
                                fetchPriority="high"
                                decoding="async"
                            />
                            <div className="absolute inset-0 bg-black/5"></div>
                        </div>
                    </div>
                </div>

                {/* Services List */}
                <div className="border-t border-gray-200 pt-16">
                    <h2 className="text-3xl font-serif font-bold text-black mb-12 text-center">Our Wedding Packages</h2>
                    <div className="space-y-16">
                        {weddingPackages.map((category, idx) => (
                            <div key={idx}>
                                <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-8 pb-2 border-b border-gray-100">{category.name}</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
                                    {category.items.map((service, serviceIdx) => (
                                        <div key={serviceIdx} className="group flex flex-col items-start justify-start border-b border-transparent hover:border-gray-200 pb-4 transition-colors">
                                            <div className="w-full flex justify-between items-baseline mb-2 gap-3">
                                                <h4 className="text-lg font-medium text-gray-900">{service.name}</h4>
                                                <span className="text-sm font-semibold text-pink-600 shrink-0">{service.price}</span>
                                            </div>
                                            <p className="text-gray-500 text-sm font-light w-full">{service.desc}</p>
                                        </div>
                                    ))}
                                </div>
                                {category.note && (
                                    <p className="text-sm text-gray-600 opacity-60 font-semibold mt-6">
                                        <strong>Note:</strong> {category.note}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-24 pt-16 border-t border-gray-200 text-center">
                    <h2 className="text-2xl font-serif font-bold mb-6">Ready to book your dream wedding look?</h2>
                    <Link to="/contact" className="inline-block px-4 sm:px-8 py-3.5 sm:py-3 bg-pink-500 hover:bg-pink-600 text-white text-xs sm:text-sm font-bold uppercase tracking-wide rounded-sm transition-colors whitespace-nowrap">
                        Book Wedding Appointment
                    </Link>
                </div>
            </main>
            {/* Footer */}
            <Footer />
        </div>
    );
};

export default WeddingServicesPage;