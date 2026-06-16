import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Stethoscope, ClipboardCheck, Clock, ShieldAlert, Sparkles, AlertCircle } from "lucide-react";

interface Symptom {
  id: string;
  label: string;
  icon: string;
  suggestedService: string;
  suggestedDoctor: string;
  complexity: "Mild" | "Moderate" | "Surgical";
  priceEstimate: string;
  priorityAlert?: string;
}

const SYMPTOMS: Symptom[] = [
  {
    id: "stains",
    label: "Yellowing / Heavy Tooth Stains ☕",
    icon: "✨",
    suggestedService: "Teeth whitening",
    suggestedDoctor: "Dr. Twinkal T Munjani",
    complexity: "Mild",
    priceEstimate: "Rs. 3,500 - Rs. 8,000",
    priorityAlert: "Cosmetic procedure. Ideal prior to festivals, weddings, or corporate visits."
  },
  {
    id: "missing",
    label: "Missing Tooth / Chew Strain 🦷",
    icon: "⚓",
    suggestedService: "Dental implants",
    suggestedDoctor: "Dr. Sujit Gajera",
    complexity: "Surgical",
    priceEstimate: "Rs. 25,000 - Rs. 45,000 per anchor",
    priorityAlert: "Surgical titanium restoration. Highly recommended soon to avoid jawbone recession."
  },
  {
    id: "pain",
    label: "Severe Throbbing Toothache ⚡",
    icon: "🔥",
    suggestedService: "Root canals",
    suggestedDoctor: "Dr. Sujit Gajera",
    complexity: "Moderate",
    priceEstimate: "Rs. 4,500 - Rs. 9,500 (Multiple root channels)",
    priorityAlert: "EMERGENCY ALERT: Active nerve infection may quickly spread. Early therapy preserves the natural tooth!"
  },
  {
    id: "chipped",
    label: "Chipped / Uneven Edges 🔨",
    icon: "📐",
    suggestedService: "Bonding",
    suggestedDoctor: "Dr. Twinkal T Munjani",
    complexity: "Mild",
    priceEstimate: "Rs. 1,500 - Rs. 3,500 per tooth",
    priorityAlert: "Simple conservative resin makeover. Completed comfortably in a single appointment."
  },
  {
    id: "kids-checkup",
    label: "Kids Dental Checkup / Milk Tooth Cavity 🧒",
    icon: "🎈",
    suggestedService: "Paediatrics",
    suggestedDoctor: "Dr. Nensi Savani",
    complexity: "Mild",
    priceEstimate: "Rs. 800 - Rs. 2,500",
    priorityAlert: "Family preventive session. Dr. Nensi employs playful Tell-Show-Do visual models to ease anxiety."
  }
];

interface DiagnosticCalculatorSectionProps {
  onSelectServiceAndDoctor: (service: string, doctor: string) => void;
}

