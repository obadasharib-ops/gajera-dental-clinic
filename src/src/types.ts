export interface ServiceItem {
  id: string;
  title: string;
  category: "General" | "Cosmetic" | "Surgical" | "Preventive" | "Pediatric";
  icon: string;
  description: string;
  fullDetail: string;
  duration: string;
  seoKeywords: string[];
  preCare: string;
  postCare: string;
  introduction: string;
  benefits: string[];
  procedure: string;
  recoveryInfo: string;
  whyChoose: string;
  image?: string;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  qualifications: string[];
  credentials: string[];
  bio: string;
  availability: string;
  gender: "male" | "female";
  image?: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  rating: number;
  treatment: string;
  location: string;
  comment: string;
  date: string;
  avatar?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "General" | "Treatments" | "Appointments" | "Emergency";
}

export interface Appointment {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  date: string;
  timeSlot: string;
  doctorName: string;
  serviceName: string;
  notes?: string;
  createdAt: string;
  status: "confirmed" | "cancelled" | "pending";
}

export interface LocalArea {
  name: string;
  distInKm: string;
  landmark: string;
}
