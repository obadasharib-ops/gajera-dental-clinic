import React, { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, ArrowRight, CheckCircle2, Star } from "lucide-react";

import dentalImplantBefore from "../assets/images/dental_implant_before_1780730100112.png";
import dentalImplantAfter from "../assets/images/dental_implant_after_1780730120870.png";
import veneersBefore from "../assets/images/veneers_before_1780734350808.png";
import veneersAfter from "../assets/images/veneers_after_1780734370326.png";

interface CaseStudy {
  id: string;
  title: string;
  surgeon: string;
  duration: string;
  improvement: string;
  beforeImg: string;
  afterImg: string;
  description: string;
  treatmentName: string;
}

const CASES: CaseStudy[] = [
  {
    id: "case-1",
    title: "Full Arch Dental Implant Reconstruction",
    surgeon: "Dr. Sujit Gajera",
    duration: "4 Months",
    improvement: "100% Dental Restoration & Biting Forces",
    beforeImg: dentalImplantBefore,
    afterImg: dentalImplantAfter,
    description: "Patient wanted permanent relief from loose, moving acrylic dentures. Dr. Sujit placed premium biomechanical titanium implants with custom high-strength ceramic bridges, yielding perfect stability and visual harmony.",
    treatmentName: "Dental Implants"
  },
  {
    id: "case-2",
    title: "Premium Porcelain Veneers & Alignment",
    surgeon: "Dr. Twinkal Munjani",
    duration: "2 Visits (5 Days)",
    improvement: "Aesthetic Symmetrical Alignment",
    beforeImg: veneersBefore,
    afterImg: veneersAfter,
    description: "Patient presented with severe enamel staining, surface micro-cracks, and front tooth spacing. Dr. Twinkal crafted ultra-thin aesthetic E-max ceramic veneers, establishing pristine brilliance and high durability.",
    treatmentName: "Veneers & Crowns"
  }
];

export default function SmileTransformationSection() {
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // 0 to 100
  const activeCase = CASES[activeCaseIdx];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <section id="smile-transformation" className="py-20 sm:py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden border-t border-slate-100">
      {/* Decorative premium blurs */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-cyan-100 rounded-full filter blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-emerald-100 rounded-full filter blur-3xl opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-cyan-600 font-semibold tracking-wider uppercase text-sm bg-cyan-50 px-4 py-1.5 rounded-full inline-block">
            Elite Clinical Results
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold font-display text-slate-900 tracking-tight leading-tight">
            Visual Harmony & Smile Transformation Gallery
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-650 text-slate-650 leading-relaxed">
            Drag the interactive slider over the treatment profiles to compare our actual diagnostic before-and-after restorations. See how surgical precision enhances natural beauty.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex justify-center gap-3 mb-10">
          {CASES.map((cs, idx) => (
            <button
              key={cs.id}
              id={`idx-case-tab-${idx}`}
              onClick={() => {
                setActiveCaseIdx(idx);
                setSliderPosition(50);
              }}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
                activeCaseIdx === idx
                  ? "bg-slate-900 text-cyan-400 border-slate-900 shadow-md"
                  : "bg-white text-slate-600 hover:bg-slate-50 border-slate-200"
              }`}
            >
              {cs.treatmentName} Gallery
            </button>
          ))}
        </div>

        {/* Interactive Comparison Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Technical Case Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
              <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
              <span>100% Verifiable Dental Makeover Success</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 tracking-tight leading-snug">
              {activeCase.title}
            </h3>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {activeCase.description}
            </p>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-3.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-450 text-slate-500 font-bold uppercase tracking-wider">Attending Dentist</span>
                <span className="font-semibold text-slate-900 font-display text-sm">{activeCase.surgeon}</span>
              </div>
              <div className="border-t border-slate-100 pt-3 flex justify-between items-center text-xs">
                <span className="text-slate-450 text-slate-500 font-bold uppercase tracking-wider">Restoration Period</span>
                <span className="font-semibold text-slate-900 font-mono">{activeCase.duration}</span>
              </div>
              <div className="border-t border-slate-100 pt-3 flex justify-between items-center text-xs">
                <span className="text-slate-450 text-slate-500 font-bold uppercase tracking-wider">Visual Outcome</span>
                <span className="font-semibold text-emerald-600 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
                  {activeCase.improvement}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-cyan-50/50 rounded-2xl border border-cyan-100/40 text-xs text-slate-700 leading-relaxed">
              <CheckCircle2 className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
              <span>
                All treatment images depict clinical transformations completed of regional patients, showcasing state sterilization levels and E-max porcelain durability.
              </span>
            </div>
          </div>

          {/* Right Column: Sliding Visualizer */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative w-full max-w-[580px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white select-none">
              
              {/* After Image (Background layer) */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={activeCase.afterImg}
                  alt={`${activeCase.title} Clinic Result After Smile Makeover at Gajera Dental Clinic Surat Gujarat`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-emerald-600/95 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-emerald-400/20 text-white font-bold text-xs uppercase tracking-wider z-10">
                  After Makeover ✨
                </div>
              </div>

              {/* Before Image (Clipping layer adjusted by slider) */}
              <div
                className="absolute inset-0 w-full h-full overflow-hidden"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                <img
                  src={activeCase.beforeImg}
                  alt={`${activeCase.title} Condition Before Cosmetic Dental Care at Gajera Dental - Best Dentist Surat`}
                  className="absolute inset-0 w-[580px] h-full object-cover"
                  style={{ width: "100%", height: "100%" }}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-slate-900/95 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-slate-700/60 text-white font-bold text-xs uppercase tracking-wider z-10">
                  Before Visit
                </div>
              </div>

              {/* Centered Slider Hairline Bar */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Visual Handle Ring */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 bg-slate-900 text-white border-2 border-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 cursor-ew-resize transition-transform select-none">
                  <span className="text-[10px] select-none font-bold">↔</span>
                </div>
              </div>

              {/* Ghost Slider Input Covering Canvas (Fully Responsive & Accessible) */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={handleSliderChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-35"
                title="Slide to compare before and after dental treatment outcomes"
              />
            </div>

            {/* Instruction tooltip */}
            <p className="text-xs text-slate-400 mt-4 font-medium flex items-center gap-1.5">
              <span>💡</span>
              <span>Slide cursor or finger left and right over the image to inspect teeth precision reconstruction profiles</span>
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
