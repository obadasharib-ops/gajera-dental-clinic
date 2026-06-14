import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Phone,
  MapPin,
  Clock,
  Menu,
  X,
  Stethoscope,
  Award,
  ChevronDown,
  ShieldCheck,
  Star,
  Plus,
  Compass,
  MessageSquare,
  HelpCircle,
  ThumbsUp,
  ExternalLink,
  Info,
  MessageCircle
} from "lucide-react";
import { CLINIC_NAME, CONTACT_NUMBERS, ADDRESS, PATIENT_TESTIMONIALS, FREQUENT_FAQS } from "./data";
import { Testimonial } from "./types";
import ServicesSection from "./components/ServicesSection";
import DoctorsSection from "./components/DoctorsSection";
import BookingModule from "./components/BookingModule";
import LocalSeoModule from "./components/LocalSeoModule";
import WhyChooseUsSection from "./components/WhyChooseUsSection";
import AboutClinicSection from "./components/AboutClinicSection";
import SmileTransformationSection from "./components/SmileTransformationSection";
import DiagnosticCalculatorSection from "./components/DiagnosticCalculatorSection";
import WhatsAppButton from "./components/WhatsAppButton";
import heroClinicImg from "./assets/images/doctor_with_patient.webp";
import {
  initGA,
  trackPageView,
  trackClickToCall,
  trackWhatsAppClick,
  trackContactFormSubmit,
  trackAppointmentBooking,
  trackNavigationClick,
  trackEvent
} from "./analytics";

