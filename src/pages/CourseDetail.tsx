import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { courseData } from "../data/CourseData";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { Helmet } from "react-helmet-async";

const TAB_KEYS = {
  ABOUT: "About this course",
  CONTENT: "Course content",
  BEFORE_APPLY: "Before you apply",
  DURATION: "Duration & timetable",
  FEES: "Course fees & costs",
  NEXT: "What's next",
  FAQS: "FAQs",
};

export default function CourseDetail() {
  const { slug } = useParams();
  const coursesData = Object.values(courseData);
  const course = slug ? courseData[slug] : undefined;
  const [activeTab, setActiveTab] = useState(TAB_KEYS.ABOUT);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  if (!course) {
    return (
      <div className="min-h-screen bg-white text-gray-900 font-sans">
        <SEO
          title="Course Not Found | Sai Beauty Academy"
          description="The requested beauty training course could not be found."
          noindex={true}
        />
        <NavBar forceScrolled={true} />
        <div className="pt-32 pb-20 px-4 text-center max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
          <p className="text-gray-600 text-sm mb-6">The course you are looking for does not exist or has been relocated.</p>
          <Link
            to="/courses"
            className="inline-block px-6 py-3 bg-[#d6006e] text-white text-xs font-bold uppercase tracking-wider"
          >
            Back to All Courses
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.title,
    "description": course.description,
    "provider": {
      "@type": "Organization",
      "name": "Sai Beauty Academy",
      "sameAs": "https://saibeautyparlour.com/"
    }
  };

  const otherCourses = coursesData
    .filter((item) => item.slug !== slug)
    .slice(0, 3);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const openWhatsApp = () => {
    const phoneNumber = '9811168383';
    const message = encodeURIComponent(course.whatsappMsg || `Hi, I am interested in enrolling for ${course.title}. Please share fee details and schedules.`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] font-sans selection:bg-pink-100 selection:text-pink-900">
      <SEO
        title={`${course.title} | Sai Beauty Academy`}
        description={course.description}
        image={course.image}
        url={`https://saibeautyparlour.com/courses/${course.slug}`}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(courseSchema)}
        </script>
      </Helmet>
      <NavBar forceScrolled={true} />


      {/* ================= HERO SECTION (60vh HEIGHT) ================= */}
      <section className="relative w-full pt-20 pb-12 min-h-[60vh] flex items-end overflow-hidden bg-gray-900 text-white">
        <div className="absolute inset-0 z-0">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover opacity-80"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          {/* Light gradient overlay so hero image stays bright */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20"></div>
        </div>

        <div className="relative z-10 content-container pb-6 sm:pb-10">
          <div className="text-xs sm:text-sm uppercase tracking-widest text-pink-200 font-semibold mb-2">
            {course.category || course.topic}
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wide text-white leading-tight">
            {course.title}
          </h1>
        </div>
      </section>

      {/* ================= COURSE OVERVIEW HEADING ================= */}
      <div className="content-container pt-8 pb-2 bg-white">
        <div className="inline-block border-b-2 border-black pb-1">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-900">
            COURSE OVERVIEW
          </span>
        </div>
      </div>

      {/* ================= TABS BAR (BOXED TAB DESIGN MATCHING INSPIRATION) ================= */}
      <nav className="sticky top-16 z-20 bg-white border-b border-gray-300 shadow-xs">
        <div className="content-container py-3">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {Object.values(TAB_KEYS).map((tab) => {
              const isActive = activeTab === tab;

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    px-3.5 py-2
                    text-xs sm:text-sm
                    font-bold
                    whitespace-nowrap
                    cursor-pointer
                    border transition-colors
                    ${isActive
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-900 border-gray-400 hover:bg-gray-100"
                    }
                  `}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ================= TAB CONTENT (CLEAN MINIMALIST LAYOUT MATCHING INSPIRATION) ================= */}
      <main className="content-container py-10">

        {/* ----------------- TAB: ABOUT THIS COURSE ----------------- */}
        {activeTab === TAB_KEYS.ABOUT && (
          <div className="space-y-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
              What is the {course.title}?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Left Column: Course Image & Description */}
              <div className="md:col-span-4 space-y-4">
                <div className="w-full aspect-[4/3] bg-gray-100 overflow-hidden border border-gray-200">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right Column: Detailed Text */}
              <div className="md:col-span-8 space-y-6 text-gray-700 text-sm leading-relaxed font-light">
                <p>{course.description}</p>
                <p>
                  Our {course.title} teaches you essential practical techniques to build a successful foundation in salon care and professional beauty treatments. You will learn to perform treatments offered across leading salons and spas.
                </p>

                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">Who is this course for?</h3>
                  <p>
                    This course is ideal for beginners, aspiring beauticians, salon staff, and beauty enthusiasts interested in developing professional skills. No prior experience is required for entry-level enrollment.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">Our training parlour & academy</h3>
                  <p>
                    You will be trained at our fully equipped parlour & academy location in Simara, Nepal (Airport Road, Gadhimai). Practical sessions take place inside purpose-designed training rooms with active salon client scenarios.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- TAB: COURSE CONTENT ----------------- */}
        {activeTab === TAB_KEYS.CONTENT && (
          <div className="space-y-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
              What will I learn on the {course.title}?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Left Column: Topics and Bullet Lists */}
              <div className="md:col-span-5 space-y-6 text-sm text-gray-700 font-light leading-relaxed">
                <p>
                  You will learn how to safely perform a range of professional beauty and grooming services. You will also develop essential client communication, health & safety, and practical salon skills.
                </p>

                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-3">Key Focus Topics</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-800 font-normal">
                    {course.focusPoints.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Experience, Assessment, Qualification */}
              <div className="md:col-span-7 space-y-6 text-sm text-gray-700 font-light leading-relaxed">
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">What industry experience will I get?</h3>
                  <p>
                    You will gain direct hands-on industry experience by training on live models during practical lab sessions under trainer supervision.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">How is the course assessed?</h3>
                  <p>
                    Assessments include ongoing practical evaluations, hands-on task assignments, and a final practical demonstration.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">What is the qualification level?</h3>
                  <p>
                    Students who complete attendance and practical assessments receive a certified Course Completion Certificate recognized across beauty salons.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- TAB: BEFORE YOU APPLY ----------------- */}
        {activeTab === TAB_KEYS.BEFORE_APPLY && (
          <div className="space-y-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
              What are the entry requirements for {course.title}?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Left Column: Requirements */}
              <div className="md:col-span-5 space-y-4 text-sm text-gray-700 font-light leading-relaxed">
                <p className="font-normal text-gray-900">
                  Course prerequisites and entry guidance:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-800">
                  {course.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>

              {/* Right Column: Important Notes & Applicant Guidelines */}
              <div className="md:col-span-7 space-y-6 text-sm text-gray-700 font-light leading-relaxed">
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">Applicant Guidelines</h3>
                  <p>
                    We welcome all individuals who are passionate about beauty, hair, or makeup. If you do not have previous experience, our beginner modules are structured to teach core skills from step one.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">Important Information</h3>
                  <p>
                    Training includes hands-on practical work. Students will be required to perform and receive treatments with peers during practical lab sessions to master practical technique and client comfort.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- TAB: DURATION & TIMETABLE ----------------- */}
        {activeTab === TAB_KEYS.DURATION && (
          <div className="space-y-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
              How long is the {course.title}?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Left Column: Duration overview */}
              <div className="md:col-span-5 space-y-4 text-sm text-gray-700 font-light leading-relaxed">
                <p>
                  The overall duration for {course.title} is <strong>{course.duration}</strong>.
                </p>
                <p>
                  Classes are scheduled to ensure maximum practical lab hours. Daily sessions combine demonstration and supervised practice.
                </p>
              </div>

              {/* Right Column: Start dates & timetable */}
              <div className="md:col-span-7 space-y-6 text-sm text-gray-700 font-light leading-relaxed">
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">When does the course start?</h3>
                  <p className="font-medium text-gray-900">New batches start on the 1st and 15th of every month.</p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">Available Batch Timetables</h3>
                  <div className="space-y-3 pt-1">
                    <div>
                      <p className="font-bold text-xs uppercase tracking-wider text-gray-900">Morning Batch</p>
                      <p className="text-xs text-gray-600">10:00 AM - 1:00 PM (Monday to Friday)</p>
                    </div>
                    <div>
                      <p className="font-bold text-xs uppercase tracking-wider text-gray-900">Afternoon Batch</p>
                      <p className="text-xs text-gray-600">2:00 PM - 5:00 PM (Monday to Friday)</p>
                    </div>
                    <div>
                      <p className="font-bold text-xs uppercase tracking-wider text-gray-900">Weekend Batch</p>
                      <p className="text-xs text-gray-600">11:00 AM - 4:00 PM (Saturday Special)</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">Training Locations</h3>
                  <p>{Array.isArray(course.locations) ? course.locations.join(", ") : course.location}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- TAB: COURSE FEES & COSTS ----------------- */}
        {activeTab === TAB_KEYS.FEES && (
          <div className="space-y-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
              What does it cost?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Left Column: Fees summary */}
              <div className="md:col-span-5 space-y-4 text-sm text-gray-700 font-light leading-relaxed">
                <p>
                  Course tuition includes full access to academy lab facilities, trainer guidance, live model practice, and final certification.
                </p>
                <p className="text-xs text-gray-500 italic">
                  *Please contact our academy team on WhatsApp for current promotional fee structures and seasonal enrollment discounts.
                </p>
              </div>

              {/* Right Column: Included Kit Items (Matching Inspiration Screenshot) */}
              <div className="md:col-span-7 space-y-4 text-sm text-gray-700 font-light leading-relaxed">
                <h3 className="text-base font-bold text-gray-900">Your kit includes:*</h3>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-800">
                  <li>Personal Beauty & Brush kit roll x 1</li>
                  <li>Skin Analysis & Consultation chart booklet x 1</li>
                  <li>Practice sponges, spatulas, and mixing bowls</li>
                  <li>Sanitation & disinfectant spray x 1</li>
                  <li>Student apron & towel set (Black) x 1</li>
                  <li>Eye lash / Brow tinting & shaping kit x 1</li>
                  <li>Course learning manual & handbook x 1</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- TAB: WHAT'S NEXT ----------------- */}
        {activeTab === TAB_KEYS.NEXT && (
          <div className="space-y-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
              What's next after graduating?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start text-sm text-gray-700 font-light leading-relaxed">
              <div className="md:col-span-6 space-y-4">
                <h3 className="text-base font-bold text-gray-900">Career Opportunities</h3>
                <p>
                  Upon completing {course.title}, you can pursue roles such as freelance makeup/hair artist, junior beauty therapist, salon assistant, or launch your independent client services.
                </p>
              </div>

              <div className="md:col-span-6 space-y-4">
                <h3 className="text-base font-bold text-gray-900">Further Qualifications</h3>
                <p>
                  Graduates can upgrade directly to our Professional Diploma or advanced masterclasses with special alumni course fee discounts.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- TAB: FAQS ----------------- */}
        {activeTab === TAB_KEYS.FAQS && (
          <div className="space-y-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4 max-w-4xl">
              {course.faqs && course.faqs.length > 0 ? (
                course.faqs.map((faq, idx) => (
                  <div key={idx} className="border border-gray-300 p-4 bg-white">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full text-left font-bold text-sm text-gray-900 flex justify-between items-center cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <span className="text-lg font-normal text-gray-500">{openFaqIndex === idx ? "-" : "+"}</span>
                    </button>
                    {openFaqIndex === idx && (
                      <p className="mt-3 text-xs text-gray-600 font-light leading-relaxed border-t border-gray-100 pt-3">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-600">Please contact our academy team on WhatsApp for any specific questions.</p>
              )}
            </div>
          </div>
        )}

        {/* Bottom Apply CTA */}
        <div className="pt-6 border-t border-gray-200 mt-8">
          <button
            onClick={openWhatsApp}
            className="px-8 py-3.5 bg-[#d6006e] hover:bg-[#b3005c] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            APPLY NOW
          </button>
        </div>
      </main>

      {/* ================= YOU MIGHT ALSO LIKE SECTION ================= */}
      <section className="w-full bg-gray-50 border-t border-gray-200 py-16">
        <div className="content-container">
          <div className="mb-8 border-b-2 border-black pb-2 flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-gray-900">
              You Might Also Like
            </h2>
            <Link
              to="/course"
              className="text-xs font-bold uppercase tracking-wider text-pink-600 hover:text-pink-800 transition-colors"
            >
              View All Courses &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherCourses.map((item) => (
              <div
                key={item.id || item.slug}
                className="relative group bg-black aspect-[3/4] overflow-hidden flex flex-col justify-end p-6 text-white border border-gray-800"
              >
                {/* Background Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20"></div>

                {/* Content Details Overlay */}
                <div className="relative z-10 space-y-2">
                  <div className="text-[12px] text-gray-200 leading-relaxed font-light">
                    <p><span className="font-normal text-gray-300">Topic:</span> {item.topic}</p>
                    <p className="line-clamp-2"><span className="font-normal text-gray-300">Location:</span> {Array.isArray(item.locations) ? item.locations.join(", ") : (item.location || "Academy")}</p>
                    <p><span className="font-normal text-gray-300">Duration:</span> {item.duration}</p>
                  </div>

                  <h3 className="text-lg font-bold font-serif text-white tracking-wide leading-tight pt-1">
                    {item.title}
                  </h3>

                  {/* CTA Button */}
                  <Link
                    to={`/courses/${item.slug}`}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="w-full mt-3 py-2.5 bg-[#2d2d2d] hover:bg-black text-white font-semibold text-xs uppercase tracking-widest transition-all border border-gray-700 hover:border-white flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Learn More</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}