import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X } from "lucide-react";
import { trackWhatsAppClick } from "../analytics";

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);

  // Trigger a professional welcoming teaser after 4 seconds of initial site interaction
  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if user has already dismissed the teaser in this session
      const dismissed = sessionStorage.getItem("wa_teaser_dismissed");
      if (!dismissed) {
        setShowTeaser(true);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismissTeaser = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowTeaser(false);
    sessionStorage.setItem("wa_teaser_dismissed", "true");
  };

  const whatsappUrl = "https://wa.me/919426151688?text=Hello%20Gajera%20Dental%20Clinic%2C%20I%20would%20like%20to%20book%20an%20appointment.";

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[999999] flex flex-col items-end gap-3">
      {/* 1. Interactive Teaser Prompt (Slide in above the button) */}
      <AnimatePresence>
        {showTeaser && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-slate-800 flex flex-col gap-2 max-w-[260px] sm:max-w-[280px] text-xs relative"
          >
            {/* Smooth mini close button */}
            <button
              onClick={handleDismissTeaser}
              className="absolute -top-2 -right-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white p-1.5 rounded-full border border-slate-700 shadow-md transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Close message suggestion"
            >
              <X className="w-3 h-3" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-bold text-emerald-400 tracking-wider uppercase text-[9px] font-mono">
                WhatsApp Consultation
              </span>
            </div>

            <p className="leading-relaxed text-slate-300">
              Need immediate help or want to book an appointment with our surgeons? Let's chat.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setShowTeaser(false);
                sessionStorage.setItem("wa_teaser_dismissed", "true");
                trackWhatsAppClick("Teaser Message Card");
              }}
              className="mt-1 flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-3 py-1.5 rounded-xl font-bold font-sans text-[11px] transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Connect Instantly</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Primary Floating Button Icon with Soft Custom Aura Ring */}
      <div className="relative">
        {/* Decorative ambient pulsing aura ring */}
        <div className="absolute -inset-2 bg-emerald-500/20 rounded-full blur-md animate-pulse pointer-events-none" />

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            trackWhatsAppClick("Floating Sticky Pulse Button");
          }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
          className="relative flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-full shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer focus:outline-none focus:ring-4 focus:ring-emerald-400/50"
          aria-label="Chat with us on WhatsApp"
        >
          <MessageCircle className="w-7 h-7 stroke-[2.25]" />

          {/* Interactive Tooltip (CSS + Motion Animation overlay) - Restricted to table/desktop to prevent viewport clipping on small mobile screen widths */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="absolute right-16 top-1/2 -translate-y-1/2 bg-slate-950 text-white text-xs font-bold px-3 py-2 rounded-xl whitespace-nowrap shadow-xl border border-slate-800 pointer-events-none hidden sm:flex items-center gap-1.5"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Chat with us on WhatsApp
              </motion.div>
            )}
          </AnimatePresence>
        </a>
      </div>
    </div>
  );
}
