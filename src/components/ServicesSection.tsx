import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Layers,
  Search,
  Smile,
  Anchor,
  Grid,
  ShieldAlert,
  Scissors,
  Activity,
  Zap,
  Stethoscope,
  Flame,
  Dribbble,
  Maximize,
  Box,
  Video,
  X,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { DISCOVER_SERVICES } from "../data";
import { ServiceItem } from "../types";

// Import local image assets to ensure Vite bundles and publishes them correctly in production
import dentalBondingImg from "../assets/images/dental_bonding_item_1781016918245.png";
import cosmeticDentistryImg from "../assets/images/cosmetic_dentistry_1781017052911.png";
import dentalFillingsImg from "../assets/images/dental_fillings_1781017601256.png";
import laserDentistryImg from "../assets/images/laser_dentistry_treatment_1781018128859.png";
import oralSurgeryImg from "../assets/images/oral_surgery_dentistry_hd_1781017971268.png";
import rootCanalImg from "../assets/images/root_canal_clinical_procedure_1781018736520.png";
import teethReshapingImg from "../assets/images/teeth_reshaping_clinical_1781018800000_1781018862736.png";

// Dynamic Icon Mapper
const IconMapper = ({ name, className }: { name: string; className?: string }) => {
  const props = { className: className || "w-6 h-6" };
  switch (name) {
    case "Sparkles": return <Sparkles {...props} />;
    case "Layers": return <Layers {...props} />;
    case "Smile": return <Smile {...props} />;
    case "Anchor": return <Anchor {...props} />;
    case "Grid": return <Grid {...props} />;
    case "ShieldAlert": return <ShieldAlert {...props} />;
    case "Scissors": return <Scissors {...props} />;
    case "Activity": return <Activity {...props} />;
    case "Zap": return <Zap {...props} />;
    case "Stethoscope": return <Stethoscope {...props} />;
    case "Flame": return <Flame {...props} />;
    case "Dribbble": return <Dribbble {...props} />;
    case "Maximize": return <Maximize {...props} />;
    case "Box": return <Box {...props} />;
    case "Video": return <Video {...props} />;
    default: return <Activity {...props} />;
  }
};

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceTitle: string) => void;
}

const CATEGORIES = ["All", "General", "Cosmetic", "Surgical", "Preventive", "Pediatric"];

const ServiceImageMap: Record<string, string> = {
  "teeth-whitening": "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fm=webp&fit=crop&q=75&w=400&h=400",
  "bonding": dentalBondingImg,
  "check-ups": "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fm=webp&fit=crop&q=75&w=400&h=400",
  "cosmetic-procedures": cosmeticDentistryImg,
  "dental-implants": "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fm=webp&fit=crop&q=75&w=400&h=400",
  "dentures-bridges": "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fm=webp&fit=crop&q=75&w=400&h=400",
  "emergency-care": "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fm=webp&fit=crop&q=75&w=400&h=400",
  "extractions": "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fm=webp&fit=crop&q=75&w=400&h=400",
  "fillings-sealants": dentalFillingsImg,
  "laser-dentistry": laserDentistryImg,
  "mouth-guards": "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fm=webp&fit=crop&q=75&w=400&h=400",
  "oral-surgery": oralSurgeryImg,
  "paediatrics": "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fm=webp&fit=crop&q=75&w=400&h=400",
  "root-canals": rootCanalImg,
  "teeth-cleaning": "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fm=webp&fit=crop&q=75&w=400&h=400",
  "teeth-reshaping": teethReshapingImg,
  "veneers-crowns": "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fm=webp&fit=crop&q=75&w=400&h=400",
  "x-ray": "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fm=webp&fit=crop&q=75&w=400&h=400"
};

const getServiceAltText = (id: string, title: string) => {
  if (id === "root-canals") return "Root canal treatment by expert dentist in Surat at Gajera Dental Clinic";
  if (id === "teeth-whitening") return "Professional teeth whitening treatment in Surat at Gajera Dental Clinic";
  if (id === "dental-implants") return "Dental implant specialist treatment in Nana Varachha Surat - Gajera Dental Clinic";
  return `${title} treatment at Gajera Dental Clinic Surat, Sarthana Nana Varachha`;
};

const getServiceDetailAltText = (id: string, title: string) => {
  if (id === "root-canals") return "Painless Root canal treatment performed by expert dentist in Surat";
  if (id === "teeth-whitening") return "Professional teeth whitening treatment procedure in Surat clinic";
  if (id === "dental-implants") return "Advanced dental implant rehabilitation options in Sarthana Surat";
  return `${title} specialized care program at Gajera Dental Clinic Surat Gujarat`;
};

