import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
    // Image imports
    const heroInterior = '/images/sai_interior2.jpeg';
    const founder = '/images/sanu1.jpg';
    const galleryMain = '/images/sai_interior.jpeg';
    const galleryTools = '/images/sai3.jpg';
    const galleryFacial = '/images/sai_interior2.jpeg';
    const team1 = '/images/team1.jpg';
    const team2 = '/images/team2.jpg';
    const team3 = '/images/team3.jpg';

    return (
        <div className="min-h-screen bg-white antialiased font-sans">
            <NavBar forceScrolled={true} />

            <main className="pt-20 bg-white">

                {/* =====================================================
                    1. HERO / OUR STORY
                ====================================================== */}
                <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
                    <div className="grid items-center gap-12 md:grid-cols-2">

                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-2 block">
                                About Us
                            </span>

                            <h1 className="mt-2 mb-6 text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight text-gray-900">
                                Our Story & Vision
                            </h1>

                            <p className="text-base md:text-lg leading-relaxed text-gray-600">
                                Founded with a passion to redefine beauty education and salon
                                services, Sai Beauty Academy has grown from a humble studio
                                into a sanctuary where aspiring beauty professionals master
                                their craft with integrity and elegance.
                            </p>
                        </div>

                        <div>
                            <img
                                src={heroInterior}
                                alt="Salon Interior"
                                className="h-[450px] w-full rounded-sm object-cover shadow-md"
                            />
                        </div>

                    </div>
                </section>


                {/* =====================================================
                    2. WHERE TRADITION MEETS INNOVATION
                ====================================================== */}
                <section className="bg-gradient-to-br from-amber-50 via-white to-amber-50 text-black px-6 py-20 border-t border-b border-gray-200">
                    <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">

                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-2 block">
                                Our Journey
                            </span>

                            <h2 className="mt-2 mb-6 text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-gray-900 leading-tight">
                                Where tradition meets innovation
                            </h2>
                        </div>

                        <div className="space-y-4 text-sm md:text-base leading-relaxed text-gray-600">
                            <p>
                                We believe beauty education goes beyond technique—it's about
                                empowering individuals to discover their unique artistic voice
                                and build fulfilling careers that celebrate creativity,
                                confidence, and connection with clients.
                            </p>

                            <p>
                                Every student who walks through our doors isn't just learning
                                beauty—they're learning to transform lives, starting with
                                their own.
                            </p>
                        </div>

                    </div>
                </section>


                {/* =====================================================
                    3. OUR COMMITMENT
                ====================================================== */}
                <section
                    id="commitments"
                    className="mx-auto max-w-7xl border-b border-gray-200 px-6 py-24"
                >
                    <div className="mx-auto mb-16 max-w-2xl text-center">

                        <span className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-2 block">
                            Our Promise
                        </span>

                        <h2 className="mt-2 text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-gray-900">
                            Our Commitment to Excellence
                        </h2>

                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

                        {[
                            {
                                number: "01",
                                title: "Hands-on Experience",
                                description:
                                    "Every student gains real-world practical experience working with real clients under expert guidance.",
                            },
                            {
                                number: "02",
                                title: "Expert Instructors",
                                description:
                                    "Learn directly from seasoned industry masters with decades of combined beauty experience.",
                            },
                            {
                                number: "03",
                                title: "Modern Facilities",
                                description:
                                    "Train in state-of-the-art facilities equipped with top-tier professional products and tools.",
                            },
                            {
                                number: "04",
                                title: "Career Support",
                                description:
                                    "Receive job placement support and business mentorship to launch your beauty career.",
                            },
                        ].map((item) => (
                            <div
                                key={item.number}
                                className="border-t-2 border-gray-900 pt-6"
                            >
                                <span className="mb-3 block font-serif text-5xl font-light text-gray-300">
                                    {item.number}
                                </span>

                                <h3 className="mb-2 text-xl font-serif font-bold text-gray-900">
                                    {item.title}
                                </h3>

                                <p className="text-sm leading-relaxed text-gray-600">
                                    {item.description}
                                </p>
                            </div>
                        ))}

                    </div>
                </section>


                {/* =====================================================
                    4. FOUNDER
                ====================================================== */}
                <section className="mx-auto max-w-7xl border-b border-gray-200 px-6 py-24">
                    <div className="grid items-center gap-12 md:grid-cols-12">

                        <div className="md:col-span-5">
                            <img
                                src={founder}
                                alt="Sanu Lama"
                                className="h-[500px] w-full rounded-sm object-cover shadow-md"
                            />
                        </div>

                        <div className="md:col-span-7">

                            <span className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-2 block">
                                Founder & Visionary
                            </span>

                            <h2 className="mt-1 mb-1 text-3xl md:text-4xl font-serif font-bold text-gray-900">
                                Sanu Lama
                            </h2>

                            <p className="mb-6 text-xs font-bold uppercase tracking-wider text-gray-500">
                                Beauty Artist & Educator
                            </p>

                            <p className="mb-6 text-sm md:text-base leading-relaxed text-gray-600">
                                With over 15 years of experience in professional beauty
                                services and education, Sanu has made it her life's mission
                                to elevate beauty education in Nepal. Her journey began in a
                                small salon chair, where she discovered her passion for
                                transforming clients' confidence through beauty. Today, she
                                leads a thriving academy dedicated to nurturing the next
                                generation of beauty professionals.
                            </p>

                            <blockquote className="my-6 border-l-2 border-gray-900 py-2 pl-6 font-serif text-xl italic text-gray-800">
                                "Beauty is not just about appearance—it's about empowering
                                individuals to feel confident, capable, and celebrated."
                            </blockquote>

                            <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-4">

                                <div>
                                    <p className="font-semibold text-gray-900 text-sm">
                                        ✓ 15+ Years Experience
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Professional beauty industry
                                    </p>
                                </div>

                                <div>
                                    <p className="font-semibold text-gray-900 text-sm">
                                        ✓ Certified Educator
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        International beauty standards
                                    </p>
                                </div>

                                <div>
                                    <p className="font-semibold text-gray-900 text-sm">
                                        ✓ Award-Winning Work
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Multiple industry recognitions
                                    </p>
                                </div>

                                <div>
                                    <p className="font-semibold text-gray-900 text-sm">
                                        ✓ Bridal Specialist
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Expertise in wedding beauty
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>
                </section>


                {/* =====================================================
                    5. GALLERY
                ====================================================== */}
                <section className="bg-gradient-to-br from-amber-50 via-white to-amber-50 text-black px-6 py-20 border-b border-gray-200">
                    <div className="mx-auto max-w-7xl">

                        <div className="mx-auto mb-12 max-w-2xl text-center">

                            <span className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-2 block">
                                Our Work
                            </span>

                            <h2 className="mt-2 text-3xl md:text-4xl font-serif font-bold text-gray-900">
                                The Sanctuary & Academy Treatments
                            </h2>

                            <p className="mt-2 text-sm text-gray-600">
                                Experience art and care in our world-class salon and academy
                                environment.
                            </p>

                        </div>

                        <div className="grid items-stretch gap-6 md:grid-cols-12">

                            <div className="md:col-span-7">
                                <img
                                    src={galleryMain}
                                    alt="Main Salon Area"
                                    className="h-[520px] w-full rounded-sm object-cover shadow-md"
                                />
                            </div>

                            <div className="flex flex-col gap-6 md:col-span-5">

                                <img
                                    src={galleryTools}
                                    alt="Salon Tools"
                                    className="h-[247px] w-full rounded-sm object-cover shadow-md"
                                />

                                <img
                                    src={galleryFacial}
                                    alt="Facial Treatment"
                                    className="h-[247px] w-full rounded-sm object-cover shadow-md"
                                />

                            </div>

                        </div>

                        <div className="mt-10 text-center">
                            <Link
                                to="/gallery"
                                className="inline-flex items-center gap-2 rounded border border-gray-300 bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-wide text-gray-900 transition hover:bg-gray-50"
                            >
                                See Gallery
                                <span>→</span>
                            </Link>
                        </div>

                    </div>
                </section>


                {/* =====================================================
                    6. MEET OUR TEAM
                ====================================================== */}
                <section className="mx-auto max-w-7xl border-b border-gray-200 px-6 py-24">

                    <div className="mx-auto mb-16 max-w-2xl text-center">

                        <span className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-2 block">
                            Expert Team
                        </span>

                        <h2 className="mt-2 text-3xl md:text-4xl font-serif font-bold text-gray-900">
                            Meet Our Team
                        </h2>

                        <p className="mt-2 text-sm text-gray-600">
                            Passionate professionals committed to nurturing your creative
                            journey
                        </p>

                    </div>

                    <div className="grid gap-10 md:grid-cols-3">

                        {[
                            {
                                image: team1,
                                name: "Deepa Sharma",
                                role: "Senior Hair Colorist",
                                description:
                                    "With 8 years of specialized expertise in color theory and advanced techniques.",
                            },
                            {
                                image: team2,
                                name: "Nisha Adhikari",
                                role: "Skincare Specialist",
                                description:
                                    "Dedicated to holistic skin wellness, combining scientific knowledge with care.",
                            },
                            {
                                image: team3,
                                name: "Anita Thapa",
                                role: "Makeup Artist",
                                description:
                                    "A creative visionary who teaches makeup as an art form, enhancing natural beauty.",
                            },
                        ].map((member) => (
                            <div key={member.name} className="text-center">

                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="mb-4 h-80 w-full rounded-sm object-cover shadow-sm"
                                />

                                <h3 className="text-2xl font-serif font-bold text-gray-900">
                                    {member.name}
                                </h3>

                                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                                    {member.role}
                                </p>

                                <p className="mx-auto max-w-xs text-xs md:text-sm text-gray-500 leading-relaxed">
                                    {member.description}
                                </p>

                            </div>
                        ))}

                    </div>

                </section>


                {/* =====================================================
                    7. TESTIMONIALS
                ====================================================== */}
                <section className="bg-white px-6 py-20 border-b border-gray-200">

                    <div className="mx-auto max-w-7xl">

                        <div className="grid items-center gap-8 md:grid-cols-12">

                            <div className="md:col-span-4">

                                <span className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-2 block">
                                    Testimonials
                                </span>

                                <h2 className="mt-2 mb-4 text-3xl md:text-4xl font-serif font-bold text-gray-900">
                                    What Our Clients & Students Say
                                </h2>

                            </div>

                            <div className="grid gap-6 md:col-span-8 md:grid-cols-2">

                                <div className="rounded-sm border border-gray-200 bg-white p-6 shadow-sm">

                                    <span className="font-serif text-4xl leading-none text-gray-400 font-bold block mb-2">
                                        “
                                    </span>

                                    <p className="mb-4 text-sm italic text-gray-600">
                                        The diploma course completely changed my career path. The
                                        instructors are incredibly supportive and patient.
                                    </p>

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white">
                                            AS
                                        </div>

                                        <div>
                                            <h4 className="font-sans text-sm font-bold text-gray-900">
                                                Aarti S.
                                            </h4>

                                            <p className="text-xs text-gray-500">
                                                Academy Graduate, 2025
                                            </p>
                                        </div>

                                    </div>

                                </div>


                                <div className="rounded-sm border border-gray-200 bg-white p-6 shadow-sm">

                                    <span className="font-serif text-4xl leading-none text-gray-400 font-bold block mb-2">
                                        “
                                    </span>

                                    <p className="mb-4 text-sm italic text-gray-600">
                                        The bridal makeup team did an extraordinary job for my
                                        wedding day. I couldn't have felt more beautiful!
                                    </p>

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white">
                                            RT
                                        </div>

                                        <div>
                                            <h4 className="font-sans text-sm font-bold text-gray-900">
                                                Riya T.
                                            </h4>

                                            <p className="text-xs text-gray-500">
                                                Bridal Client
                                            </p>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                {/* =====================================================
                    8. CTA
                ====================================================== */}
                <section className="bg-gradient-to-br from-amber-50 via-white to-amber-50 px-6 py-20 text-center border-t border-gray-200">

                    <div className="mx-auto max-w-3xl">

                        <h2 className="mb-4 text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-gray-900">
                            Ready to begin your beauty journey?
                        </h2>

                        <p className="mx-auto mb-8 max-w-xl text-gray-600 text-sm md:text-base leading-relaxed">
                            Join our community of passionate beauty professionals and
                            discover your artistic potential.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4">

                            <Link
                                to="/contact"
                                className="rounded-md bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800"
                            >
                                Book Appointment
                            </Link>

                            <Link
                                to="/course"
                                className="rounded-md border border-gray-900 bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
                            >
                                Explore Training Courses
                            </Link>

                        </div>

                    </div>

                </section>

            </main>

            <Footer />

        </div>
    );
};

export default AboutPage;
