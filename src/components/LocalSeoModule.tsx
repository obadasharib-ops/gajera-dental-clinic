import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Compass, Navigation, Car, Landmark, ShieldCheck, Mail, Phone, ExternalLink } from "lucide-react";
import { ALIAS_AREAS, ADDRESS, CONTACT_NUMBERS } from "../data";
import { trackClickToCall } from "../analytics";

export default function LocalSeoModule() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=101+Gokulam+Arkade+Sarthana+Jakatnaka+Nana+Varachha+Surat+Gujrat+395013`;

  return (
    <section id="local-seo-section" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* SEO Text Layout - Left */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm bg-blue-50 px-4 py-1.5 rounded-full inline-block">
              Surat's Premier Dental Landmark
            </span>
            <span className="sr-only">Contact & Location Map</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight text-slate-900">
              Serving Sarthana Jakatnaka & Nana Varachha Neighborhoods
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              <strong>Gajera Dental Clinic</strong> is strategically headquartered at 101, Gokulam Arkade, Surat. We optimize teeth diagnostic routines and surgical care specifically for the community of Nana Varachha, Sarthana, Yogi Chowk, and the broader Surat Metropolitan region.
            </p>

            {/* Travel Directions Accordion */}
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-start gap-3">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm font-display">Prime Location Landmark</h4>
                  <p className="text-xs text-slate-500 mt-1">Located on the 1st Floor of the premium Gokulam Arkade development, easily accessible via lifts and escalators.</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-start gap-3">
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm font-display">Parking & Convenience</h4>
                  <p className="text-xs text-slate-500 mt-1">Ample ground level and basement parking for bikes and cars with dedicated security staff.</p>
                </div>
              </div>
            </div>

            {/* Google Map Anchor Actions */}
            <div className="pt-4 flex flex-wrap gap-4">
              <a
                id="google-maps-navigation-btn"
                href={googleMapsUrl}
                target="_blank"
                referrerPolicy="no-referrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-750 hover:to-blue-800 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer"
              >
                <Navigation className="w-4 h-4 text-white animate-bounce" />
                <span>Get Route on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Building Plaza Facade Visualizer */}
            <div className="pt-6 border-t border-slate-200/60 mt-6 flex gap-4 items-center bg-white p-3.5 rounded-2xl border border-slate-200/40">
              <div className="relative w-28 h-20 bg-slate-100 rounded-xl overflow-hidden shrink-0 group">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fm=webp&fit=crop&q=75&w=240&h=160"
                  alt="Gokulam Arkade Nana Varachha Plaza Facade - Location of Gajera Dental Clinic Surat"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-900 leading-tight">Physical Landmark Recognition</p>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Look for the modern glass facade of <strong>Gokulam Arkade</strong> on the main Varachha-Sarthana intersection corridor.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Distance & Map Simulation - Right */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xl">
            <h3 className="text-lg font-bold font-display text-slate-900 flex items-center gap-2 mb-2">
              <Compass className="w-5 h-5 text-blue-600" />
              <span>Surat Proximity & Commuter Map</span>
            </h3>
            <p className="text-xs text-slate-500 mb-6">Select your location in Varachha or neighboring Surat corridors to check driving distance to our clinic:</p>

            {/* Neighborhood Pills Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {ALIAS_AREAS.map((area) => {
                const isSelected = selectedArea === area.name;
                return (
                  <button
                    key={area.name}
                    id={`btn-area-${area.name.replace(/\s+/g, "").toLowerCase()}`}
                    onClick={() => setSelectedArea(area.name)}
                    className={`p-3 text-left rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-blue-600 text-white scale-[1.02] border-transparent shadow-lg shadow-blue-105"
                        : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/60"
                    }`}
                  >
                    <span className="text-xs font-bold tracking-tight block">{area.name}</span>
                    <span className={`text-[10px] font-mono mt-1 block ${isSelected ? "text-blue-100" : "text-slate-400"}`}>
                      🚗 {area.distInKm} away
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Transit Guide */}
            <AnimatePresence mode="wait">
              {selectedArea ? (
                <motion.div
                  key={selectedArea}
                  id="selected-area-routing-guide"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 sm:p-6 text-xs text-slate-700 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-900 font-display text-sm">Directions from {selectedArea}</span>
                    <button
                      id="reset-area-btn"
                      onClick={() => setSelectedArea(null)}
                      className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer underline"
                    >
                      Clear Link
                    </button>
                  </div>
                  <p className="leading-relaxed">
                    Simply take the primary Varachha road or bypass directly towards Sarthana Jakatnaka. You will discover <strong>Gokulam Arkade</strong> easily at the main corner intersection. Travel time from {selectedArea} is roughly {parseFloat(ALIAS_AREAS.find((a) => a.name === selectedArea)?.distInKm || "") * 3} minutes depending on peak traffic.
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-blue-800 font-medium bg-white px-2.5 py-1.5 rounded-lg border border-blue-100/40 w-fit">
                    <Landmark className="w-3.5 h-3.5" />
                    <span>Reference Landmark: {ALIAS_AREAS.find((a) => a.name === selectedArea)?.landmark}</span>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 text-center text-xs text-slate-400 border border-slate-200/40">
                  <MapPin className="w-8 h-8 mx-auto text-slate-350 mb-2 animate-bounce" />
                  <p>Click any neighborhood tile above to render automated directions and reference guidelines instantly.</p>
                </div>
              )}
            </AnimatePresence>

            {/* Real Interactive Google Maps Element */}
            <div className="mt-6 rounded-2xl overflow-hidden border border-slate-200 shadow-inner h-[220px] relative bg-slate-100 group">
              <iframe
                id="gajera-google-maps-iframe"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.3496356788574!2d72.88936997503713!3d21.217502080482594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f4ff7000001%3A0x633b4d45ad9959e4!2sGokulam%20Arkade!5e0!3m2!1sen!2sin!4v1717610000000!5m2!1sen!2sin"
                className="w-full h-full border-0 hover:filter-none transition-all duration-500 rounded-2xl"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Gajera Dental Clinic Google Maps Location"
              ></iframe>
            </div>

            {/* Local Address & Direct Dial Details */}
            <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Physical Address</span>
                <p className="text-slate-800 font-medium">Gajera Dental Clinic</p>
                <p className="text-slate-600 text-[11px] leading-snug">
                  {ADDRESS.line1},<br />
                  {ADDRESS.line2} - {ADDRESS.zip}
                </p>
              </div>

              <div className="space-y-1 sm:border-l sm:border-slate-100 sm:pl-6">
                <span className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Direct Clinical Desk</span>
                <p className="text-slate-800 font-medium">Pristine Consultation Lines</p>
                <div className="space-y-1 font-mono text-[11px]">
                  {CONTACT_NUMBERS.map((c) => (
                    <a
                      key={c.value}
                      id={`seo-phone-link-${c.value}`}
                      href={`tel:${c.value}`}
                      onClick={() => trackClickToCall(c.value, "Local SEO Clinical Desk")}
                      className="block text-blue-600 hover:text-blue-800 font-semibold hover:underline"
                    >
                      📞 +91 {c.display}
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
