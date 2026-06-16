import React from "react";
import { motion } from "motion/react";
import { ShieldCheck, Heart, Zap, Sparkles, Award, Star } from "lucide-react";

import consultationDiagnosticImg from "../assets/images/dental_consultation_diagnostic_1780737244816.png";

export default function WhyChooseUsSection() {
  const pillars = [
    {
      id: "pillar-1",
      icon: ShieldCheck,
      title: "Class-A Sterilization & Hospital-Grade Hygiene",
      subtitle: "Absolute Patient Safety First",
      description: "At Gajera Dental Clinic, we operate dynamic autoclave sterilization suites and follow rigorous clinical protocols. Every diagnostic tool, chairside accessory, and clinical surface undergoes physical and chemical disinfection before any consultation.",
      benefit: "Guarantees a 100% sterile, infection-free clinical environment for major oral surgeries."
    },
    {
      id: "pillar-2",
      icon: Zap,
      title: "Next-Gen Painless Dental Technology",
      subtitle: "Comfort-Focused Clinical Therapies",
      description: "We minimize patient discomfort and anxiety by integrating modern soft-tissue dental lasers and micro-clinical equipment. From painless root canals to laser-sterile gum contours, our treatments focus on fast, stitch-free healing.",
      benefit: "Saves you from needle fear, minimizes post-operative swelling, and accelerates tissue recovery."
    },
    {
      id: "pillar-3",
      icon: Sparkles,
      title: "Triple-Doctor Collaborative Expertise",
      subtitle: "Diverse Specialty Synergy Under One Roof",
      description: "Our core medical panel combines Dr. Sujit Gajera's expertise in advanced implantology and digital smile designing, Dr. Twinkal Munjani's artistic mastery in premium cosmetic veneers, and Dr. Nensi Savani's specialized care in family and pediatric dentistry.",
      benefit: "Ensures comprehensive, multi-directional second opinions and clinical precision for all age groups."
    },
    {
      id: "pillar-4",
      icon: Heart,
      title: "Empathetic, Patient-First Care Philosophy",
      subtitle: "Warm, Gentle & Respectful Bedside Manner",
      description: "We reject cold, assembly-line medical treatments. Every treatment plan is hand-crafted with digital previews, absolute cost transparency, and supportive pediatric adaptation techniques so your child's first check-up is filled with smiles.",
      benefit: "Establishes lifelong dento-facial health without dental phobia or long, exhausting waiting rooms."
    }
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background radial soft light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <span className="text-blue-400 font-semibold tracking-wider uppercase text-sm bg-blue-950/80 border border-blue-800 px-4 py-1.5 rounded-full inline-block">
              Why Nana Varachha Trusts Us
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
              Elite Standard of Dental Excellence
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              We combine specialized medical training, cutting-edge diagnostic scanners, and a deeply personalized bedside touch to elevate your community's oral healthcare.
            </p>
          </motion.div>
        </div>

        {/* Split Grid Layout: Left has custom image, right has pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: High-End Interactive Consultation Image Card */}
          <div className="lg:col-span-5 rounded-4xl bg-slate-850 p-3 border border-slate-800 flex flex-col justify-between overflow-hidden relative group min-h-[380px]">
            <img
              src={consultationDiagnosticImg}
              alt="Dental implant consultation at Gajera Dental Clinic in Nana Varachha Surat"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 opacity-90"
            />
            {/* Dimming ambient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
            
            {/* Ambient indicator widget */}
            <div className="relative z-10 self-start p-3 bg-blue-900/80 backdrop-blur-md rounded-2xl border border-blue-600/40 text-xs font-mono font-bold text-blue-200">
              ⚡ Comfort & Precision Guided
            </div>

            <div className="relative z-10 p-6 self-end text-white space-y-1.5 drop-shadow-md">
              <span className="text-[10px] uppercase tracking-widest text-blue-400 font-mono font-bold block">PATIENT-FIRST ADVANCEMENT</span>
              <h3 className="text-xl sm:text-2xl font-bold font-display leading-tight">Comfort-Focused Clinical Dental Therapies</h3>
              <p className="text-xs text-slate-300">Every treatment starts with a digital mockup consultation so you understand and preview your diagnostics in Surat comfortably.</p>
            </div>
          </div>

          {/* Right Column: Pillars grid */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((pillar, idx) => {
              const IconComponent = pillar.icon;
              return (
                <motion.div
                  key={pillar.id}
                  id={`why-choose-card-${pillar.id}`}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="bg-slate-850 p-6 sm:p-7 rounded-3xl border border-slate-800 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-950/20 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 bg-blue-950 text-blue-400 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <IconComponent className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono font-bold block">{pillar.subtitle}</span>
                        <h3 className="text-sm sm:text-base font-bold text-white font-display mt-0.5 group-hover:text-blue-300 transition-colors">
                          {pillar.title}
                        </h3>
                      </div>
                    </div>
                    
                    <p className="text-slate-350 text-xs sm:text-sm leading-relaxed mb-4">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/40 text-[11px] text-blue-300 flex items-start gap-2">
                    <span className="font-mono font-black text-blue-400 text-[11px] select-none shrink-0">👑 Benefit:</span>
                    <span className="leading-snug">{pillar.benefit}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Patient Counter Section */}
        <div className="mt-16 p-8 bg-gradient-to-r from-blue-950 to-slate-950 rounded-4xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl font-bold font-display text-white">Ready to experience world-class dentistry first-hand?</h4>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Meet our surgeons, view live intraoral diagnostic scans of your teeth, and feel the ultimate assurance under the guidance of certified implantologists.
            </p>
          </div>
          
          <div className="flex gap-4 items-center shrink-0">
            <div className="text-center border-r border-slate-800 pr-6">
              <span className="text-3xl sm:text-4xl font-extrabold text-blue-400 block font-mono">10,000+</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Healthy Smiles Restoration</span>
            </div>
            <div className="text-center pl-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-blue-400 block font-mono">100%</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Sterility & Autoclaving Assurance</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
