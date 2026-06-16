import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  Clock,
  User,
  Phone,
  BriefcaseMedical,
  MessageSquare,
  CheckCircle,
  FileSpreadsheet,
  X,
  MapPin,
  Trash2,
  CalendarCheck2,
  AlertTriangle,
  Stethoscope,
  Sparkles
} from "lucide-react";
import { DOCTORS, DISCOVER_SERVICES, TIME_SLOTS, CLINIC_NAME } from "../data";
import { Appointment } from "../types";
import { trackClickToCall, trackContactFormSubmit, trackAppointmentBooking } from "../analytics";

interface BookingModuleProps {
  selectedServiceFromParent: string;
  onClearSelectedService: () => void;
  selectedDoctorFromParent?: string;
  onClearSelectedDoctor?: () => void;
}

export default function BookingModule({
  selectedServiceFromParent,
  onClearSelectedService,
  selectedDoctorFromParent = "",
  onClearSelectedDoctor
}: BookingModuleProps) {
  // Local state for user's stored appointments
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Form Fields Mode Toggle
  const [formMode, setFormMode] = useState<"appointment" | "message">("appointment");

  // Common Form Fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  // Appointment Specific Form Fields
  const [serviceName, setServiceName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [notes, setNotes] = useState("");

  // Message Inquiry Specific Form Fields
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [messageSuccessMsg, setMessageSuccessMsg] = useState(false);

  // UI state
  const [errorMsg, setErrorMsg] = useState("");
  const [successTicket, setSuccessTicket] = useState<Appointment | null>(null);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("gajera_dental_appointments");
      if (stored) {
        setAppointments(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load appointments", e);
    }
  }, []);

  // Sync inputs with parent requests
  useEffect(() => {
    if (selectedServiceFromParent) {
      setServiceName(selectedServiceFromParent);
    }
  }, [selectedServiceFromParent]);

  useEffect(() => {
    if (selectedDoctorFromParent) {
      setDoctorName(selectedDoctorFromParent);
    }
  }, [selectedDoctorFromParent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Validation
    if (!fullName.trim()) return setErrorMsg("Please provide patient name.");
    if (!phone.trim() || phone.length < 10) return setErrorMsg("Please enter a valid 10-digit Indian mobile number.");
    if (!serviceName) return setErrorMsg("Please select a physical treatment service.");
    if (!doctorName) return setErrorMsg("Please choose your attending Dental Surgeon.");
    if (!selectedDate) return setErrorMsg("Please select a convenient clinical appointment date.");
    
    // Explicit clinical Sunday closing enforcement
    const dateObj = new Date(selectedDate);
    if (dateObj.getDay() === 0) {
      return setErrorMsg("Gajera Dental Clinic is CLOSED on Sundays. Please select a dynamic weekday appointment date from Monday to Saturday.");
    }

    if (!selectedSlot) return setErrorMsg("Please select an available daily session time slot.");

    const newAppointment: Appointment = {
      id: "gda-" + Math.random().toString(36).substr(2, 9),
      fullName: fullName.trim(),
      phone: phone.trim(),
      date: selectedDate,
      timeSlot: selectedSlot,
      doctorName,
      serviceName,
      notes: notes.trim() || undefined,
      createdAt: new Date().toISOString(),
      status: "confirmed"
    };

    // Save
    const updated = [newAppointment, ...appointments];
    setAppointments(updated);
    localStorage.setItem("gajera_dental_appointments", JSON.stringify(updated));

    // Track Appointment Booking
    trackAppointmentBooking(serviceName, doctorName, selectedDate, selectedSlot);

    // Show success ticket
    setSuccessTicket(newAppointment);

    // Clear form
    setFullName("");
    setPhone("");
    setNotes("");
    setSelectedSlot("");
    setSelectedDate("");
  };

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setMessageSuccessMsg(false);

    if (!fullName.trim()) return setErrorMsg("Please provide your name.");
    if (!phone.trim() || phone.length < 10) return setErrorMsg("Please enter a valid 15-digit number.");
    if (!contactMessage.trim()) return setErrorMsg("Please write your dental question or request.");

    setMessageSuccessMsg(true);
    
    // Track contact form message submission
    trackContactFormSubmit(contactSubject, fullName);

    setContactEmail("");
    setContactSubject("");
    setContactMessage("");
    setFullName("");
    setPhone("");

    setTimeout(() => {
      setMessageSuccessMsg(false);
    }, 7000);
  };

  const handleCancelAppointment = (id: string) => {
    const updated = appointments.map((apt) => 
      apt.id === id ? { ...apt, status: "cancelled" as const } : apt
    );
    setAppointments(updated);
    localStorage.setItem("gajera_dental_appointments", JSON.stringify(updated));
  };

  const handleClearAllHistory = () => {
    if (window.confirm("Do you want to clear your stored appointment history?")) {
      setAppointments([]);
      localStorage.removeItem("gajera_dental_appointments");
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Visual Accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-900 rounded-full mix-blend-color-dodge filter blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-900 rounded-full mix-blend-color-dodge filter blur-3xl opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-400 font-semibold tracking-wider uppercase text-sm bg-blue-950 border border-blue-800 px-4 py-1.5 rounded-full inline-block">
            Secure Patient Portal
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-white">
            Schedule Your Priority Consultation
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Book securely with Dr. Sujit Gajera and colleagues. Experience high-precision digital dental treatments in Nana Varachha, Surat with near-zero wait times.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Appointment Scheduler & Contact Form - Left Column */}
          <div className="lg:col-span-7 bg-slate-800 rounded-3xl border border-slate-700/60 p-6 sm:p-8 shadow-2xl">
            {/* Elegant Tab Switcher */}
            <div className="flex border-b border-slate-700/60 mb-6 font-display text-sm">
              <button
                id="tab-mode-appointment"
                type="button"
                onClick={() => { setFormMode("appointment"); setErrorMsg(""); }}
                className={`flex-1 pb-3 text-center border-b-2 font-bold transition-all cursor-pointer ${
                  formMode === "appointment"
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                📅 Appointment Scheduler
              </button>
              <button
                id="tab-mode-message"
                type="button"
                onClick={() => { setFormMode("message"); setErrorMsg(""); }}
                className={`flex-1 pb-3 text-center border-b-2 font-bold transition-all cursor-pointer ${
                  formMode === "message"
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                ✉️ Contact & General Inquiry
              </button>
            </div>

            {errorMsg && (
              <div className="mb-6 p-4 bg-red-950/80 border border-red-800/80 text-red-200 rounded-2xl flex items-start gap-3 text-sm">
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-red-400" />
                <p>{errorMsg}</p>
              </div>
            )}

            {messageSuccessMsg && (
              <div className="mb-6 p-4 bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs rounded-2xl flex items-start gap-3">
                <CheckCircle className="w-5 h-5 shrink-0 mt-0.5 text-emerald-400 animate-bounce" />
                <div>
                  <p className="font-bold text-white text-sm">Message Inquiry Received!</p>
                  <p className="mt-1">Thank you for contacting Dr. Sujit Gajera and colleagues. Our clinical coordination desk will review your question and text or call you at the provided mobile number shortly.</p>
                </div>
              </div>
            )}

            {formMode === "appointment" ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-blue-400" />
                      <span>Patient Name</span>
                    </label>
                    <input
                      id="patient-name-input"
                      type="text"
                      required
                      placeholder="Enter full legal name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                    />
                  </div>

                  {/* Mobile Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-blue-400" />
                      <span>Mobile Number</span>
                    </label>
                    <input
                      id="patient-phone-input"
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">Staff will contact for verification.</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Select Service */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <Stethoscope className="w-3.5 h-3.5 text-blue-400" />
                      <span>Requested Service</span>
                    </label>
                    <div className="relative">
                      <select
                        id="patient-service-select"
                        required
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all appearance-none text-slate-100"
                      >
                        <option value="" disabled>-- Choose Treatment --</option>
                        {DISCOVER_SERVICES.map((s) => (
                          <option key={s.id} value={s.title}>{s.title}</option>
                        ))}
                      </select>
                      {selectedServiceFromParent && (
                        <button
                          type="button"
                          id="clear-parent-svc"
                          onClick={onClearSelectedService}
                          className="absolute right-8 top-3 text-[10px] bg-blue-950 text-blue-400 border border-blue-800 px-1.5 py-0.5 rounded-md"
                        >
                          Default
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Select Doctor */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-blue-400" />
                      <span>Attending Dentist</span>
                    </label>
                    <div className="relative">
                      <select
                        id="patient-doctor-select"
                        required
                        value={doctorName}
                        onChange={(e) => setDoctorName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all appearance-none text-slate-100 font-sans"
                      >
                        <option value="" disabled>-- Select Doctor --</option>
                        {DOCTORS.map((doc) => (
                          <option key={doc.id} value={doc.name}>{doc.name} ({doc.qualifications[1] || "Surgeon"})</option>
                        ))}
                      </select>
                      {selectedDoctorFromParent && onClearSelectedDoctor && (
                        <button
                          type="button"
                          id="clear-parent-doc"
                          onClick={onClearSelectedDoctor}
                          className="absolute right-8 top-3 text-[10px] bg-blue-950 text-blue-400 border border-blue-800 px-1.5 py-0.5 rounded-md"
                        >
                          Default
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Date selection & Time Slots */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      <span>Clinical Date Selection</span>
                    </label>
                    <input
                      id="patient-date-input"
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full sm:max-w-xs bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all text-slate-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      <span>Select Time Slot</span>
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 max-h-48 overflow-y-auto p-1 bg-slate-900 rounded-xl border border-slate-700">
                      {TIME_SLOTS.map((slot) => {
                        const isSelected = selectedSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            id={`time-btn-${slot.replace(/\s+/g, "").toLowerCase()}`}
                            onClick={() => setSelectedSlot(slot)}
                            className={`py-2 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                              isSelected
                                ? "bg-blue-600 text-white font-bold scale-105"
                                : "bg-slate-800 text-slate-300 hover:bg-slate-755 border border-slate-700/60"
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Patient Notes */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                    <span>Notes / Dental Pain Symptoms (Optional)</span>
                  </label>
                  <textarea
                    id="patient-notes-input"
                    rows={2}
                    placeholder="Tell us if you are feeling throbbing pressure, cold sensitivity, swelling, or have historical checkup notes..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                  />
                </div>

                {/* Submit Button */}
                <button
                  id="submit-appointment-btn"
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all text-sm sm:text-base font-display flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-white animate-pulse" />
                  <span>Secure Clinical Booking Now</span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleMessageSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-blue-400" />
                      <span>Full Name</span>
                    </label>
                    <input
                      id="contact-name-input"
                      type="text"
                      required
                      placeholder="Your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                    />
                  </div>

                  {/* Mobile Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-blue-400" />
                      <span>Mobile Number</span>
                    </label>
                    <input
                      id="contact-phone-input"
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      ✉️
                      <span>Email Address (Optional)</span>
                    </label>
                    <input
                      id="contact-email-input"
                      type="email"
                      placeholder="e.g. name@domain.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      ❓
                      <span>Subject of Inquiry</span>
                    </label>
                    <input
                      id="contact-subject-input"
                      type="text"
                      placeholder="e.g. Bleaching Cost, Kids dentistry setup"
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                    />
                  </div>
                </div>

                {/* Message Body */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                    <span>Your Message / Clinical Question</span>
                  </label>
                  <textarea
                    id="contact-message-input"
                    required
                    rows={4}
                    placeholder="Type your question or request in detail. Mention if you represent a patient family..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                  />
                </div>

                {/* Submit Inquiry Button */}
                <button
                  id="submit-inquiry-btn"
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all text-sm sm:text-base font-display flex items-center justify-center gap-2 cursor-pointer"
                >
                  ✉️
                  <span>Send Secure Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Stored Appointments & Dynamic Success State - Right Column */}
          <div className="lg:col-span-5 space-y-8">
            {/* Conversion Boosting High-Trust Consultation Banner */}
            <div className="bg-slate-800 rounded-3xl border border-slate-705/60 overflow-hidden shadow-2xl group">
              <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fm=webp&fit=crop&q=75&w=480&h=320"
                  alt="Certified dentist in Surat outlining professional treatment blueprint and tooth implants design - Gajera Dental Clinic"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-102 transition-all duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
              </div>
              <div className="p-6 space-y-2">
                <h4 className="text-lg font-bold font-display text-white">Transparent, Patient-Guided Care</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every crown rehabilitation and smile makeover blueprint at our clinic is modeled using pre-diagnostic previews first, ensuring absolute predictability and comfort.
                </p>
              </div>
            </div>

            {/* Dynamic Success Ticket */}
            <AnimatePresence>
              {successTicket && (
                <motion.div
                  id="success-ticket-card"
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-emerald-950 border border-emerald-800/80 rounded-3xl p-6 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-800 rounded-full mix-blend-screen filter blur-2xl opacity-30 pointer-events-none" />
                  <button
                    id="close-ticket-btn"
                    onClick={() => setSuccessTicket(null)}
                    className="absolute right-4 top-4 text-emerald-400 hover:text-white p-1 hover:bg-emerald-900 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-3 text-emerald-400 mb-4">
                    <CheckCircle className="w-6 h-6 animate-bounce" />
                    <span className="font-bold text-sm tracking-widest uppercase">Appointment Registered!</span>
                  </div>

                  <h4 className="text-xl font-bold text-white font-display">Gajera Digital Dental Pass</h4>
                  <p className="text-xs text-emerald-300 mt-1">Please secure a screenshot of this receipt on your device.</p>

                  <div className="mt-6 border-t border-dashed border-emerald-800/80 pt-4 space-y-3 font-mono text-xs text-emerald-100">
                    <div className="flex justify-between">
                      <span className="text-emerald-400">PATIENT:</span>
                      <span className="text-white font-bold">{successTicket.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-400">PHONE:</span>
                      <span className="text-white">{successTicket.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-400">TREATMENT:</span>
                      <span className="text-white font-semibold">{successTicket.serviceName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-400">CLINICIAN:</span>
                      <span className="text-white">{successTicket.doctorName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-400">SCHEDULE:</span>
                      <span className="text-white font-bold bg-emerald-900/40 px-2 py-0.5 rounded border border-emerald-700/55">{successTicket.date} @ {successTicket.timeSlot}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-400">CENTER:</span>
                      <span className="text-white">101, Gokulam Arkade, Surat</span>
                    </div>
                  </div>

                  <div className="mt-6 p-3 bg-emerald-900/40 rounded-xl border border-emerald-800/80 text-center">
                    <p className="text-[11px] text-emerald-200">
                      Show this pass at registration desk. Friendly clinical coordinator will verify via <strong>9016198281</strong>.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Existing Scheduled Appointments List */}
            <div className="bg-slate-800/50 rounded-3xl border border-slate-700/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold font-display text-white flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-blue-400" />
                  <span>My Booking Records ({appointments.length})</span>
                </h4>
                {appointments.length > 0 && (
                  <button
                    id="clear-all-apt-btn"
                    onClick={handleClearAllHistory}
                    className="text-[10px] text-slate-400 hover:text-red-400 transition-colors uppercase font-mono tracking-widest cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {appointments.length === 0 ? (
                <div className="text-center py-10 bg-slate-900/30 rounded-2xl border border-dashed border-slate-700 p-6">
                  <p className="text-xs text-slate-400 leading-relaxed">
                    No clinical appointments hosted on this device yet. Select a doctor or service below and submit the form to book!
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[30rem] overflow-y-auto pr-1">
                  {appointments.map((apt) => (
                    <div
                      key={apt.id}
                      id={`stored-apt-card-${apt.id}`}
                      className={`p-4 rounded-2xl border transition-all text-xs ${
                        apt.status === "cancelled"
                          ? "bg-slate-900/40 border-slate-800 opacity-60"
                          : "bg-slate-900/80 border-slate-700/60"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-white tracking-wide">{apt.fullName}</span>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono capitalize ${
                              apt.status === "confirmed"
                                ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                                : "bg-slate-950 text-slate-400 border border-slate-800"
                            }`}
                          >
                            {apt.status}
                          </span>
                          {apt.status === "confirmed" && (
                            <button
                              id={`cancel-apt-btn-${apt.id}`}
                              onClick={() => handleCancelAppointment(apt.id)}
                              title="Cancel appointment"
                              className="text-slate-500 hover:text-red-400 p-1 rounded-md hover:bg-slate-800 transition-all cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 mt-2 font-mono">
                        <div>
                          <span className="text-slate-500">Service:</span> <span className="text-slate-350">{apt.serviceName}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Doctor:</span> <span className="text-slate-350">{apt.doctorName}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-slate-500">Date/Time:</span> <span className="text-blue-400">{apt.date} @ {apt.timeSlot}</span>
                        </div>
                      </div>

                      {apt.notes && (
                        <p className="mt-2 text-[10px] text-slate-400 border-t border-slate-800 pt-2 italic line-clamp-1">
                          " {apt.notes} "
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick contact details sidebar widget */}
            <div className="bg-gradient-to-br from-blue-900/30 to-slate-900/80 border border-blue-800/20 p-6 rounded-3xl">
              <h5 className="font-bold font-display text-white text-sm">Need Help with Scheduling?</h5>
              <p className="text-[11px] text-slate-300 mt-1">Our clinical desk is available to assist you in Gujarati, Hindi, and English.</p>
              <div className="mt-4 space-y-2">
                <a
                  href="tel:9016198281"
                  onClick={() => trackClickToCall("9016198281", "Booking Desk Helper: Sujit")}
                  className="flex items-center gap-2 text-xs text-blue-300 hover:text-blue-200 transition-all font-mono"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Sujit: +91 90161 98281</span>
                </a>
                <a
                  href="tel:09426151688"
                  onClick={() => trackClickToCall("09426151688", "Booking Desk Helper: Twinkal")}
                  className="flex items-center gap-2 text-xs text-blue-300 hover:text-blue-200 transition-all font-mono"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Twinkal: +91 94261 51688</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
