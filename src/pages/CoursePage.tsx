import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { courseData } from '../data/CourseData';
import SEO from '../components/SEO';
import { imageUrl } from '../assets';
import {
  FiBook, FiUsers, FiStar, FiActivity,
  FiBriefcase, FiCheckCircle, FiSearch,
  FiChevronRight, FiFilter, FiX
} from 'react-icons/fi';


// WhatsApp Message Handler
const openWhatsApp = (message: string) => {
  const phoneNumber = '9811168383';
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
};

const parseDurationInDays = (durationStr: string): number => {
  const num = parseFloat(durationStr) || 0;
  const lower = durationStr.toLowerCase();
  if (lower.includes('month')) return num * 30;
  if (lower.includes('week')) return num * 7;
  if (lower.includes('day')) return num;
  return num;
};

const CoursePage = () => {
  // Course Filtering & Display States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseType, setSelectedCourseType] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProgramLevel, setSelectedProgramLevel] = useState('All');
  const [sortBy, setSortBy] = useState('A to Z');
  const [visibleCount, setVisibleCount] = useState(9);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Derive complete course list directly from CourseData.ts (Single Source of Truth)
  const allCourses = Object.values(courseData);

  // Auto-scroll to courses if enroll parameter is set
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('enroll') === 'true') {
      setTimeout(() => {
        const coursesSection = document.getElementById('courses');
        if (coursesSection) {
          coursesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  // Dynamic Counts for Sidebar Filters
  const courseTypeOptions = useMemo(() => [
    { name: 'All', value: 'All', count: allCourses.length },
    { name: 'Package Courses', value: 'Comprehensive', count: allCourses.filter(c => c.courseType === 'Comprehensive').length },
    { name: 'Individual Courses', value: 'Individual', count: allCourses.filter(c => c.courseType === 'Individual').length }
  ], [allCourses]);

  const categoryOptions = useMemo(() => [
    { name: 'All', value: 'All', count: allCourses.length },
    { name: 'Makeup Courses', value: 'Makeup', count: allCourses.filter(c => c.category === 'Makeup').length },
    { name: 'Hair Courses', value: 'Hair', count: allCourses.filter(c => c.category === 'Hair').length },
    { name: 'Skin Care Courses', value: 'Skin Care', count: allCourses.filter(c => c.category === 'Skin Care').length },
    { name: 'Nails Courses', value: 'Nails', count: allCourses.filter(c => c.category === 'Nails').length },
    { name: 'Salon Skills Courses', value: 'Salon Skills', count: allCourses.filter(c => c.category === 'Salon Skills').length }
  ], [allCourses]);

  const programLevelOptions = useMemo(() => [
    { name: 'All', value: 'All', count: allCourses.length },
    { name: 'Basic', value: 'Basic', count: allCourses.filter(c => c.programLevel === 'Basic').length },
    { name: 'Advanced', value: 'Advanced', count: allCourses.filter(c => c.programLevel === 'Advanced').length },
    { name: 'Diploma', value: 'Diploma', count: allCourses.filter(c => c.programLevel === 'Diploma').length }
  ], [allCourses]);

  // Filter and Sort Processing
  const filteredCourses = useMemo(() => {
    return allCourses
      .filter((course) => {
        const matchesCourseType = selectedCourseType === 'All' || course.courseType === selectedCourseType;
        const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
        const matchesProgramLevel = selectedProgramLevel === 'All' || course.programLevel === selectedProgramLevel;

        const locationsStr = Array.isArray(course.locations) ? course.locations.join(' ') : (course.location || '');
        const query = searchQuery.toLowerCase().trim();
        const matchesQuery = !query ||
          course.title.toLowerCase().includes(query) ||
          course.topic.toLowerCase().includes(query) ||
          (course.description && course.description.toLowerCase().includes(query)) ||
          (course.category && course.category.toLowerCase().includes(query)) ||
          (course.courseType && course.courseType.toLowerCase().includes(query)) ||
          (course.programLevel && course.programLevel.toLowerCase().includes(query)) ||
          locationsStr.toLowerCase().includes(query);

        return matchesCourseType && matchesCategory && matchesProgramLevel && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'A to Z') return a.title.localeCompare(b.title);
        if (sortBy === 'Z to A') return b.title.localeCompare(a.title);
        if (sortBy === 'Duration') return parseDurationInDays(a.duration) - parseDurationInDays(b.duration);
        return 0;
      });
  }, [allCourses, searchQuery, selectedCourseType, selectedCategory, selectedProgramLevel, sortBy]);

  const visibleCourses = useMemo(() => filteredCourses.slice(0, visibleCount), [filteredCourses, visibleCount]);

  // Reset all filters helper
  const resetFilters = () => {
    setSelectedCourseType('All');
    setSelectedCategory('All');
    setSelectedProgramLevel('All');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCourseType !== 'All' || selectedCategory !== 'All' || selectedProgramLevel !== 'All' || searchQuery !== '';


  // Why Choose Academy Data
  const whyChoose = [
    {
      icon: <FiBook className="w-8 h-8" />,
      title: "Practical training in a real working salon",
      desc: "Learn on actual clients in our active salon environment"
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Small batches for personal attention",
      desc: "Maximum 8-10 students per batch ensuring quality training"
    },
    {
      icon: <FiStar className="w-8 h-8" />,
      title: "Experienced beauticians as trainers",
      desc: "Learn from 8-12+ years of industry experience"
    },
    {
      icon: <FiActivity className="w-8 h-8" />,
      title: "Strong focus on hands-on practice",
      desc: "70% practical, 30% theory for skill mastery"
    },
    {
      icon: <FiBriefcase className="w-8 h-8" />,
      title: "Career guidance and job placement support",
      desc: "Help finding employment or starting freelance work"
    },
    {
      icon: <FiCheckCircle className="w-8 h-8" />,
      title: "Professional certification upon completion",
      desc: "Recognized certificates valid across salons"
    }
  ];

  // Trainers
  const trainers = [
    {
      name: "Sanu Lama",
      role: "Owner & Lead Trainer",
      exp: "15+ years",
      bio: "Specialist in bridal and fashion makeup with international experience.",
      image: imageUrl('sanu1.jpg')
    },
    {
      name: "Priya Sharma",
      role: "Hair Styling Specialist",
      exp: "10+ years",
      bio: "Expert in precision cutting and color techniques. Trained at international salons.",
      image: imageUrl('parlour_frontimg.jpeg')
    },
    {
      name: "Meera Kapoor",
      role: "Skincare & Facial Expert",
      exp: "8+ years",
      bio: "Certified aesthetician specializing in advanced facial therapies.",
      image: imageUrl('sai3.jpg')
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Basic Beautician Graduate",
      text: "This course completely transformed my skills. The hands-on practice gave me confidence to start freelancing immediately.",
      rating: 5
    },
    {
      name: "Neha Kapoor",
      role: "Advanced Course Graduate",
      text: "The practical focus helped me understand client handling so much better. Placed within 2 weeks!",
      rating: 5
    },
    {
      name: "Anjali Mishra",
      role: "Diploma Graduate",
      text: "Six months felt like the perfect duration. The certificate opened doors to premium salons.",
      rating: 5
    }
  ];

  // Gallery Items
  const galleryItems = [
    { id: 1, image: imageUrl('training1.jpg') },
    { id: 2, image: imageUrl('training2.jpg') },
    { id: 3, image: imageUrl('training3.jpg') },
    { id: 4, image: imageUrl('training4.jpg') },
    { id: 5, image: imageUrl('training5.jpg') },
    { id: 6, image: imageUrl('training7.jpg') },
    { id: 7, image: imageUrl('new1.jpg') },
    { id: 8, image: imageUrl('new2.jpg') }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-pink-100 selection:text-pink-900">
      <SEO
        title="Beauty & Beautician Training Courses | Sai Beauty Academy"
        description="Enroll in professional beautician courses at Sai Beauty Academy in Simara. Basic & Advanced beauty, HD makeup, bridal hair styling, skincare, nail art, and diploma programs."
        url="https://saibeautyparlour.com/courses"
      />
      {/* Header */}
      <NavBar forceScrolled={true} />


      <main className="pt-16">
        {/* ========== HERO SECTION ========== */}
        <section className="relative w-full min-h-[75vh] flex flex-col justify-center items-center py-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={imageUrl('parlour_frontimg.webp')}
              srcSet={`${imageUrl('parlour_frontimg-mobile.webp')} 768w, ${imageUrl('parlour_frontimg.webp')} 1920w`}
              sizes="100vw"
              alt="Beauty Training Academy"
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/75"></div>
          </div>

          <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-pink-600/30 backdrop-blur-md border border-pink-500/40 text-pink-100 text-xs font-semibold uppercase tracking-wider mb-8">
              Master Professional Beauty Skills
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
              Master Professional <br className="hidden sm:block" />Beauty Skills with Expert Training
            </h1>

            <p className="text-gray-200 text-base sm:text-lg max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              Hands-on practical training inside our working salon | Certified programs with real career support
            </p>

            <div className="flex flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 bg-white text-gray-900 font-semibold text-sm rounded-none border border-gray-900 hover:bg-gray-100 transition-all uppercase tracking-wider flex items-center gap-2 cursor-pointer"
              >
                <FiSearch className="w-4 h-4" />
                <span>Browse Courses</span>
              </button>
              <button
                onClick={() => openWhatsApp("Hi, I'm interested in your beauty training programs. Please share details.")}
                className="px-6 py-3.5 bg-pink-600 text-white font-semibold text-sm rounded-none border border-pink-600 hover:bg-pink-700 transition-all uppercase tracking-wider cursor-pointer"
              >
                Contact Us
              </button>
            </div>
          </div>
        </section>

        {/* ========== WHY CHOOSE SECTION ========== */}
        <section className="w-full py-16 bg-white border-b border-gray-100">
          <div className="content-container">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-3 text-gray-900">Why Choose Our Beauty Academy</h2>
              <p className="text-gray-600 text-sm font-light max-w-xl mx-auto">Warm, inviting training with a focus on real-world skills and career growth</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyChoose.map((item, idx) => (
                <div key={idx} className="p-6 bg-gray-50 rounded-none border border-gray-200 hover:border-black transition-all">
                  <div className="mb-4 text-gray-900">{item.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2 text-base">{item.title}</h3>
                  <p className="text-xs text-gray-600 font-light leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== COURSES SECTION ========== */}
        <section id="courses" className="w-full py-12 bg-white">
          <div className="content-container">

            {/* TOP BAR / CONTROLS */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">

              {/* Search Bar */}
              <div className="relative flex-1 max-w-xl">
                <input
                  type="text"
                  placeholder="Search by course title, category, skill..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 bg-white border border-gray-300 text-sm focus:outline-none focus:border-black placeholder-gray-500"
                />
                <FiSearch className="absolute right-3.5 top-3.5 text-gray-500 w-4 h-4" />
              </div>

              {/* Mobile Filter Toggle & Sort Header Controls */}
              <div className="flex items-center justify-between gap-4">
                {/* Mobile Filter Button (<1024px) */}
                <button
                  onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <FiFilter className="w-4 h-4" />
                  <span>Filters</span>
                  {hasActiveFilters && (
                    <span className="w-2 h-2 rounded-full bg-pink-600"></span>
                  )}
                </button>

                {/* Sort By Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-bold text-gray-500 tracking-wider whitespace-nowrap">Sort By</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 px-3 py-2 text-sm bg-white focus:outline-none focus:border-black cursor-pointer"
                  >
                    <option value="A to Z">Course: A to Z</option>
                    <option value="Z to A">Course: Z to A</option>
                    <option value="Duration">Duration</option>
                  </select>
                </div>
              </div>
            </div>

            {/* MAIN CONTENT GRID LAYOUT */}
            <div className="flex flex-col lg:flex-row gap-8 items-start">

              {/* SIDEBAR FILTERS */}
              <aside className={`
                fixed inset-0 z-50 bg-white p-6 overflow-y-auto transition-transform duration-300
                lg:static lg:z-0 lg:p-0 lg:w-64 lg:block lg:translate-x-0
                ${mobileFilterOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
              `}>
                {/* Mobile Drawer Close Header */}
                <div className="flex items-center justify-between lg:hidden mb-6 border-b pb-4">
                  <h3 className="text-lg font-bold">Filters</h3>
                  <button onClick={() => setMobileFilterOpen(false)} className="p-1">
                    <FiX className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-serif font-bold text-gray-900">Filters</h3>
                      {hasActiveFilters && (
                        <button
                          onClick={resetFilters}
                          className="text-xs uppercase text-gray-500 hover:text-black font-semibold underline tracking-wider"
                        >
                          Clear All
                        </button>
                      )}
                    </div>

                    {/* Course Type Filter */}
                    <div className="border-t border-gray-200 pt-4 mb-5">
                      <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">Course Type</h4>
                      <div className="space-y-2">
                        {courseTypeOptions.map((opt) => (
                          <label
                            key={opt.name}
                            className="flex items-center justify-between text-sm text-gray-700 hover:text-black cursor-pointer py-1"
                          >
                            <div className="flex items-center gap-2.5">
                              <input
                                type="radio"
                                name="courseType"
                                checked={selectedCourseType === opt.value}
                                onChange={() => {
                                  setSelectedCourseType(opt.value);
                                  setMobileFilterOpen(false);
                                }}
                                className="w-4 h-4 border-gray-300 text-black focus:ring-black cursor-pointer"
                              />
                              <span className={selectedCourseType === opt.value ? 'font-bold text-black' : 'font-normal'}>
                                {opt.name}
                              </span>
                            </div>
                            <span className="text-xs text-gray-400 font-light">{opt.count}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Category Filter */}
                    <div className="border-t border-gray-200 pt-4 mb-5">
                      <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">Category</h4>
                      <div className="space-y-2">
                        {categoryOptions.map((cat) => (
                          <label
                            key={cat.name}
                            className="flex items-center justify-between text-sm text-gray-700 hover:text-black cursor-pointer py-1"
                          >
                            <div className="flex items-center gap-2.5">
                              <input
                                type="radio"
                                name="category"
                                checked={selectedCategory === cat.value}
                                onChange={() => {
                                  setSelectedCategory(cat.value);
                                  setMobileFilterOpen(false);
                                }}
                                className="w-4 h-4 border-gray-300 text-black focus:ring-black cursor-pointer"
                              />
                              <span className={selectedCategory === cat.value ? 'font-bold text-black' : 'font-normal'}>
                                {cat.name}
                              </span>
                            </div>
                            <span className="text-xs text-gray-400 font-light">{cat.count}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Course Level Filter */}
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">Course Level</h4>
                      <div className="space-y-2">
                        {programLevelOptions.map((prog) => (
                          <label
                            key={prog.name}
                            className="flex items-center justify-between text-sm text-gray-700 hover:text-black cursor-pointer py-1"
                          >
                            <div className="flex items-center gap-2.5">
                              <input
                                type="radio"
                                name="programLevel"
                                checked={selectedProgramLevel === prog.value}
                                onChange={() => {
                                  setSelectedProgramLevel(prog.value);
                                  setMobileFilterOpen(false);
                                }}
                                className="w-4 h-4 border-gray-300 text-black focus:ring-black cursor-pointer"
                              />
                              <span className={selectedProgramLevel === prog.value ? 'font-bold text-black' : 'font-normal'}>
                                {prog.name}
                              </span>
                            </div>
                            <span className="text-xs text-gray-400 font-light">{prog.count}</span>
                          </label>
                        ))}
                      </div>
                    </div>


                  </div>
                </div>
              </aside>

              {/* RESULTS CONTAINER */}
              <div className="flex-1 w-full">
                {/* Section Header */}
                <div className="mb-6 pb-2 border-b-2 border-black flex items-baseline justify-between">
                  <h2 className="text-3xl font-serif font-bold text-gray-900">
                    Results ({filteredCourses.length})
                  </h2>
                </div>

                {filteredCourses.length === 0 ? (
                  <div className="py-16 text-center border border-dashed border-gray-300">
                    <p className="text-gray-500 text-base">No courses matched your search and filter criteria.</p>
                    <button
                      onClick={resetFilters}
                      className="mt-4 px-4 py-2 bg-black text-white text-xs uppercase tracking-wider hover:bg-pink-600 transition-colors"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  <>
                    {/* MOBILE VIEW (<768px): Ref 3 Horizontal Row Design */}
                    <div className="block md:hidden divide-y divide-gray-200 border-t border-b border-gray-200">
                      {visibleCourses.map((course) => (
                        <div key={course.id}>
                          <Link
                            to={`/courses/${course.slug}`}
                            className="py-4 flex items-center gap-4 group cursor-pointer hover:bg-gray-50 transition-colors"
                          >
                            {/* Left Square Thumbnail */}
                            <div className="w-20 h-20 flex-shrink-0 overflow-hidden bg-gray-100">
                              <img
                                src={course.image}
                                alt={course.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>

                            {/* Center Metadata */}
                            <div className="flex-1 min-w-0 pr-2">
                              <h3 className="text-base font-bold text-gray-900 truncate mb-1">
                                {course.title}
                              </h3>
                              <p className="text-xs text-gray-700 line-clamp-2 leading-relaxed">
                                <span className="font-semibold">Topic:</span> {course.topic}<br />
                                <span className="font-semibold">Location:</span> {Array.isArray(course.locations) ? course.locations.join(", ") : (course.location || "Academy")}
                              </p>
                            </div>

                            {/* Right Arrow Icon */}
                            <div className="text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all pr-2">
                              <FiChevronRight className="w-5 h-5" />
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>

                    {/* TABLET AND DESKTOP VIEW (≥768px): Responsive Card Grid */}
                    <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {visibleCourses.map((course) => (
                        <div
                          key={course.id}
                          className="relative group bg-black aspect-[3/4] overflow-hidden flex flex-col justify-end p-6 text-white border border-gray-200"
                        >
                          {/* Background Image */}
                          <img
                            src={course.image}
                            alt={course.title}
                            className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20"></div>

                          {/* Content Details Overlay */}
                          <div className="relative z-10 space-y-2">
                            <div className="text-[12px] text-gray-200 leading-relaxed font-light">
                              <p><span className="font-normal text-gray-300">Topic:</span> {course.topic}</p>
                              <p className="line-clamp-2"><span className="font-normal text-gray-300">Location:</span> {Array.isArray(course.locations) ? course.locations.join(", ") : (course.location || "Academy")}</p>
                              <p><span className="font-normal text-gray-300">Duration:</span> {course.duration}</p>
                            </div>

                            <h3 className="text-xl font-bold font-serif text-white tracking-wide leading-tight pt-1">
                              {course.title}
                            </h3>

                            {/* CTA Button */}
                            <Link
                              to={`/courses/${course.slug}`}
                              className="w-full mt-3 py-3 bg-[#2d2d2d] hover:bg-black text-white font-semibold text-xs uppercase tracking-widest transition-all border border-gray-700 hover:border-white flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <span>Learn More</span>
                              <span>&rarr;</span>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* SHOW MORE / SHOW LESS BUTTON */}
                    {filteredCourses.length > 9 && (
                      <div className="mt-12 text-center">
                        {visibleCount < filteredCourses.length ? (
                          <button
                            onClick={() => setVisibleCount(filteredCourses.length)}
                            className="px-8 py-3.5 bg-black text-white text-xs font-bold uppercase tracking-widest border border-black hover:bg-pink-600 hover:border-pink-600 transition-all cursor-pointer shadow-md"
                          >
                            Show More Courses ({filteredCourses.length - visibleCount} Remaining)
                          </button>
                        ) : (
                          <button
                            onClick={() => setVisibleCount(9)}
                            className="px-8 py-3.5 border border-black text-black text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all cursor-pointer"
                          >
                            Show Less
                          </button>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ========== GALLERY SECTION ========== */}
        <section className="w-full py-20 bg-white border-t border-b border-gray-100">
          <div className="content-container">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-3 text-gray-900">Gallery – Training in Action</h2>
              <p className="text-gray-600 text-sm font-light">Real moments from our training sessions and student achievements</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryItems.map((item) => (
                <div key={item.id} className="aspect-square bg-gray-200 overflow-hidden group cursor-pointer">
                  <img
                    src={item.image}
                    alt={`Training moment ${item.id}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    width="300"
                    height="300"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== MEET TRAINERS SECTION ========== */}
        <section className="w-full py-20 bg-gray-50">
          <div className="content-container">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-3 text-gray-900">Meet Our Trainers</h2>
              <p className="text-gray-600 text-sm font-light">Expert instructors with years of industry experience</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {trainers.map((trainer, idx) => (
                <div key={idx} className="bg-white border border-gray-200 overflow-hidden">
                  <div className="h-64 overflow-hidden bg-gray-200">
                    <img
                      src={trainer.image}
                      alt={trainer.name}
                      className="w-full h-full object-cover"
                      width="400"
                      height="256"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1 font-serif">{trainer.name}</h3>
                    <p className="text-xs text-pink-600 font-bold mb-1 uppercase tracking-wider">{trainer.role}</p>
                    <p className="text-xs text-gray-500 font-light mb-3">Experience: {trainer.exp}</p>
                    <p className="text-xs text-gray-700 font-light leading-relaxed">{trainer.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== TESTIMONIALS SECTION ========== */}
        <section className="w-full py-20 bg-white">
          <div className="content-container">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-3 text-gray-900">What Our Students Say</h2>
              <p className="text-gray-600 text-sm font-light">Genuine testimonials from our graduates</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="bg-gray-50 p-6 border border-gray-200">
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2l-2.81 6.63L2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xs text-gray-700 font-light leading-relaxed mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CoursePage;