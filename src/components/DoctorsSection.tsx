import React from "react";
import { motion } from "motion/react";
import { Award, GraduationCap, CheckCircle2, Phone, Smile, Calendar, Video, Clock, Stethoscope, User } from "lucide-react";
import { DOCTORS } from "../data";
import { trackClickToCall } from "../analytics";

interface DoctorsSectionProps {
  onSelectDoctorForBooking: (doctorName: string) => void;
}

export default function DoctorsSection({ onSelectDoctorForBooking }: DoctorsSectionProps) {
  return (
    <section id="surgeons" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headings */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-emerald-600 font-semibold tracking-wider uppercase text-sm bg-emerald-50 px-4 py-1.5 rounded-full inline-block">
              Expert Clinical Panel
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold font-display text-slate-900 tracking-tight">
              Meet Our Dental Surgeons
            </h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              At Gajera Dental Clinic, our highly qualified dental surgeons pursue ongoing training and utilize modern clinical methods to deliver exceptional diagnostic and cosmetic tooth care in Surat.
            </p>
          </motion.div>
        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {DOCTORS.map((doc, idx) => {
            const isSujit = doc.id === "dr-sujit";
            return (
              <motion.div
                id={`doctor-card-${doc.id}`}
                key={doc.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="flex flex-col bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-slate-100 transition-all justify-between"
              >
                {/* Doctor Professional Portrait Placeholder (No AI/Human Face) */}
                <div className="relative h-80 bg-gradient-to-br from-slate-50 via-cyan-50/20 to-slate-100 flex items-center justify-center overflow-hidden border-b border-slate-150 group">
                  {/* Subtle geometric medical details */}
                  <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#0891b2_1px,transparent_1px)] [background-size:16px_16px]" />
                  <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-cyan-500/5 pointer-events-none filter blur-xl" />
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-emerald-500/5 pointer-events-none filter blur-xl" />

                  {/* Centered Silhouette & Medical Icon Composite */}
                  <div className="relative flex flex-col items-center justify-center text-center p-6 transition-all duration-500 group-hover:scale-105">
                    <div className="relative mb-5 flex items-center justify-center">
                      {/* Stylized Outer Shield Ring */}
                      <div className="absolute inset-0 bg-cyan-100/40 rounded-full animate-pulse" style={{ transform: 'scale(1.4)' }} />
                      <div className="absolute inset-0 bg-emerald-100/30 rounded-full" style={{ transform: 'scale(1.2)' }} />
                      
                      {/* Inner Ring with Medical Icon */}
                      <div className="relative w-24 h-24 rounded-full bg-white shadow-md border border-slate-200/50 flex items-center justify-center text-cyan-600 z-10 transition-transform duration-500 group-hover:rotate-6">
                        <Stethoscope className="w-11 h-11 stroke-[1.25]" />
                      </div>
                      
                      {/* Overlay badge with person silhouette */}
                      <div className="absolute bottom-0 right-0 bg-slate-900 border-2 border-white text-cyan-400 p-2 rounded-full shadow-lg z-20">
                        <User className="w-4 h-4" />
                      </div>
                    </div>
                    
                    {/* Professional Practice Text */}
                    <span className="text-[10px] font-bold tracking-widest text-cyan-700 uppercase bg-cyan-50 border border-cyan-100/60 px-3 py-1 rounded-full">
                      Licensed Surgeon Panel
                    </span>
                  </div>

                  {/* Absolute positioning of doctor details at the bottom of the header */}
                  <div className="absolute bottom-5 left-6 right-6 space-y-1 z-25 text-slate-800">
                    <span className="text-[10px] font-bold px-2.5 py-1 bg-cyan-600/90 text-white rounded-full uppercase tracking-wider inline-block shadow-sm">
                      {doc.qualifications[0]}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold font-display leading-tight text-slate-900 tracking-tight">{doc.name}</h3>
                    <p className="text-xs text-cyan-700 font-semibold">{doc.title}</p>
                  </div>
                </div>

                {/* Doc Specs */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div className="space-y-6">
                    {/* Bio */}
                    <p className="text-slate-600 text-sm leading-relaxed italic">
                      "{doc.bio}"
                    </p>

                    {/* Qualifications & Certifications */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4 text-cyan-600" />
                        <span>Credentials & Specializations</span>
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {doc.qualifications.map((qual) => (
                          <span
                            key={qual}
                            className="text-xs font-medium px-2.5 py-1 bg-cyan-50 text-cyan-800 rounded-lg border border-cyan-100/60"
                          >
                            {qual}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Full details */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-emerald-600" />
                        <span>Clinical Strengths</span>
                      </h4>
                      <ul className="space-y-2">
                        {doc.credentials.map((cred, cIdx) => (
                          <li key={cIdx} className="flex items-start gap-2 text-xs text-slate-650">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{cred}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Work Hours */}
                    <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200">
                      <div className="flex items-center gap-2 text-slate-700 font-semibold text-xs mb-1">
                        <Clock className="w-3.5 h-3.5 text-cyan-600 animate-pulse" />
                        <span>Attending Hours</span>
                      </div>
                      <p className="text-[11px] text-slate-600 font-mono">
                        {doc.availability}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-8 pt-6 border-t border-slate-200 flex items-center gap-3">
                    <button
                      id={`btn-book-doc-${doc.id}`}
                      onClick={() => onSelectDoctorForBooking(doc.name)}
                      className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer text-center"
                    >
                      Book with {doc.name.split(" ")[1]}
                    </button>
                    <a
                      href="tel:9016198281"
                      onClick={() => trackClickToCall("9016198281", `Doctor card inquiry: ${doc.name}`)}
                      className="p-3 bg-slate-200 text-slate-700 hover:bg-slate-300 rounded-xl transition-all"
                      title="Direct Clinical Inquiry"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
