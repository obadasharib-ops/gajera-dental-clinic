import React from "react";
import { motion } from "motion/react";
import { ShieldCheck, Heart, Sparkles, Award } from "lucide-react";
import clinicSafetyImg from "../assets/images/gajera_clinic_active_treatment_1781095660995.png";

export default function AboutClinicSection() {
  const highlights = [
    {
      icon: ShieldCheck,
      title: "Gold-Standard Sterilization",
      description: "We employ multi-phase clinical autoclaves and chemical integration sweeps to guarantee a 100% sterile and worry-free patient environment."
    },
    {
      icon: Sparkles,
      title: "Invisalign & Smile Designing",
      description: "Through modern high-definition intraoral scans and diagnostic visuals, preview your redesigned smile symmetry before your treatment even begins."
    },
    {
      icon: Heart,
      title: "Empathetic Pediatric Care",
      description: "Our gentle pediatric dentists Dr. Nensi Savani and colleagues specialize in keeping anxious children calm, comfortable, and excited to learn about oral health."
    },
    {
      icon: Award,
      title: "Certified Implantology Node",
      description: "Headed by Dr. Sujit Gajera, we offer advanced premium titanium implants to permanently restore chewing dynamics and natural tooth aesthetics."
    }
  ];

  return (
    <section id="about" className="py-20 sm:py-24 bg-white relative overflow-hidden">
      {/* Background soft blur accent */}
      <div className="absolute top-10 left-0 w-80 h-80 bg-blue-50 rounded-full filter blur-3xl opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          
          {/* Left Block: Narrative/Copywriting Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm bg-blue-50 px-4 py-1.5 rounded-full inline-block">
              About Gajera Dental Clinic
            </span>
            
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display tracking-tight leading-tight">
              A Legacy of Trust, Precision, and Radiant Smiles in Surat
            </h2>
            
            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                Established with a vision to redefine family dental care, <strong>Gajera Dental Clinic</strong> represents the pinnacle of modern multi-specialty clinical dentistry. Located at <strong>101, Gokulam Arkade, Sarthana Jakatnaka, Nana Varachha</strong>, our clinic serves as Surat's premier wellness node where surgical precision meets state-of-the-art diagnostic technologies.
              </p>
              <p>
                Led by the collaborative synergy of <strong>Dr. Sujit Gajera</strong> (Certi. Implantologist & Smile Designer), <strong>Dr. Twinkal T Munjani</strong> (Certi. Cosmetic Dentist), and family specialist <strong>Dr. Nensi Savani</strong>, we provide 18 specialized dental services under one highly hygienic framework. 
              </p>
              <p>
                By strictly omitting generic formulas, we craft customized, pain-free dental preservation models tailored to each patient's age and unique oral profile. From digital low-radiation radiography systems to advanced soft-tissue laser sterilization, we continuously update our facility to meet leading global healthcare matrices.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-6">
              <div>
                <span className="text-3xl font-black text-blue-600 block font-mono">100%</span>
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Custom Care Plans</span>
              </div>
              <div className="border-l border-slate-200 pl-6">
                <span className="text-3xl font-black text-blue-600 block font-mono">Zero</span>
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Hidden Costs Guarantee</span>
              </div>
            </div>
          </div>

          {/* Right Block: Premium Multi-Image Bento Layout of Physical Clinic */}
          <div className="lg:col-span-6 grid grid-cols-12 gap-4">
            {/* Tall Main Lobby/Reception image */}
            <div className="col-span-7 h-[30rem] rounded-3xl overflow-hidden shadow-md border border-slate-100 group">
              <img
                src={clinicSafetyImg}
                alt="Gajera Dental Clinic Back to work with safety protocols Surat Gujarat"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
            </div>

            {/* Stacked treatment and diagnostic rooms images */}
            <div className="col-span-5 flex flex-col gap-4">
              <div className="h-[14.5rem] rounded-2xl overflow-hidden shadow-sm border border-slate-100 group">
                <img
                  src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fm=webp&fit=crop&q=75&w=400&h=290"
                  alt="State-of-the-art sterile implant surgical suite in Surat Dentist Office"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>
              <div className="h-[14.5rem] rounded-2xl overflow-hidden shadow-sm border border-slate-100 group">
                <img
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fm=webp&fit=crop&q=75&w=400&h=290"
                  alt="Modern orthodontic digital scan consultation room of Gajera Dental Clinic Surat"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Highlights Row underneath images */}
        <div className="mt-20 pt-10 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                id={`about-highlight-${idx}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 bg-slate-50 rounded-2xl border border-slate-100/80 hover:border-blue-200 hover:bg-white hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl inline-block">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-display">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