export default function App() {
  // Mobile navigation drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Initialize Google Analytics on initial component mount
  React.useEffect(() => {
    initGA();
  }, []);

  // States to pass down into the interactive Booking Form
  const [selectedServiceToBook, setSelectedServiceToBook] = useState("");
  const [selectedDoctorToBook, setSelectedDoctorToBook] = useState("");

  // Patient reviews local state (allows interactive test submissions)
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>(PATIENT_TESTIMONIALS);
  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewTreatment, setNewReviewTreatment] = useState("");
  const [newReviewComment, setNewReviewComment] = useState("");
  const [newReviewLocation, setNewReviewLocation] = useState("Varachha, Surat");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState(false);

  // FAQ Expanded active index state
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<string | null>(null);

  // Dynamic Local SEO Section Title & Meta Description Updates
  React.useEffect(() => {
    const sectionTitles: Record<string, string> = {
      home: "Best Dental Clinic in Nana Varachha, Surat | Gajera Dental",
      about: "Experienced Dentists in Varachha, Surat | Gajera Dental",
      "smile-transformation": "Smile Makeover Before & After Surat | Gajera Dental",
      surgeons: "Top Dental Surgeons in Surat | Gajera Dental Clinic",
      services: "Specialized Dental Services in Surat | Gajera Dental Clinic",
      testimonials: "Patient Reviews Nana Varachha Surat | Gajera Dental",
      faqs: "Surat Dental Treatment FAQs | Gajera Dental Clinic",
      contact: "Book Dentist Appointment Surat | Gajera Dental Clinic"
    };

    const sectionDescriptions: Record<string, string> = {
      home: "Gajera Dental is the best dental clinic in Nana Varachha, Surat. We offer expert dental treatment, modern technology, and gentle patient care. Book now!",
      about: "Get expert dental treatment at Gajera Clinic in Nana Varachha, Surat. Our experienced doctors provide premium patient care using modern technology. visit us.",
      "smile-transformation": "See real smile transformations in Nana Varachha, Surat. Gajera Dental Clinic uses modern technology and expert dental treatment for safe patient care.",
      surgeons: "Meet Surat's top dental surgeons at Gajera Clinic in Nana Varachha. Experience modern technology, expert dental treatment, and dedicated patient care.",
      services: "Explore advanced dental services at Gajera Clinic in Nana Varachha, Surat. We offer expert dental treatment, modern technology, and gentle patient care.",
      testimonials: "Read trusted reviews of Gajera Dental Clinic in Nana Varachha, Surat. Learn about our expert dental treatment, modern technology, and warm patient care.",
      faqs: "Answering dental treatment queries in Nana Varachha, Surat. Gajera Dental Clinic provides expert patient care and modern technology for painless options.",
      contact: "Book an appointment at Gajera Clinic in Nana Varachha, Surat. We combine expert dental treatment with modern technology for exceptional patient care. Call."
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      let bestEntry: IntersectionObserverEntry | null = null;
      for (const entry of entries) {
        if (entry.isIntersecting) {
          if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
            bestEntry = entry;
          }
        }
      }
      if (bestEntry) {
        const id = bestEntry.target.id;
        if (sectionTitles[id]) {
          document.title = sectionTitles[id];
          // Trigger virtual pageview tracking in GA4
          trackPageView(sectionTitles[id], `#${id}`);
        }
        if (sectionDescriptions[id]) {
          const metaDescription = document.querySelector('meta[name="description"]');
          if (metaDescription) {
            metaDescription.setAttribute('content', sectionDescriptions[id]);
          }
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "-20% 0px -40% 0px",
      threshold: [0, 0.1, 0.2, 0.5]
    });

    const targets = ["home", "about", "smile-transformation", "surgeons", "services", "testimonials", "faqs", "contact"];
    targets.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Smooth scroll handler helper
  const scrollToSection = (id: string, label?: string) => {
    setMobileMenuOpen(false);
    
    // Log user navigation menu or button interaction in GA4
    if (label) {
      trackNavigationClick(label, id);
    }

    // Resilient dual-mapping of clinical section identifiers
    const mappedId = id === "hero-top" ? "home" :
                     id === "about-clinic" ? "about" :
                     id === "doctors-section" ? "surgeons" :
                     id === "services-section" ? "services" :
                     id === "testimonials-section" ? "testimonials" :
                     id === "faq-section" ? "faqs" :
                     id === "appointment-module" ? "contact" : id;
                     
    const element = document.getElementById(mappedId);
    if (element) {
      // Offset scroll to account for sticky header height beautifully
      const headerOffset = 88;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Callback when patient clicks "Quick Book" from list of services
  const handleSelectServiceForBooking = (serviceTitle: string) => {
    setSelectedServiceToBook(serviceTitle);
    const element = document.getElementById("appointment-module");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Callback when patient clicks "Book with Doctor"
  const handleSelectDoctorForBooking = (doctorName: string) => {
    setSelectedDoctorToBook(doctorName);
    const element = document.getElementById("appointment-module");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Callback when patient applies live diagnostics
  const handleSelectServiceAndDoctorForBooking = (serviceTitle: string, doctorName: string) => {
    setSelectedServiceToBook(serviceTitle);
    setSelectedDoctorToBook(doctorName);
    const element = document.getElementById("appointment-module");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Add custom patient review
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim() || !newReviewTreatment.trim()) {
      return;
    }

    const brandNew: Testimonial = {
      id: "review-" + Math.random().toString(36).substr(2, 9),
      patientName: newReviewName.trim(),
      rating: newReviewRating,
      treatment: newReviewTreatment.trim(),
      location: newReviewLocation.trim(),
      comment: newReviewComment.trim(),
      date: new Date().toISOString().split("T")[0]
    };

    setTestimonialsList([brandNew, ...testimonialsList]);
    
    // Track local review submit to GA
    trackEvent("patient_review_submit", {
      treatment_received: brandNew.treatment,
      rating_given: brandNew.rating,
      location_area: brandNew.location
    });

    setNewReviewName("");
    setNewReviewTreatment("");
    setNewReviewComment("");
    setNewReviewLocation("Varachha, Surat");
    setNewReviewRating(5);
    setReviewSuccessMsg(true);
    setTimeout(() => setReviewSuccessMsg(false), 5000);
  };

  return (
    <div className="min-h-screen font-sans antialiased bg-slate-50 text-slate-850">
      
      {/* 1. TOP HEALTHCARE BAR (Responsive details, phone trigger) */}
      <div className="bg-slate-950 border-b border-slate-850 text-slate-300 py-2.5 px-4 sm:px-6 lg:px-8 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap items-center gap-4 justify-center sm:justify-start">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-semibold tracking-wide text-[11px] uppercase">
                MONDAY TO SATURDAY: 9:30 A.M. – 1:00 P.M., 5:00 P.M. – 8:30 P.M. | SUNDAY: CLOSED
              </span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-400 border-l border-slate-800/60 pl-4">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Gokulam Arkade, Nana Varachha, Surat</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[10px] sm:text-xs text-slate-400 font-semibold bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
              Surat Helpline Dial:
            </span>
            {CONTACT_NUMBERS.map((num) => (
              <a
                key={num.value}
                id={`top-bar-phone-${num.value}`}
                href={`tel:${num.value}`}
                onClick={() => trackClickToCall(num.value, "Top Bar Phone Header")}
                className="font-mono text-cyan-400 hover:text-cyan-300 transition-colors font-bold tracking-wider hover:underline flex items-center gap-1"
              >
                <span>📞 {num.display}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 2. STICKY MAIN HEADER & LOGO */}
      <header className={`sticky top-0 backdrop-blur-md border-b transition-all duration-500 ${
        mobileMenuOpen ? "z-[1005]" : "z-40"
      } bg-white/95 border-slate-100 text-slate-800 shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Group */}
            <div
              id="header-logo-brand"
              onClick={() => scrollToSection("home", "Header Brand Logo")}
              className="flex items-center gap-2 sm:gap-3 cursor-pointer group max-w-[70%] sm:max-w-none select-none relative z-10"
            >
              <div className="p-2 sm:p-2.5 bg-gradient-to-tr from-cyan-500 to-cyan-600 text-white rounded-2xl group-hover:rotate-6 transition-transform flex-shrink-0">
                <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="truncate">
                <span className="text-base sm:text-xl font-black font-display tracking-tight leading-none block transition-colors duration-500 text-slate-950 truncate">
                  GAJERA <span className="text-cyan-600">DENTAL</span>
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-widest text-slate-400 uppercase font-mono mt-0.5 block leading-none truncate">
                  CLINIC & IMPLANT CENTER
                </span>
              </div>
            </div>

            {/* Desktop Navigation Link Toggles */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold transition-colors duration-500 text-slate-600">
              <button
                id="nav-link-home"
                onClick={() => scrollToSection("home", "Desktop Menu - Home")}
                className="hover:text-cyan-500 cursor-pointer transition-colors"
              >
                Home
              </button>
              <button
                id="nav-link-about"
                onClick={() => scrollToSection("about", "Desktop Menu - About Us")}
                className="hover:text-cyan-500 cursor-pointer transition-colors"
              >
                About Us
              </button>
              <button
                id="nav-link-doctors"
                onClick={() => scrollToSection("surgeons", "Desktop Menu - Our Surgeons")}
                className="hover:text-cyan-500 cursor-pointer transition-colors"
              >
                Our Surgeons
              </button>
              <button
                id="nav-link-services"
                onClick={() => scrollToSection("services", "Desktop Menu - Services")}
                className="hover:text-cyan-500 cursor-pointer transition-colors"
              >
                Services
              </button>
              <button
                id="nav-link-reviews"
                onClick={() => scrollToSection("testimonials", "Desktop Menu - Testimonials")}
                className="hover:text-cyan-500 cursor-pointer transition-colors"
              >
                Testimonials
              </button>
              <button
                id="nav-link-faq"
                onClick={() => scrollToSection("faqs", "Desktop Menu - FAQs")}
                className="hover:text-cyan-500 cursor-pointer transition-colors"
              >
                FAQs
              </button>
              <button
                id="nav-link-contact"
                onClick={() => scrollToSection("contact", "Desktop Menu - Contact")}
                className="hover:text-cyan-500 cursor-pointer transition-colors"
              >
                Contact
              </button>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                id="header-cta-book-btn"
                href="https://wa.me/919426151688?text=Hello%20Gajera%20Dental%20Clinic,%20I%20would%20like%20to%20book%20an%20appointment"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                  if (!isMobile) {
                    e.preventDefault();
                    window.open("https://web.whatsapp.com/send?phone=919426151688&text=Hello%20Gajera%20Dental%20Clinic,%20I%20would%20like%20to%20book%20an%20appointment", "_blank", "noopener,noreferrer");
                  }
                  trackWhatsAppClick("Desktop CTA - Schedule Visit");
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-md cursor-pointer transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>Book Appointment</span>
              </a>
            </div>

            {/* Mobile Menu Icon with explicitly isolated tap container */}
            <div className="lg:hidden flex items-center justify-end relative z-[99999] pl-2 flex-shrink-0">
              <button
                id="mobile-drawer-toggle"
                onClick={(e) => {
                  e.stopPropagation();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="p-3 text-slate-700 hover:text-slate-950 active:bg-slate-100 rounded-full focus:outline-none cursor-pointer transition-colors relative z-[100001] flex items-center justify-center border border-slate-100/50 hover:bg-slate-50 bg-white"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-600" /> : <Menu className="w-5 h-5 text-slate-800" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Premium Mobile Navigation Drawer - Rendered perfectly at root hierarchy to avoid sticky clipping */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backing structural backdrop overlay */}
            <motion.div
              key="mob-nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[99998] lg:hidden"
              id="mobile-menu-backdrop-overlay"
            />

            {/* Side sliding navigation deck */}
            <motion.div
              key="mob-nav-sidebar"
              id="mobile-navigation-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-[310px] max-w-[85vw] shadow-2xl z-[99999] flex flex-col justify-between overflow-y-auto lg:hidden bg-white text-slate-800 border-l border-slate-100"
            >
              {/* Visual clinic ID header at top of side drawer */}
              <div className="p-6 border-b flex items-center justify-between border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-gradient-to-tr from-cyan-500 to-cyan-600 text-white rounded-xl">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-sm font-black font-display tracking-tight block">
                      GAJERA <span className="text-cyan-500">DENTAL</span>
                    </span>
                    <span className="text-[9px] text-slate-400 block font-mono">
                      CLINIC & REGIONAL CENTER
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-slate-100 cursor-pointer text-slate-500 hover:text-slate-950"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Substantially enhanced list of scroll destinations */}
              <div className="px-6 py-6 flex-1 space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-widest font-mono block mb-3 text-slate-400">
                  Clinical Navigation
                </span>

                {[
                  { id: "home", label: "Home" },
                  { id: "about", label: "About Us" },
                  { id: "surgeons", label: "Our Surgeons" },
                  { id: "services", label: "Services" },
                  { id: "testimonials", label: "Testimonials" },
                  { id: "faqs", label: "FAQs" },
                  { id: "contact", label: "Contact" }
                ].map((link) => (
                  <button
                    key={link.id}
                    id={`mob-link-${link.id}`}
                    onClick={() => scrollToSection(link.id, `Mobile Menu - ${link.label}`)}
                    className="block w-full text-left py-3 px-4 rounded-xl text-sm font-bold transition-all cursor-pointer hover:bg-slate-50 text-slate-700 hover:text-blue-600"
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              {/* Patient booking and communication action dock */}
              <div className="p-6 border-t space-y-4 border-slate-100">
                <div className="flex flex-col gap-1 text-[11px] leading-tight">
                  <span className="font-bold flex items-center gap-1">
                    📍 Nana Varachha, Surat
                  </span>
                  <span className="text-slate-500">
                    Gokulam Arkade location
                  </span>
                </div>
                <a
                  id="mob-cta-book"
                  href="https://wa.me/919426151688?text=Hello%20Gajera%20Dental%20Clinic,%20I%20would%20like%20to%20book%20an%20appointment"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                    if (!isMobile) {
                      e.preventDefault();
                      window.open("https://web.whatsapp.com/send?phone=919426151688&text=Hello%20Gajera%20Dental%20Clinic,%20I%20would%20like%20to%20book%20an%20appointment", "_blank", "noopener,noreferrer");
                    }
                    trackWhatsAppClick("Mobile Menu - Schedule Appointment Button");
                  }}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 text-center py-3.5 rounded-xl font-bold font-display cursor-pointer shadow-lg hover:scale-[1.02] transition-all text-sm flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5 text-slate-950" />
                  <span>Book via WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 3. HERO PRESENTATION AND METRICS */}
      <section id="home" className="py-20 sm:py-28 bg-gradient-to-b from-slate-100 via-white to-slate-50 relative overflow-hidden">
        {/* Soft floating blurred background circles */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-15 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-semibold rounded-full uppercase tracking-wider mx-auto lg:mx-0">
                  <ShieldCheck className="w-4 h-4 text-cyan-600 animate-spin" />
                  <span>Verified ISO Standard Sanitation Suite</span>
                </div>

                <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 font-display tracking-tight leading-tight sm:leading-none">
                  Advanced Dental Care & <span className="text-cyan-600 relative inline-block">Smile Design</span> in Surat
                </h1>

                <p className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                  Welcome to <strong>Gajera Dental Clinic</strong>, Nana Varachha’s leading multi-specialty clinical hub. Under Dr. Sujit Gajera (Expert Implantologist & Smile Designer) and team, we deliver high-precision tooth replacements, cosmetic bonding, painless lasers, and pediatric health for your family.
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <a
                  id="hero-cta-arrange-btn"
                  href="https://wa.me/919426151688?text=Hello%20Gajera%20Dental%20Clinic,%20I%20would%20like%20to%20book%20an%20appointment"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                    if (!isMobile) {
                      e.preventDefault();
                      window.open("https://web.whatsapp.com/send?phone=919426151688&text=Hello%20Gajera%20Dental%20Clinic,%20I%20would%20like%20to%20book%20an%20appointment", "_blank", "noopener,noreferrer");
                    }
                    trackWhatsAppClick("Hero CTA - Book Instant Session");
                  }}
                  className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-650 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all cursor-pointer font-display flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                  <span>Book via WhatsApp</span>
                </a>
                <button
                  id="hero-view-services-btn"
                  onClick={() => scrollToSection("services-section", "Hero CTA - Browse 18 Services")}
                  className="w-full sm:w-auto bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-8 py-4 rounded-xl transition-all cursor-pointer font-display"
                >
                  Browse 18 Services
                </button>
              </motion.div>

              {/* Surat Dental Contact Callout widgets */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-3 gap-4 text-left border-t border-slate-200/80 pt-8"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">Implantologist</span>
                  <span className="text-slate-800 font-bold text-sm block">Dr. Sujit Gajera</span>
                  <span className="text-slate-500 text-xs block leading-tight">M.I.D.A Expert Surgeon</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">Cosmetic Lead</span>
                  <span className="text-slate-800 font-bold text-sm block">Dr. Twinkal Munjani</span>
                  <span className="text-slate-500 text-xs block leading-tight">Certified Cosmetic Specialist</span>
                </div>
                <div className="col-span-2 md:col-span-1 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">Location Reach</span>
                  <span className="text-slate-800 font-bold text-sm block">Varachha, Surat</span>
                  <span className="text-slate-500 text-xs block leading-tight">Gokulam Arkade Area Corridor</span>
                </div>
              </motion.div>
            </div>

            {/* Right Panel - Custom Multi-Layered Trust Photography Gallery */}
            <div className="lg:col-span-5 relative mt-10 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                {/* 1. Large Main Modern Clinic Interior Image */}
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 bg-slate-100 group aspect-[4/3] relative z-10">
                  <img
                    src={heroClinicImg}
                    alt="Modern dental clinic in Nana Varachha Surat - Premium Gajera Dental Suite Interior"
                    referrerPolicy="no-referrer"
                    fetchPriority="high"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />
                </div>



                {/* 3. Absolute Glassmorphic ISO Badge */}
                <div className="absolute -top-4 -right-2 sm:-right-4 z-20 bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-xl text-white border border-slate-800 flex items-center gap-2 shadow-lg text-[10px] sm:text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                  <span className="font-mono font-bold tracking-wider">ISO STERILE SUITE</span>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* About Clinic Section */}
      <AboutClinicSection />

      {/* Smile Transformation Gallery */}
      <SmileTransformationSection />

      {/* 4. CLINICAL DOCTORS PROFILES (About Doctor section) */}
      <DoctorsSection onSelectDoctorForBooking={handleSelectDoctorForBooking} />

      {/* 5. 18 CLINICAL SERVICES SECTION */}
      <ServicesSection onSelectServiceForBooking={handleSelectServiceForBooking} />

      {/* Interactive Diagnostics Helper & Pricing Matrix */}
      <DiagnosticCalculatorSection onSelectServiceAndDoctor={handleSelectServiceAndDoctorForBooking} />

      {/* Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* 6. DYNAMIC APPOINTMENTS SCHEDULER & BOOKING PASS PORTAL */}
      <BookingModule
        selectedServiceFromParent={selectedServiceToBook}
        onClearSelectedService={() => setSelectedServiceToBook("")}
        selectedDoctorFromParent={selectedDoctorToBook}
        onClearSelectedDoctor={() => setSelectedDoctorToBook("")}
      />

      {/* 7. LOCAL AREA SEO DIRECTIVES MODULE */}
      <LocalSeoModule />



      {/* 8. TESTIMONIALS SECTION (With active custom local patient reviews submission!) */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-cyan-600 font-semibold tracking-wider uppercase text-sm bg-cyan-50 px-4 py-1.5 rounded-full inline-block">
              Patient Experiences
            </span>
            <h2 className="mt-4 text-4xl font-extrabold font-display text-slate-900 tracking-tight">
              What Sarthana & Nana Varachha Residents Say
            </h2>
            <p className="mt-4 text-base text-slate-650 text-slate-650 leading-relaxed">
              Read real-life feedback from Surat residents which is testament to our dentists' precise treatments and gentle bedside manners.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Reviews display grid - Left Column */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-xl font-bold font-display text-slate-900">Verifiable Patient Stories</h3>
              <div className="grid grid-cols-1 gap-6">
                {testimonialsList.map((test) => (
                  <div
                    key={test.id}
                    id={`testimonial-card-${test.id}`}
                    className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-cyan-100 transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-950 font-display text-base block">{test.patientName}</span>
                        <span className="text-xs text-slate-400 block">{test.location} • Checked {test.date}</span>
                      </div>
                      
                      {/* Rating Stars */}
                      <div className="flex gap-0.5 text-amber-500">
                        {Array.from({ length: test.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                    </div>

                    <div className="inline-flex text-[11px] font-bold px-2.5 py-1 bg-cyan-50 text-cyan-800 rounded-lg">
                      Treatment: {test.treatment}
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed italic">
                      "{test.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Leave a review - Right Column */}
            <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
              <div>
                <h3 className="text-xl font-bold font-display flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-cyan-400" />
                  <span>Share Your Experience</span>
                </h3>
                <p className="text-slate-450 text-slate-400 text-xs mt-1">Have you recently visited Dr. Sujit Gajera or team at Gokulam Arkade? Submit your feedback instantly:</p>
              </div>

              {reviewSuccessMsg && (
                <div className="p-4 bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs rounded-xl">
                  Thank you! Your patient review has been submitted to local state storage and added to the list successfully!
                </div>
              )}

              <form onSubmit={handleAddReview} className="space-y-4 text-xs">
                {/* Name */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Full Name</label>
                  <input
                    id="new-review-name"
                    required
                    type="text"
                    placeholder="e.g. Soniya Patel"
                    value={newReviewName}
                    onChange={(e) => setNewReviewName(e.target.value)}
                    className="w-full bg-slate-850 bg-slate-950 border border-slate-700/60 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500 placeholder-slate-500"
                  />
                </div>

                {/* Patient Treatment */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Treatment Received</label>
                  <input
                    id="new-review-treatment"
                    required
                    type="text"
                    placeholder="e.g. Tooth Whitening / Implants"
                    value={newReviewTreatment}
                    onChange={(e) => setNewReviewTreatment(e.target.value)}
                    className="w-full bg-slate-850 bg-slate-950 border border-slate-700/60 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500 placeholder-slate-500"
                  />
                </div>

                {/* Rating selection & Location */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Rating</label>
                    <select
                      id="new-review-rating-select"
                      value={newReviewRating}
                      onChange={(e) => setNewReviewRating(parseInt(e.target.value))}
                      className="w-full bg-slate-850 bg-slate-950 border border-slate-700/60 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    >
                      <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
                      <option value="4">⭐⭐⭐⭐ 4 Stars</option>
                      <option value="3">⭐⭐⭐ 3 Stars</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Your Area in Surat</label>
                    <input
                      id="new-review-location"
                      required
                      type="text"
                      placeholder="e.g. Nana Varachha, Surat"
                      value={newReviewLocation}
                      onChange={(e) => setNewReviewLocation(e.target.value)}
                      className="w-full bg-slate-850 bg-slate-950 border border-slate-700/60 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500 placeholder-slate-500"
                    />
                  </div>
                </div>

                {/* Review comment */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Comment</label>
                  <textarea
                    id="new-review-comment"
                    required
                    rows={3}
                    placeholder="Describe how painless and clean your visual checkup visit was..."
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    className="w-full bg-slate-850 bg-slate-950 border border-slate-700/60 rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500 placeholder-slate-500"
                  />
                </div>

                <button
                  id="submit-review-btn"
                  type="submit"
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2.5 rounded-lg text-xs font-display tracking-wider cursor-pointer"
                >
                  Publish Local Review
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION SECTION */}
      <section id="faqs" className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-cyan-600 font-semibold tracking-wider uppercase text-sm bg-cyan-50 px-4 py-1.5 rounded-full inline-block">
              Clinical FAQs
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
              Frequently Answered Queries
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-505 text-slate-600 leading-relaxed">
              Have specific questions about treatment costs, scheduling, or laser safety? Read the clarifications below:
            </p>
          </div>

          <div className="space-y-4">
            {FREQUENT_FAQS.map((faq) => {
              const isOpen = expandedFaqIndex === faq.id;
              return (
                <div
                  key={faq.id}
                  id={`faq-accordion-item-${faq.id}`}
                  className="bg-white rounded-2xl border border-slate-150 border-slate-200/50 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    id={`faq-btn-toggle-${faq.id}`}
                    onClick={() => setExpandedFaqIndex(isOpen ? null : faq.id)}
                    className="w-full px-6 py-5 text-left font-bold text-slate-900 font-display flex justify-between items-center gap-4 text-sm sm:text-base cursor-pointer hover:bg-slate-50/50"
                  >
                    <span className="leading-tight">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-container-${faq.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 text-xs sm:text-sm text-slate-600 border-t border-slate-50 pt-4 leading-relaxed bg-slate-50/20">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. ELITE FOOTER SUMMARY */}
      <footer className="bg-slate-950 text-white pt-16 pb-8 border-t border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-slate-900 text-xs sm:text-sm">
            
            {/* Logo/Clinic detail block */}
            <div className="space-y-4 col-span-1 md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-cyan-600 text-white rounded-lg">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <span className="text-xl font-black font-display tracking-tight text-white">
                  GAJERA <span className="text-cyan-400">DENTAL</span>
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed text-xs">
                Premium multi-speciality clinical center situated at Sarthana Jakatnaka, Nana Varachha, Surat. Specializing in high-end titanium implants, porcelain crowns, kid-friendly orthodontics, and painless lasers.
              </p>
              <div className="space-y-1 font-mono text-[11px] text-cyan-300 pt-2">
                <div>📞 Direct Line: 90161 98281</div>
                <div>📞 Admin Helpline: 094261 51688</div>
              </div>
              <div className="pt-3">
                <a
                  id="footer-whatsapp-btn"
                  href="https://wa.me/919426151688?text=Hello%20Gajera%20Dental%20Clinic,%20I%20would%20like%20to%20book%20an%20appointment"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                    if (!isMobile) {
                      e.preventDefault();
                      window.open("https://web.whatsapp.com/send?phone=919426151688&text=Hello%20Gajera%20Dental%20Clinic,%20I%20would%20like%20to%20book%20an%20appointment", "_blank", "noopener,noreferrer");
                    }
                    trackWhatsAppClick("Footer WhatsApp Button");
                  }}
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs py-2 px-4 rounded-xl transition-all shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-slate-950 font-black" />
                  <span>Connect WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Quick sections navigation columns */}
            <div className="space-y-4">
              <h4 className="font-bold font-display text-white text-xs uppercase tracking-wider text-cyan-400">Our Services</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><button onClick={() => handleSelectServiceForBooking("Teeth whitening")} className="hover:text-cyan-300 transition-colors cursor-pointer text-left">Teeth whitening & Bleach</button></li>
                <li><button onClick={() => handleSelectServiceForBooking("Dental implants")} className="hover:text-cyan-300 transition-colors cursor-pointer text-left">Dental Implants (Titanium)</button></li>
                <li><button onClick={() => handleSelectServiceForBooking("Root canals")} className="hover:text-cyan-300 transition-colors cursor-pointer text-left">Modern Painless RCT</button></li>
                <li><button onClick={() => handleSelectServiceForBooking("Cosmetic procedures")} className="hover:text-cyan-300 transition-colors cursor-pointer text-left">Smile Design Specialists</button></li>
                <li><button onClick={() => handleSelectServiceForBooking("Laser dentistry")} className="hover:text-cyan-300 transition-colors cursor-pointer text-left">Painless Soft-Tissue Laser</button></li>
              </ul>
            </div>

            {/* Local SEO locations quick triggers */}
            <div className="space-y-4">
              <h4 className="font-bold font-display text-white text-xs uppercase tracking-wider text-cyan-400">Surat Locations Served</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>Sarthana Jakatnaka (0.2 km)</li>
                <li>Nana Varachha (1.2 km)</li>
                <li>Yogi Chowk (2.5 km)</li>
                <li>Puna Gam (3.8 km)</li>
                <li>Mota Varachha (4.5 km)</li>
              </ul>
            </div>

            {/* Real clinical hours address block */}
            <div className="space-y-4">
              <h4 className="font-bold font-display text-white text-xs uppercase tracking-wider text-cyan-400">Headquarters Address</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                📍 101, Gokulam Arkade,<br />
                Sarthana Jakatnaka,<br />
                Nana Varachha, Surat,<br />
                Gujarat, India - 395013
              </p>
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl leading-relaxed text-xs text-slate-300 space-y-3 font-medium">
                <div>
                  <h5 className="font-bold text-white tracking-wider uppercase text-[10px] text-cyan-500">MONDAY TO SATURDAY</h5>
                  <p className="mt-0.5">9:30 A.M. – 1:00 P.M.</p>
                  <p>5:00 P.M. – 8:30 P.M.</p>
                </div>
                <div className="pt-2 border-t border-slate-800/60">
                  <h5 className="font-bold text-slate-400 tracking-wider uppercase text-[10px]">SUNDAY</h5>
                  <p className="text-red-400 font-extrabold mt-0.5 uppercase tracking-wide">CLOSED</p>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <div>
              <p>© {new Date().getFullYear()} GAJERA DENTAL CLINIC. All rights reserved.</p>
              <p className="mt-1 text-[10px] text-slate-600">Represented by Dr. Sujit Gajera, Dr. Twinkal T Munjani & Dr. Nensi Savani, Surat, Gujarat.</p>
            </div>
            
            <div className="flex gap-4">
              <span className="text-slate-600 font-mono text-[10px]">ISO 9001:2015 Clinic Sanitation Guarantee</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating Premium WhatsApp Contact Node */}
      <WhatsAppButton />

    </div>
  );
}
