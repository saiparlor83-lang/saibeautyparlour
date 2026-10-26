import { imageUrl } from '../assets';

export interface Course {
  id: string;
  slug: string;
  title: string;
  topic: string;
  category: string;
  courseType: string;
  programLevel: string;
  locations: string[];
  location?: string;
  duration: string;
  image: string;
  description: string;
  requirements: string[];
  focusPoints: string[];
  testimonials: {
    quote: string;
    author: string;
    role: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  whatsappMsg?: string;
}

export const courseData: Record<string, Course> = {
  // ==========================================
  // COMPREHENSIVE PROGRAMS (3)
  // ==========================================
  "makeup-basic": {
    id: "makeup-basic",
    slug: "makeup-basic",
    title: "BASIC BEAUTY & MAKEUP COURSE",
    topic: "Basic Beauty & Makeup",
    category: "Comprehensive Programs",
    courseType: "Comprehensive",
    programLevel: "Basic",
    locations: ["Sai Beauty Parlour, Simara"],
    duration: "1 Month",
    image: imageUrl('parlour_frontimg.jpeg'),
    description:
      "Build a solid foundation in essential salon beauty care and daily makeup techniques. Covers skin prep, facial basics, manicure, pedicure, waxing, threading, and color matching for aspiring artists and personal grooming.",
    requirements: [
      "No prior beauty or makeup experience required.",
      "Open to beginners looking to launch a salon career or master personal grooming.",
      "Basic brush and personal toolkit items recommended."
    ],
    focusPoints: [
      "Introduction to beauty and salon industry ethics",
      "Skin type analysis and prep techniques",
      "Basic facial basics and skin care routines",
      "Foundation matching, color correction & concealer",
      "Eyebrow shaping, threading basics & waxing basics",
      "Day, evening, and natural party makeup looks",
      "Basic hairstyling and hair care fundamentals",
      "Manicure and pedicure essentials",
      "Hygiene, brush care, and workplace sanitation",
      "Client consultation and communication"
    ],
    testimonials: [
      {
        quote: "This course gave me complete confidence in handling skin prep, threading, and natural day makeup from day one!",
        author: "Sujata Rai",
        role: "Basic Course Graduate"
      },
      {
        quote: "The hands-on practice in the real salon environment was invaluable.",
        author: "Bhawana Gurung",
        role: "Junior Beautician"
      }
    ],
    faqs: [
      {
        question: "Is this course suitable for complete beginners?",
        answer: "Yes! We start from fundamental skin prep, sanitation, and basic makeup tools."
      },
      {
        question: "Do I get a certificate upon completion?",
        answer: "Yes, all students who complete practical assessments receive a certified completion certificate."
      }
    ],
    whatsappMsg: "Hi, I'm interested in the Basic Beauty & Makeup Course. Please share details and schedules."
  },

  "makeup-advanced": {
    id: "makeup-advanced",
    slug: "makeup-advanced",
    title: "ADVANCED BEAUTY & MAKEUP COURSE",
    topic: "Advanced Beauty & Makeup",
    category: "Comprehensive Programs",
    courseType: "Comprehensive",
    programLevel: "Advanced",
    locations: ["Sai Beauty Parlour, Simara"],
    duration: "2 Months",
    image: imageUrl('sai3.jpg'),
    description:
      "Elevate your artistry to professional standards. Focus on high-definition bridal looks, advanced contouring, precision eye artistry, complex hairstyling, and specialized facial techniques for professional salon artists.",
    requirements: [
      "Completion of a Basic Makeup/Beauty Course or equivalent hands-on experience.",
      "Understanding of fundamental facial anatomy and brush control."
    ],
    focusPoints: [
      "Advanced skin prep and color theory",
      "Bridal, reception, and cultural glam makeup",
      "Cut crease, spotlight, and intense smokey eye techniques",
      "HD makeup and precision face sculpting",
      "Skin-tone matching and corrective makeup for lighting",
      "Advanced bridal hairstyling and intricate updos",
      "Specialized facial therapies and product knowledge",
      "Client consultations & bridal package pricing strategy",
      "Live model portfolio photography shoots"
    ],
    testimonials: [
      {
        quote: "The bridal masterclass completely transformed my salon's revenue. Working on live models gave me real confidence.",
        author: "Pooja Shrestha",
        role: "Freelance Makeup Artist"
      }
    ],
    faqs: [
      {
        question: "Are live models provided for practical sessions?",
        answer: "Yes, students practice on live models during advanced bridal training and portfolio shoots."
      },
      {
        question: "Does this cover both makeup and hair styling?",
        answer: "Yes, advanced makeup artistry is paired with professional bridal hairstyling techniques."
      }
    ],
    whatsappMsg: "Hi, I'm interested in the Advanced Beauty & Makeup Course. Please share curriculum and fee structure."
  },

  "makeup-diploma": {
    id: "makeup-diploma",
    slug: "makeup-diploma",
    title: "PROFESSIONAL DIPLOMA IN BEAUTY & MAKEUP",
    topic: "Professional Beauty & Makeup",
    category: "Comprehensive Programs",
    courseType: "Comprehensive",
    programLevel: "Diploma",
    locations: ["Sai Beauty Parlour, Simara"],
    duration: "3 Months",
    image: imageUrl('sai1.jpg'),
    description:
      "Our flagship, all-inclusive diploma program designed to transform you into a fully certified beauty therapist and salon entrepreneur. Covers skin care, advanced makeup, hairstyling, hair color basics, nail art, and salon management.",
    requirements: [
      "No prior experience required; covers basic fundamentals through high-level professional skills.",
      "Commitment to practical training, client practice, and portfolio building."
    ],
    focusPoints: [
      "Full beauty spectrum: Grooming, skincare, threading, waxing, manicures & pedicures",
      "Complete makeup mastery: Basic, HD, airbrush, fashion, and editorial bridal looks",
      "Professional hair techniques: Cutting basics, coloring, styling, and treatments",
      "Nail care, gel polish, and creative nail art",
      "Photoshoot lighting, camera-ready makeup, and social media branding",
      "Salon management, inventory control, and customer service excellence",
      "Final practical assessment and guaranteed internship guidance"
    ],
    testimonials: [
      {
        quote: "Taking the Diploma program was the best decision for my career. I now run my own salon with full confidence!",
        author: "Anjali Thapa",
        role: "Salon Owner & Master Artist"
      }
    ],
    faqs: [
      {
        question: "What is the difference between Advanced and Diploma?",
        answer: "The Diploma covers the full suite: skincare, hair cutting/coloring, nail art, and business setup strategies."
      },
      {
        question: "Do you offer job placement or internship support?",
        answer: "Yes, diploma graduates receive placement guidance and salon internship opportunities."
      }
    ],
    whatsappMsg: "Hi, I'm interested in the Professional Diploma in Beauty & Makeup. Please share course details."
  },

  // ==========================================
  // MAKEUP COURSES (6)
  // ==========================================
  "professional-makeup-artistry": {
    id: "professional-makeup-artistry",
    slug: "professional-makeup-artistry",
    title: "PROFESSIONAL MAKEUP ARTISTRY",
    topic: "Makeup",
    category: "Makeup",
    courseType: "Individual",
    programLevel: "Specialized",
    locations: ["Sai Beauty Parlour, Simara"],
    duration: "3 Weeks",
    image: imageUrl('course1.jpg'),
    description:
      "Master commercial, event, and glam makeup techniques. Learn color correction, face shaping, baking, and longevity secrets for commercial client makeup.",
    requirements: ["Basic understanding of makeup tools is helpful but not mandatory."],
    focusPoints: [
      "Complexion perfection & undertone matching",
      "Contouring and highlighting for various face shapes",
      "Glam & evening event makeup",
      "Long-lasting setting techniques for events"
    ],
    testimonials: [
      { quote: "Super focused training with lots of practical time!", author: "Kritika Aryal", role: "Graduate" }
    ],
    faqs: [
      { question: "Is product kit included during class?", answer: "Yes, practice products are provided in studio sessions." }
    ],
    whatsappMsg: "Hi, I'm interested in the Professional Makeup Artistry course."
  },

  "bridal-makeup": {
    id: "bridal-makeup",
    slug: "bridal-makeup",
    title: "BRIDAL MAKEUP MASTERCLASS",
    topic: "Bridal Specialist",
    category: "Makeup",
    courseType: "Individual",
    programLevel: "Specialized",
    locations: ["Sai Beauty Parlour, Simara"],
    duration: "2 Weeks",
    image: imageUrl('course2.jpg'),
    description:
      "Specialized masterclass focusing on traditional, cultural, and modern bridal glam. Master waterproof base techniques, dupatta setting, and jewelry pairing.",
    requirements: ["Prior basic makeup knowledge required."],
    focusPoints: [
      "Traditional & modern bridal looks",
      "Waterproof & sweat-resistant base application",
      "Lash application & glitter placement",
      "Client bridal package creation & consultation"
    ],
    testimonials: [
      { quote: "Helped me secure 10+ bridal bookings this season!", author: "Sangeeta Karki", role: "Bridal Artist" }
    ],
    faqs: [
      { question: "Do we practice dupatta setting?", answer: "Yes, drape and jewelry coordination are included." }
    ],
    whatsappMsg: "Hi, I'm interested in the Bridal Makeup Masterclass."
  },

  "party-event-makeup": {
    id: "party-event-makeup",
    slug: "party-event-makeup",
    title: "PARTY & EVENT MAKEUP",
    topic: "Event Glam",
    category: "Makeup",
    courseType: "Individual",
    programLevel: "Specialized",
    locations: ["Sai Beauty Parlour, Simara"],
    duration: "1 Week",
    image: imageUrl('party.jpg'),
    description:
      "Learn quick, stunning party glam looks for receptions, festivals, and evening events. Perfect for salon assistants and freelance artists.",
    requirements: ["Open to all skill levels."],
    focusPoints: [
      "Soft glam & Smokey eye variations",
      "Dewy finish vs Matte finish base",
      "Lip shaping & quick touch-up secrets"
    ],
    testimonials: [
      { quote: "Great short course for fast learning!", author: "Rashmi Maharjan", role: "Freelance Artist" }
    ],
    faqs: [
      { question: "How long is each daily session?", answer: "Daily 2.5-hour hands-on practical sessions." }
    ],
    whatsappMsg: "Hi, I'm interested in Party & Event Makeup course."
  },

  "advanced-eye-makeup": {
    id: "advanced-eye-makeup",
    slug: "advanced-eye-makeup",
    title: "ADVANCED EYE MAKEUP ARTISTRY",
    topic: "Eye Artistry",
    category: "Makeup",
    courseType: "Individual",
    programLevel: "Specialized",
    locations: ["Sai Beauty Parlour, Simara"],
    duration: "1 Week",
    image: imageUrl('latest1.jpg'),
    description:
      "Specialized module focused exclusively on intricate eye techniques: cut crease, halo eyes, glitter placement, graphic liner, and winged precision.",
    requirements: ["Basic brush handling skills."],
    focusPoints: [
      "Cut crease & double cut crease",
      "Smokey eye variations & color blending",
      "False lash customization & glitter application"
    ],
    testimonials: [
      { quote: "My eye blending skills improved dramatically!", author: "Nisha Tamang", role: "Artist" }
    ],
    faqs: [
      { question: "Do we work on live models?", answer: "Yes, practice is conducted on peer models." }
    ],
    whatsappMsg: "Hi, I'm interested in Advanced Eye Makeup Artistry."
  },

  "hd-makeup": {
    id: "hd-makeup",
    slug: "hd-makeup",
    title: "HD & AIRBRUSH MAKEUP",
    topic: "HD Tech",
    category: "Makeup",
    courseType: "Individual",
    programLevel: "Specialized",
    locations: ["Sai Beauty Parlour, Simara"],
    duration: "10 Days",
    image: imageUrl('latest2.jpg'),
    description:
      "Learn camera-ready High Definition makeup techniques and airbrush gun handling for flawless photo shoots and high-profile events.",
    requirements: ["Advanced makeup experience recommended."],
    focusPoints: [
      "Airbrush equipment assembly and maintenance",
      "Flawless silicone & water-based airbrush foundation",
      "Camera-ready HD lighting adjustment"
    ],
    testimonials: [
      { quote: "Essential training for modern high-end clients.", author: "Kabita Shrestha", role: "Pro Artist" }
    ],
    faqs: [
      { question: "Is airbrush machine provided?", answer: "Machines are available in academy labs for practice." }
    ],
    whatsappMsg: "Hi, I'm interested in HD & Airbrush Makeup course."
  },

  "self-makeup": {
    id: "self-makeup",
    slug: "self-makeup",
    title: "PERSONAL SELF MAKEUP WORKSHOP",
    topic: "Self Grooming",
    category: "Makeup",
    courseType: "Individual",
    programLevel: "Specialized",
    locations: ["Sai Beauty Parlour, Simara"],
    duration: "3 Days",
    image: imageUrl('latest3.jpg'),
    description:
      "Discover your skin tone, perfect your daily corporate look, and master an effortless 15-minute evening makeup routine using your own vanity pouch.",
    requirements: ["No experience needed; bring your personal makeup bag."],
    focusPoints: [
      "Personal vanity evaluation",
      "Daily 15-minute office makeup routine",
      "Day-to-night quick transition hacks"
    ],
    testimonials: [
      { quote: "I finally know what products actually suit my face!", author: "Smriti Bhatta", role: "Participant" }
    ],
    faqs: [
      { question: "Can I bring my own makeup?", answer: "Yes! We teach you how to use your existing products." }
    ],
    whatsappMsg: "Hi, I'm interested in the Personal Self Makeup Workshop."
  },

  // ==========================================
  // HAIR COURSES (6)
  // ==========================================
  "professional-hair-styling": {
    id: "professional-hair-styling",
    slug: "professional-hair-styling",
    title: "PROFESSIONAL HAIR STYLING",
    topic: "Hair Styling",
    category: "Hair",
    courseType: "Individual",
    programLevel: "Specialized",
    locations: ["Sai Beauty Parlour, Simara"],
    duration: "1 Month",
    image: imageUrl('hair.jpg'),
    description:
      "Master thermal styling, iron curling, blow-drying techniques, volume boosting, and modern messy buns for client styling.",
    requirements: ["Beginner friendly."],
    focusPoints: [
      "Blow dry techniques (in-curl, out-curl, straight)",
      "Tong curling & crimping methods",
      "Backcombing & volume creation",
      "Classic & modern hair bun techniques"
    ],
    testimonials: [
      { quote: "Taught me proper pin placement and hold techniques!", author: "Deepa Subedi", role: "Stylist" }
    ],
    faqs: [
      { question: "Are styling tools provided?", answer: "Dummy heads and styling heat tools are provided." }
    ],
    whatsappMsg: "Hi, I'm interested in Professional Hair Styling course."
  },

  "bridal-hair-styling": {
    id: "bridal-hair-styling",
    slug: "bridal-hair-styling",
    title: "BRIDAL & EVENT HAIR STYLING",
    topic: "Bridal Hair",
    category: "Hair",
    courseType: "Individual",
    programLevel: "Specialized",
    locations: ["Sai Beauty Parlour, Simara"],
    duration: "2 Weeks",
    image: imageUrl('latest4.jpg'),
    description:
      "Specialized training in intricate bridal hairstyles, hair stuffing, extensions attachment, floral padding, and traditional bridal buns.",
    requirements: ["Basic styling knowledge."],
    focusPoints: [
      "Hair extension integration & padding",
      "Traditional bridal buns & floral arrangement",
      "Hollywood waves and textured boho braids"
    ],
    testimonials: [
      { quote: "Essential skills for bridal season work!", author: "Aasha Magar", role: "Bridal Stylist" }
    ],
    faqs: [
      { question: "Do we work with hair accessories?", answer: "Yes, accessory placement is covered." }
    ],
    whatsappMsg: "Hi, I'm interested in Bridal & Event Hair Styling course."
  },

  "hair-cutting": {
    id: "hair-cutting",
    slug: "hair-cutting",
    title: "HAIR CUTTING & STYLING TECHNIQUES",
    topic: "Hair Cut",
    category: "Hair",
    courseType: "Individual",
    programLevel: "Specialized",
    locations: ["Sai Beauty Parlour, Simara"],
    duration: "1 Month",
    image: imageUrl('latest5.jpg'),
    description:
      "Learn fundamental to popular salon haircuts: straight cut, U-cut, V-cut, layers, feathering, bob cuts, and bangs.",
    requirements: ["Open to beginners."],
    focusPoints: [
      "Scissor control and sectioning angles",
      "Layering, graduation, and texturizing",
      "Popular trend cuts (Bob, Layer, Feather)"
    ],
    testimonials: [
      { quote: "Sectioning logic was taught so clearly!", author: "Suman Joshi", role: "Junior Stylist" }
    ],
    faqs: [
      { question: "Do we cut live hair?", answer: "Training starts on dummy heads and transitions to live models." }
    ],
    whatsappMsg: "Hi, I'm interested in Hair Cutting & Styling course."
  },

  "hair-coloring": {
    id: "hair-coloring",
    slug: "hair-coloring",
    title: "HAIR COLORING & HIGHLIGHTS MASTERCLASS",
    topic: "Hair Color",
    category: "Hair",
    courseType: "Individual",
    programLevel: "Specialized",
    locations: ["Sai Beauty Parlour, Simara"],
    duration: "3 Weeks",
    image: imageUrl('latest6.jpg'),
    description:
      "Master color theory, developer ratios, global coloring, balayage, ombre, foil highlights, and root touch-up applications.",
    requirements: ["Basic salon knowledge."],
    focusPoints: [
      "Color wheel & underlying pigment neutralization",
      "Foil weaving techniques for highlights",
      "Balayage freehand blending & toner application"
    ],
    testimonials: [
      { quote: "Balayage blending secrets made simple!", author: "Manju Dahal", role: "Colorist" }
    ],
    faqs: [
      { question: "Are professional hair color products used?", answer: "Yes, salon-grade brands are provided." }
    ],
    whatsappMsg: "Hi, I'm interested in Hair Coloring & Highlights Masterclass."
  },

  "hair-treatment": {
    id: "hair-treatment",
    slug: "hair-treatment",
    title: "HAIR CARE & SCALP TREATMENTS",
    topic: "Hair Spa",
    category: "Hair",
    courseType: "Individual",
    programLevel: "Specialized",
    locations: ["Sai Beauty Parlour, Simara"],
    duration: "1 Week",
    image: imageUrl('latest7.jpg'),
    description:
      "Comprehensive training in hair spa rituals, deep conditioning, scalp analysis, anti-dandruff care, and head massage relaxation.",
    requirements: ["No experience needed."],
    focusPoints: [
      "Scalp condition diagnostics",
      "Hair spa cream application & ozone steam",
      "Aromatherapy head massage techniques"
    ],
    testimonials: [
      { quote: "Clients love the scalp massage routine I learned here!", author: "Sabina Khadka", role: "Therapist" }
    ],
    faqs: [
      { question: "Is hair steam machine operation included?", answer: "Yes, lab equipment operation is part of training." }
    ],
    whatsappMsg: "Hi, I'm interested in Hair Care & Scalp Treatments course."
  },

  "hair-straightening-smoothening": {
    id: "hair-straightening-smoothening",
    slug: "hair-straightening-smoothening",
    title: "HAIR STRAIGHTENING & SMOOTHENING",
    topic: "Chemical Treatment",
    category: "Hair",
    courseType: "Individual",
    programLevel: "Specialized",
    locations: ["Sai Beauty Parlour, Simara"],
    duration: "2 Weeks",
    image: imageUrl('latest8.jpg'),
    description:
      "Master chemical straightening, rebonding, keratin smoothing, and post-treatment maintenance for silky client hair.",
    requirements: ["Basic salon experience."],
    focusPoints: [
      "Bond breaking & neutralizer application",
      "Ironing temperature control for damage prevention",
      "Keratin & smoothening protocol"
    ],
    testimonials: [
      { quote: "Step-by-step chemical safety was emphasized.", author: "Pema Sherpa", role: "Stylist" }
    ],
    faqs: [
      { question: "Do we work on live chemical models?", answer: "Yes, under instructor supervision." }
    ],
    whatsappMsg: "Hi, I'm interested in Hair Straightening & Smoothening course."
  },

  // ==========================================
  // SKIN CARE COURSES (4)
  // ==========================================
  "professional-facial-skin-care": {
    id: "professional-facial-skin-care",
    slug: "professional-facial-skin-care",
    title: "PROFESSIONAL FACIAL & SKIN CARE",
    topic: "Skin Care",
    category: "Skin Care",
    courseType: "Individual",
    programLevel: "Specialized",
    locations: ["Sai Beauty Parlour, Simara"],
    duration: "3 Weeks",
    image: imageUrl('skincare.png'),
    description:
      "Learn skin analysis, facial massage steps, blackhead extraction, mask application, and customized facial treatments for dry, oily, and sensitive skin.",
    requirements: ["Open to all."],
    focusPoints: [
      "Skin type classification & consultation",
      "Classic facial massage stroke techniques",
      "Steam, extraction, and mask protocols"
    ],
    testimonials: [
      { quote: "The facial massage flow is incredible!", author: "Srijana Shrestha", role: "Esthetician" }
    ],
    faqs: [
      { question: "Do we learn machine facials?", answer: "Basic high-frequency and steamer usage are included." }
    ],
    whatsappMsg: "Hi, I'm interested in Professional Facial & Skin Care course."
  },

  "advanced-skin-care": {
    id: "advanced-skin-care",
    slug: "advanced-skin-care",
    title: "ADVANCED AESTHETIC SKIN CARE",
    topic: "Aesthetics",
    category: "Skin Care",
    courseType: "Individual",
    programLevel: "Specialized",
    locations: ["Sai Beauty Parlour, Simara"],
    duration: "2 Weeks",
    image: imageUrl('latest9.jpg'),
    description:
      "Explore specialized skin care: anti-aging facials, gold facials, fruit peels, tan removal therapy, and skin tightening protocols.",
    requirements: ["Basic skincare knowledge."],
    focusPoints: [
      "Anti-aging & collagen boosting facials",
      "Pigmentation & hyperpigmentation care",
      "Hydra-facial apparatus overview"
    ],
    testimonials: [
      { quote: "Elevated my facial services to luxury level.", author: "Monika Rai", role: "Beauty Therapist" }
    ],
    faqs: [
      { question: "Is anti-pigmentation covered?", answer: "Yes, specific brighten & glow therapies are included." }
    ],
    whatsappMsg: "Hi, I'm interested in Advanced Aesthetic Skin Care course."
  },

  "facial-techniques": {
    id: "facial-techniques",
    slug: "facial-techniques",
    title: "SPA & ANTI-AGING FACIAL TECHNIQUES",
    topic: "Spa Facial",
    category: "Skin Care",
    courseType: "Individual",
    programLevel: "Specialized",
    locations: ["Sai Beauty Parlour, Simara"],
    duration: "1 Week",
    image: imageUrl('latest10.jpg'),
    description:
      "Master pressure point head/neck massage, lymph drainage facial techniques, and relaxing spa facial procedures.",
    requirements: ["Basic facial knowledge."],
    focusPoints: [
      "Lymphatic drainage massage strokes",
      "Acupressure points for skin glow",
      "Relaxing neck & shoulder relaxation"
    ],
    testimonials: [
      { quote: "Very relaxing and highly effective technique!", author: "Gita Giri", role: "Therapist" }
    ],
    faqs: [
      { question: "How long is training?", answer: "1 week intensive hands-on lab." }
    ],
    whatsappMsg: "Hi, I'm interested in Spa & Anti-Aging Facial Techniques."
  },

  "cleanup-basic-skin-treatment": {
    id: "cleanup-basic-skin-treatment",
    slug: "cleanup-basic-skin-treatment",
    title: "SKIN CLEANUP & BASIC THERAPY",
    topic: "Skin Cleanup",
    category: "Skin Care",
    courseType: "Individual",
    programLevel: "Specialized",
    locations: ["Sai Beauty Parlour, Simara"],
    duration: "3 Days",
    image: imageUrl('latest11.jpg'),
    description:
      "Quick intensive course on quick facial cleanups, scrub exfoliation, pack application, and daily skin health maintenance.",
    requirements: ["No experience needed."],
    focusPoints: [
      "Express facial cleanup routine",
      "Dead skin scrub exfoliation",
      "Moisturizing & SPF protection"
    ],
    testimonials: [
      { quote: "Great quick skill add-on for beginners!", author: "Binita Basnet", role: "Graduate" }
    ],
    faqs: [
      { question: "Can salon helpers join?", answer: "Yes, perfect for salon entry-level staff." }
    ],
    whatsappMsg: "Hi, I'm interested in Skin Cleanup & Basic Therapy."
  },

  // ==========================================
  // NAILS COURSES (3)
  // ==========================================
  "manicure-pedicure": {
    id: "manicure-pedicure",
    slug: "manicure-pedicure",
    title: "PROFESSIONAL MANICURE & PEDICURE",
    topic: "Nail Care",
    category: "Nails",
    courseType: "Individual",
    programLevel: "Specialized",
    locations: ["Sai Beauty Parlour, Simara"],
    duration: "1 Week",
    image: imageUrl('nails.jpg'),
    description:
      "Master hygienic nail shaping, cuticle care, scrub exfoliation, foot massage, callus smoothing, and polish application.",
    requirements: ["No experience needed."],
    focusPoints: [
      "Nail filing, shaping & cuticle care",
      "Hand & foot spa massage routines",
      "Callus removal & nail hygiene"
    ],
    testimonials: [
      { quote: "Clients love the neat cuticle care technique!", author: "Sharmila Thapa", role: "Nail Tech" }
    ],
    faqs: [
      { question: "Are spa bath bowls provided?", answer: "Yes, full station setups are used in lab." }
    ],
    whatsappMsg: "Hi, I'm interested in Professional Manicure & Pedicure course."
  },

  "nail-art": {
    id: "nail-art",
    slug: "nail-art",
    title: "CREATIVE NAIL ART & EXTENSIONS",
    topic: "Nail Art",
    category: "Nails",
    courseType: "Individual",
    programLevel: "Specialized",
    locations: ["Sai Beauty Parlour, Simara"],
    duration: "2 Weeks",
    image: imageUrl('latest12.jpg'),
    description:
      "Learn gel polish application, acrylic nail extension tips, glitter placement, French tips, marble designs, and rhinestones.",
    requirements: ["Basic nail care interest."],
    focusPoints: [
      "Tip extension fitting & blending",
      "UV/LED gel polish application",
      "Brush nail art, glitter & foil art"
    ],
    testimonials: [
      { quote: "Made nail extension art so easy to understand!", author: "Saraswati Lama", role: "Artist" }
    ],
    faqs: [
      { question: "Is UV lamp provided in class?", answer: "Yes, studio equipment is available." }
    ],
    whatsappMsg: "Hi, I'm interested in Creative Nail Art & Extensions course."
  },

  "gel-nail-art": {
    id: "gel-nail-art",
    slug: "gel-nail-art",
    title: "GEL NAIL ART & SCULPTING",
    topic: "Gel Nails",
    category: "Nails",
    courseType: "Individual",
    programLevel: "Specialized",
    locations: ["Sai Beauty Parlour, Simara"],
    duration: "10 Days",
    image: imageUrl('latest13.jpg'),
    description:
      "Advanced builder gel nail sculpting, 3D nail art designs, chrome finish, cat-eye effects, and nail extension refills.",
    requirements: ["Basic nail art experience."],
    focusPoints: [
      "Builder gel sculpting on forms",
      "Chrome, ombre & cat-eye magnet techniques",
      "Extension removal and nail health restoration"
    ],
    testimonials: [
      { quote: "Boosted my salon's nail revenue immediately!", author: "Reema Gurung", role: "Nail Studio Owner" }
    ],
    faqs: [
      { question: "Do we learn extension removal?", answer: "Yes, safe drill and soak-off removal techniques are covered." }
    ],
    whatsappMsg: "Hi, I'm interested in Gel Nail Art & Sculpting course."
  },

  // ==========================================
  // SALON SKILLS COURSES (3)
  // ==========================================
  "threading-waxing": {
    id: "threading-waxing",
    slug: "threading-waxing",
    title: "PROFESSIONAL THREADING & WAXING",
    topic: "Hair Removal",
    category: "Salon Skills",
    courseType: "Individual",
    programLevel: "Specialized",
    locations: ["Sai Beauty Parlour, Simara"],
    duration: "1 Week",
    image: imageUrl('latest14.jpg'),
    description:
      "Master eyebrow threading geometry, upper lip threading, full body strip waxing, and sensitive skin cartridge waxing.",
    requirements: ["No experience required."],
    focusPoints: [
      "Thread holding & movement control",
      "Eyebrow arch shaping to match face shapes",
      "Warm wax, Rica wax & strip application safety"
    ],
    testimonials: [
      { quote: "Threading speed and eyebrow shaping improved in 3 days!", author: "Prativa Ale", role: "Beautician" }
    ],
    faqs: [
      { question: "Is sensitive skin waxing covered?", answer: "Yes, post-wax soothing treatments are included." }
    ],
    whatsappMsg: "Hi, I'm interested in Professional Threading & Waxing course."
  },

  "complete-beauty-salon-skills": {
    id: "complete-beauty-salon-skills",
    slug: "complete-beauty-salon-skills",
    title: "COMPLETE SALON BEAUTY THERAPY",
    topic: "Salon Therapy",
    category: "Salon Skills",
    courseType: "Individual",
    programLevel: "Specialized",
    locations: ["Sai Beauty Parlour, Simara"],
    duration: "1 Month",
    image: imageUrl('latest15.jpg'),
    description:
      "A complete package of daily salon services: threading, body waxing, cleanup, manicures, basic hair styling, and client care.",
    requirements: ["Beginner friendly."],
    focusPoints: [
      "Daily salon routine workflow",
      "Threading, waxing, and cleanup bundling",
      "Sanitation and client hygiene standards"
    ],
    testimonials: [
      { quote: "Perfect starter course for working in any salon!", author: "Komal Pun", role: "Salon Assistant" }
    ],
    faqs: [
      { question: "Can I start working after 1 month?", answer: "Yes, this course equips you for entry salon roles." }
    ],
    whatsappMsg: "Hi, I'm interested in Complete Salon Beauty Therapy course."
  },

  "salon-management-customer-service": {
    id: "salon-management-customer-service",
    slug: "salon-management-customer-service",
    title: "SALON MANAGEMENT & CLIENT RELATIONS",
    topic: "Salon Business",
    category: "Salon Skills",
    courseType: "Individual",
    programLevel: "Specialized",
    locations: ["Sai Beauty Parlour, Simara"],
    duration: "1 Week",
    image: imageUrl('sai_interior.jpeg'),
    description:
      "Learn salon setup basics, appointment scheduling, inventory management, staff ethics, client retention, and salon marketing.",
    requirements: ["Suitable for salon owners, managers, and senior beauticians."],
    focusPoints: [
      "Salon workflow setup and hygiene protocols",
      "Client relationship management & booking software",
      "Package pricing, promotion, and staff coordination"
    ],
    testimonials: [
      { quote: "Gave me clarity on pricing my salon services!", author: "Sanu Lama", role: "Academy Founder" }
    ],
    faqs: [
      { question: "Is this suitable for future salon owners?", answer: "Yes, designed specifically for salon business setup." }
    ],
    whatsappMsg: "Hi, I'm interested in Salon Management & Client Relations course."
  }
};