export default function DiagnosticCalculatorSection({ onSelectServiceAndDoctor }: DiagnosticCalculatorSectionProps) {
  const [selectedSymptomId, setSelectedSymptomId] = useState<string>("stains");
  const selectedSymptom = SYMPTOMS.find((s) => s.id === selectedSymptomId) || SYMPTOMS[0];

  return (
    <section id="diagnostics-calculator" className="py-20 sm:py-24 bg-[#0f172a] text-white relative overflow-hidden">
      {/* Absolute ambient lights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-blue-900/15 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-400 font-semibold tracking-wider uppercase text-sm bg-blue-950/80 border border-blue-800 px-4 py-1.5 rounded-full inline-block">
            Virtual Clinic Concierge
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
            Interactive Treatment Assistant & Price Transparency Guide
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-350 max-w-2xl mx-auto">
            Select your main oral concern below. Our interactive diagnostic model generates clinical recommendations, attending expert dentist matching, and honest transparent fee estimates.
          </p>
        </div>

        {/* Workspace layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Symptom Selector Cards */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-lg font-bold font-display text-cyan-400 uppercase tracking-widest flex items-center gap-2 mb-2">
              <span>👇</span>
              <span>Primary Dental Concern</span>
            </h3>

            <div className="flex flex-col gap-3">
              {SYMPTOMS.map((symptom) => {
                const isSelected = selectedSymptomId === symptom.id;
                return (
                  <button
                    key={symptom.id}
                    id={`btn-symptom-${symptom.id}`}
                    onClick={() => setSelectedSymptomId(symptom.id)}
                    className={`w-full p-4 text-left rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                      isSelected
                        ? "bg-slate-800 text-white border-blue-500 shadow-lg shadow-cyan-950/20 scale-[1.01]"
                        : "bg-slate-900/60 text-slate-300 border-slate-800/80 hover:bg-slate-850 hover:border-slate-700"
                    }`}
                  >
                    <span className="text-2xl select-none">{symptom.icon}</span>
                    <div className="flex-1">
                      <p className="font-bold font-display text-sm sm:text-base leading-tight">{symptom.label}</p>
                      <p className="text-[11px] text-slate-450 text-slate-450 mt-1">Suggested Match: {symptom.suggestedService}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Diagnostic Output Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSymptom.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-850 rounded-3xl border border-slate-750 p-6 sm:p-8 shadow-2xl space-y-6 flex flex-col justify-between"
              >
                
                {/* Generated Header */}
                <div className="flex items-start justify-between gap-4 border-b border-slate-700/60 pb-6">
                  <div>
                    <span className="text-[10px] font-bold px-2.5 py-1 bg-cyan-950 text-cyan-400 border border-cyan-800 rounded-full uppercase tracking-wider inline-block">
                      Diagnostic Estimate Ready
                    </span>
                    <h3 className="text-2xl font-extrabold font-display text-white mt-3 leading-tight">
                      Recommended Plan: {selectedSymptom.suggestedService}
                    </h3>
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-700 rounded-2xl shrink-0">
                    <Stethoscope className="w-8 h-8 text-cyan-400" />
                  </div>
                </div>

                {/* Body details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block font-mono">Assigned Dental Specialist</span>
                      <span className="text-white text-base font-bold font-display block mt-1">{selectedSymptom.suggestedDoctor}</span>
                      <span className="text-slate-400 text-xs block leading-relaxed">Top-rated clinical dental surgeon in Surat. No trainee treatment guarantee.</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block font-mono">Procedure Complexity</span>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold font-display mt-2 ${
                        selectedSymptom.complexity === "Mild"
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-800/40"
                          : selectedSymptom.complexity === "Moderate"
                          ? "bg-blue-950 text-blue-400 border border-blue-800/40"
                          : "bg-red-950 text-red-400 border border-red-800/40"
                      }`}>
                        <span className={`w-2 h-2 rounded-full inline-block ${
                          selectedSymptom.complexity === "Mild" ? "bg-emerald-400" : selectedSymptom.complexity === "Moderate" ? "bg-blue-400" : "bg-red-500 animate-pulse"
                        }`} />
                        {selectedSymptom.complexity} treatment scale
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-center">
                    <div>
                      <span className="text-[10px] text-slate-450 uppercase tracking-widest block font-mono font-bold text-center">FEE ESTIMATE (TRANSPARING MATRIX)</span>
                      <span className="text-cyan-400 text-xl font-extrabold font-mono text-center block mt-2 tracking-wide">
                        {selectedSymptom.priceEstimate}
                      </span>
                      <p className="text-[10px] text-slate-500 text-center leading-normal mt-1.5">
                        *Inclusive of state sterilization suite fees, diagnostic digital consult, and autoclave shields. Zero hidden extras.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Priority status alert panel */}
                {selectedSymptom.priorityAlert && (
                  <div className="p-4 bg-slate-900/80 border border-slate-750 rounded-2xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 animate-bounce" />
                    <div>
                      <span className="font-bold text-amber-400 text-xs sm:text-sm font-display">Specialist Medical Comment:</span>
                      <p className="text-slate-400 text-[11px] leading-relaxed mt-1">{selectedSymptom.priorityAlert}</p>
                    </div>
                  </div>
                )}

                {/* Action button routing to Scheduler Form with predetermined state parameters */}
                <div className="pt-4 border-t border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-[11px] text-slate-450 text-slate-500">Want to book this specific combo dynamically?</span>
                  <button
                    id="btn-link-diagnose"
                    onClick={() => onSelectServiceAndDoctor(selectedSymptom.suggestedService, selectedSymptom.suggestedDoctor)}
                    className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all cursor-pointer text-xs sm:text-sm font-display flex items-center justify-center gap-2 group"
                  >
                    <Sparkles className="w-4 h-4 text-slate-950 animate-spin" />
                    <span>Apply Diagnostic recommendation to scheduler</span>
                  </button>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