export default function ServicesSection({ onSelectServiceForBooking }: ServicesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeDetailService, setActiveDetailService] = useState<ServiceItem | null>(null);

  // Manage dynamic Technical Local SEO document.title & meta description for selected service modal
  React.useEffect(() => {
    if (activeDetailService) {
      const prevTitle = document.title;
      const metaDescription = document.querySelector('meta[name="description"]');
      const prevDesc = metaDescription ? metaDescription.getAttribute("content") : "";

      let optimizedTitle = "";
      let optimizedDesc = "";
      
      const titleLower = activeDetailService.title.toLowerCase();
      if (activeDetailService.id === "root-canals" || titleLower.includes("root canal")) {
        optimizedTitle = "Root Canal Treatment in Surat | Gajera Dental Clinic";
        optimizedDesc = "Painless Root Canal Treatment in Nana Varachha, Surat. Gajera Dental combines expert dental treatment and modern technology for stellar patient care. Book!";
      } else if (activeDetailService.id === "dental-implants" || titleLower.includes("implant")) {
        optimizedTitle = "Dental Implants in Surat | Gajera Dental Clinic";
        optimizedDesc = "Get secure Dental Implants in Nana Varachha, Surat. Our clinic provides expert dental treatment and modern technology with a focus on patient care. Schedule.";
      } else if (activeDetailService.id === "teeth-whitening" || titleLower.includes("whitening")) {
        optimizedTitle = "Teeth Whitening Treatment in Surat | Gajera Dental Clinic";
        optimizedDesc = "Professional Teeth Whitening in Nana Varachha, Surat. Gajera Clinic offers expert dental treatment under modern technology and comfortable patient care. visit.";
      } else {
        optimizedTitle = `${activeDetailService.title} in Surat | Gajera Dental Clinic`;
        optimizedDesc = `High-quality ${activeDetailService.title} in Nana Varachha, Surat. We offer expert dental treatment using advanced technology & dedicated patient care. Visit us today!`;
        if (optimizedDesc.length > 160) {
          optimizedDesc = optimizedDesc.substring(0, 157) + "...";
        } else if (optimizedDesc.length < 140) {
          optimizedDesc = `Top-rated ${activeDetailService.title} treatment available in Nana Varachha, Surat. Contact Gajera Dental Clinic for expert care, modern technology, and comfort.`;
          if (optimizedDesc.length > 160) {
            optimizedDesc = optimizedDesc.substring(0, 157) + "...";
          }
        }
      }

      // Ensure every title remains strictly under 60 characters
      if (optimizedTitle.length > 60) {
        optimizedTitle = `${activeDetailService.title} Surat | Gajera Dental`;
      }
      if (optimizedTitle.length > 60) {
        optimizedTitle = optimizedTitle.substring(0, 57) + "...";
      }

      document.title = optimizedTitle;
      if (metaDescription && optimizedDesc) {
        metaDescription.setAttribute("content", optimizedDesc);
      }

      return () => {
        document.title = prevTitle;
        if (metaDescription && prevDesc) {
          metaDescription.setAttribute("content", prevDesc);
        }
      };
    }
  }, [activeDetailService]);

  const filteredServices = useMemo(() => {
    return DISCOVER_SERVICES.filter((svc) => {
      const matchCat = selectedCategory === "All" || svc.category === selectedCategory;
      const matchSearch =
        svc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        svc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        svc.seoKeywords.some((key) => key.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="services" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Background soft gradients */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-emerald-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm bg-blue-50 px-4 py-1.5 rounded-full inline-block">
              18 Specialized Clinical Services
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold text-slate-900 font-display tracking-tight">
              Our Dental Treatments & Care
            </h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Explore our full spectrum of dental care in Surat. Every procedure leverages state-of-the-art diagnostic imaging and micro-dentistry comfort for flawless, health-centered results.
            </p>
          </motion.div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Category selection */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  id={`btn-cat-${cat.toLowerCase()}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-transparent"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:max-w-xs">
              <input
                id="service-search-input"
                type="text"
                placeholder="Search services or local needs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
              />
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              {searchQuery && (
                <button
                  id="clear-search-btn"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((svc, idx) => (
              <motion.div
                layout
                id={`service-card-${svc.id}`}
                key={svc.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: Math.min(idx * 0.03, 0.2) }}
                className="bg-white rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50/40 transition-all flex flex-col justify-between group overflow-hidden h-full"
              >
                <div>
                  {/* Service Card Image */}
                  <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
                    <img
                      src={ServiceImageMap[svc.id] || "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fm=webp&fit=crop&q=75&w=400&h=400"}
                      alt={getServiceAltText(svc.id, svc.title)}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <IconMapper name={svc.icon} className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-500 rounded-full uppercase tracking-wider">
                        {svc.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-950 font-display group-hover:text-blue-750 transition-colors">
                      {svc.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {svc.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                  <a
                    id={`btn-detail-${svc.id}`}
                    href={`#treatment-${svc.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveDetailService(svc);
                    }}
                    className="text-blue-600 text-xs font-bold font-display hover:text-blue-800 transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    Medical details & Care →
                  </a>
                  <button
                    id={`btn-svc-book-${svc.id}`}
                    onClick={() => onSelectServiceForBooking(svc.title)}
                    className="bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-all text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer"
                  >
                    Quick Book
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredServices.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm max-w-md mx-auto">
            <p className="text-slate-500 text-base">No services found matching your criteria.</p>
            <button
              id="clear-all-filters-btn"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 text-blue-600 hover:text-blue-700 font-semibold text-sm underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Expanded Clinical Details Modal */}
      <AnimatePresence>
        {activeDetailService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              id="service-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveDetailService(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              id="service-detail-modal"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-slate-100 z-10 flex flex-col max-h-[90vh]"
            >
              {/* Header with Background Cover Image */}
              <div className="relative p-6 sm:p-8 text-white min-h-[220px] flex items-end overflow-hidden">
                {/* Absolute Image Background */}
                <img
                  src={ServiceImageMap[activeDetailService.id] || "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fm=webp&fit=crop&q=75&w=600&h=400"}
                  alt={getServiceDetailAltText(activeDetailService.id, activeDetailService.title)}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transform scale-102"
                />
                {/* Gradient Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-950/20" />

                <button
                  id="close-modal-btn"
                  onClick={() => setActiveDetailService(null)}
                  className="absolute right-6 top-6 p-1.5 bg-black/40 hover:bg-black/60 rounded-full transition-colors text-white cursor-pointer z-10 border border-white/10"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative z-10 flex items-center gap-4">
                  <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/20">
                    <IconMapper name={activeDetailService.icon} className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold tracking-wider text-blue-200 uppercase bg-blue-950/80 border border-blue-800/60 px-2.5 py-1 rounded-full inline-block">
                      {activeDetailService.category} Treatment Info
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-display mt-2 text-white drop-shadow-md">
                      {activeDetailService.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-700 text-sm sm:text-base">
                {/* Introduction & Overview */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Introduction & Overview</h4>
                  <p className="text-slate-800 text-base font-semibold leading-relaxed bg-blue-50/40 p-4 rounded-2xl border border-blue-100/30">
                    {activeDetailService.introduction || activeDetailService.description}
                  </p>
                  <p className="text-slate-600 leading-relaxed mt-2 text-sm sm:text-base">
                    {activeDetailService.fullDetail}
                  </p>
                </div>

                {/* Key Benefits */}
                {activeDetailService.benefits && activeDetailService.benefits.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Key Treatment Benefits</span>
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeDetailService.benefits.map((benefit, i) => (
                        <li key={i} className="flex gap-2.5 items-start p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs sm:text-sm text-slate-700 hover:border-blue-100 transition-all">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Step-by-Step Procedure */}
                {activeDetailService.procedure && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-blue-500" />
                      <span>Clinical Step-by-Step Procedure</span>
                    </h4>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        {activeDetailService.procedure}
                      </p>
                    </div>
                  </div>
                )}

                {/* Duration & Consultation Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 mb-2 text-blue-700 font-semibold font-display">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span>Average Appointment Length</span>
                    </div>
                    <p className="text-slate-600 text-sm font-medium">{activeDetailService.duration}</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 mb-2 text-blue-700 font-semibold font-display">
                      <Smile className="w-4 h-4 text-blue-500" />
                      <span>Consultation Status</span>
                    </div>
                    <p className="text-slate-600 text-sm font-semibold">Yes, Free clinical diagnostics review included.</p>
                  </div>
                </div>

                {/* Pre/Post visit parameters */}
                <div className="space-y-4">
                  <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
                    <div className="flex items-center gap-2 mb-2 text-emerald-800 font-bold font-display text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>Pre-visit Guidelines & Care</span>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {activeDetailService.preCare}
                    </p>
                  </div>

                  <div className="p-4 bg-amber-50/55 rounded-2xl border border-amber-100/50">
                    <div className="flex items-center gap-2 mb-2 text-amber-800 font-bold font-display text-sm">
                      <AlertCircle className="w-5 h-5 text-amber-600" />
                      <span>Recovery Information & Post-visit Tips</span>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {activeDetailService.recoveryInfo || activeDetailService.postCare}
                    </p>
                    {activeDetailService.postCare && (
                      <div className="mt-3 pt-2 text-xs text-amber-900 border-t border-amber-200/40 flex gap-1.5 items-start">
                        <span className="font-semibold shrink-0">💡 Quick Tip:</span>
                        <span>{activeDetailService.postCare}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Why Choose Gajera Clinic */}
                {activeDetailService.whyChoose && (
                  <div className="p-4 bg-blue-50/40 rounded-2xl border border-blue-100/40 shadow-inner">
                    <div className="flex items-center gap-2 mb-2 text-blue-800 font-bold font-display text-xs sm:text-sm">
                      <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
                      <span>Why Patients Choose Gajera Dental Clinic</span>
                    </div>
                    <p className="text-slate-700 italic text-xs sm:text-sm leading-relaxed">
                      "{activeDetailService.whyChoose}"
                    </p>
                  </div>
                )}

                {/* Local Area SEO Optimization Highlight */}
                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    Local Service Area Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeDetailService.seoKeywords.map((tag) => (
                      <span key={tag} className="text-xs text-blue-800 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-lg font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-400 font-medium">Accepting New Patient Registrations in Nana Varachha, Surat</span>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    id="modal-cancel-btn"
                    onClick={() => setActiveDetailService(null)}
                    className="flex-1 sm:flex-initial text-slate-600 hover:bg-slate-200 text-sm font-bold px-5 py-2.5 rounded-xl cursor-pointer transition-colors"
                  >
                    Close
                  </button>
                  <button
                    id="modal-book-btn"
                    onClick={() => {
                      onSelectServiceForBooking(activeDetailService.title);
                      setActiveDetailService(null);
                    }}
                    className="flex-1 sm:flex-initial bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-6 py-2.5 rounded-xl shadow-md cursor-pointer transition-all"
                  >
                    Arrange Appointment
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Hidden Crawlable SEO Structure for Search Engines & Accessibility Crawlers */}
      <div className="sr-only" aria-hidden="false">
        {DISCOVER_SERVICES.map((svc) => (
          <article key={`seo-svc-${svc.id}`} className="p-8 my-4 border bg-white" id={`treatment-${svc.id}`}>
            <h1>{svc.title} in Nana Varachha, Surat | Gajera Dental Clinic</h1>
            <h2>Expert Dental Treatment &amp; Care for {svc.title} near Sarthana</h2>
            
            <section>
              <h3>Overview &amp; Clinical Medical Introduction</h3>
              <p>{svc.introduction || svc.description}</p>
              <p>{svc.fullDetail}</p>
            </section>

            <section>
              <h3>Modern Technology &amp; Treatment Benefits in Surat</h3>
              <p>Gajera Dental Clinic provides top-tier patient care using modern technology for our {svc.title} patients in Nana Varachha, Surat.</p>
              {svc.benefits && svc.benefits.length > 0 && (
                <ul>
                  {svc.benefits.map((benefit, bIndex) => (
                    <li key={bIndex}>{benefit}</li>
                  ))}
                </ul>
              )}
            </section>

            {svc.procedure && (
              <section>
                <h3>Detailed Step-by-Step {svc.title} Procedure</h3>
                <p>{svc.procedure}</p>
              </section>
            )}

            <section>
              <h3>Pre-Operative Guidelines &amp; Recovery Support</h3>
              <p><strong>Pre-care instructions:</strong> {svc.preCare}</p>
              <p><strong>Post-treatment recovery status to ensure patient comfort:</strong> {svc.recoveryInfo || svc.postCare}</p>
              {svc.postCare && <p><strong>Extra tip:</strong> {svc.postCare}</p>}
              {svc.whyChoose && <p><strong>Why patients trust us:</strong> {svc.whyChoose}</p>}
            </section>

            <section>
              <h3>Local SEO Targeting for Sarthana, Yogi Chowk &amp; Nana Varachha</h3>
              <p>Our treatment for {svc.title} is highly optimized for families and professionals residing in surrounding neighborhoods of Surat, Gujarat including Sarthana Jakatnaka, Yogi Chowk, Puna Gam, and Mota Varachha.</p>
              <p>Search phrases: {svc.seoKeywords.join(", ")}</p>
            </section>
          </article>
        ))}
      </div>
    </section>
  );
}
