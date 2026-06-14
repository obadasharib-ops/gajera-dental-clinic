import { ServiceItem, Doctor, Testimonial, FAQItem, LocalArea } from "./types";

export const CLINIC_NAME = "GAJERA DENTAL CLINIC";

export const CONTACT_NUMBERS = [
  { display: "90161 98281", value: "9016198281" },
  { display: "094261 51688", value: "09426151688" }
];

export const ADDRESS = {
  line1: "101, Gokulam Arkade, Sarthana Jakatnaka",
  line2: "Nana Varachha, Surat, Gujarat",
  zip: "395013",
  coordinates: { lat: 21.2330, lng: 72.8986 } // Surat coordinates for reference
};

export const ALIAS_AREAS: LocalArea[] = [
  { name: "Sarthana Jakatnaka", distInKm: "0.2 km", landmark: "Near Gokulam Arkade" },
  { name: "Nana Varachha", distInKm: "1.2 km", landmark: "Varachha Main Rd" },
  { name: "Mota Varachha", distInKm: "4.5 km", landmark: "Abramba Road Connecting Link" },
  { name: "Kamrej", distInKm: "6.0 km", landmark: "NH-48 Access Corridor" },
  { name: "Simada Gam", distInKm: "2.1 km", landmark: "Canal Road Junction" },
  { name: "Puna Gam", distInKm: "3.8 km", landmark: "Kargil Chowk" },
  { name: "Yogi Chowk", distInKm: "2.5 km", landmark: "Commercial hub of Varachha" }
];

export const DOCTORS: Doctor[] = [
  {
    id: "dr-sujit",
    name: "Dr. Sujit Gajera",
    title: "Senior Dental Surgeon & Implantologist",
    qualifications: ["Dental Surgeon", "M.I.D.A", "Certi. Implantologist", "Certi. Smile Design Specialist"],
    credentials: [
      "Member of Indian Dental Association (MIDA)",
      "Certified Oral Implantologist",
      "Specialist in Aesthetic & Digital Smile Designing"
    ],
    bio: "Dr. Sujit Gajera has years of rich clinical experience in dental restorations, complex implant surgeries, and cosmetic smile designs. He combines technical precision with a gentle touch to handle advanced clinical scenarios and restore natural, radiant smiles for all ages.",
    availability: "Mon - Sat: 9:30 AM - 1:00 PM, 5:00 PM - 8:30 PM (Sunday Closed)",
    gender: "male",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fm=webp&fit=crop&q=75&w=400&h=500"
  },
  {
    id: "dr-twinkal",
    name: "Dr. Twinkal T Munjani",
    title: "Cosmetic Dentist & Restorative Specialist",
    qualifications: ["Dental Surgeon", "Certi. Cosmetic Dentist"],
    credentials: [
      "Expert in Cosmetic & Conservative Restorations",
      "Certified Digital Smile Designer",
      "Micro-dentistry and Kids Teeth Expert"
    ],
    bio: "Dr. Twinkal T Munjani is celebrated for her artistic vision in dental bonding, tooth-colored restorations, and full smile makeovers. She utilizes state-of-the-art procedures to enhance symmetry, form, and radiance, making dental visits incredibly comforting.",
    availability: "Mon - Sat: 9:30 AM - 1:00 PM, 5:00 PM - 8:30 PM (Sunday Closed)",
    gender: "female",
    image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fm=webp&fit=crop&q=75&w=400&h=500"
  },
  {
    id: "dr-nensi",
    name: "Dr. Nensi Savani",
    title: "Dental Surgeon & Family Dentist",
    qualifications: ["Dental Surgeon"],
    credentials: [
      "Specialist in Preventive & Family Dentistry",
      "Expert in Endodontic & Restorative Care",
      "Dedicated Oral Health Educator"
    ],
    bio: "Dr. Nensi Savani focuses on therapeutic dental checkups, pain-free extractions, root canal therapies, and preventative check-ups. She is extremely passionate about early detection, child-friendly checkups, and maintaining strong natural teeth for life.",
    availability: "Mon - Sat: 9:30 AM - 1:00 PM, 5:00 PM - 8:30 PM (Sunday Closed)",
    gender: "female",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fm=webp&fit=crop&q=75&w=400&h=500"
  }
];

export const TIME_SLOTS = [
  "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM"
];

export const DISCOVER_SERVICES: ServiceItem[] = [
  {
    id: "teeth-whitening",
    title: "Teeth whitening",
    category: "Cosmetic",
    icon: "Sparkles",
    description: "Brighten your smile safely and effectively by removing tough stains and discoloration.",
    fullDetail: "Professional teeth whitening is a highly sought-after aesthetic treatment at Gajera Dental Clinic. Using advanced gentle bleaching gels activated by optimal wavelengths of light, we can lift years of stains caused by tea, coffee, tobacco, and natural aging process. The procedure provides immediate, visible results in just a single 45-minute visit.",
    duration: "45 minutes",
    seoKeywords: ["Teeth whitening Sarthana Jakatnaka", "Laser Whitening Surat", "Smile Brightening Varachha"],
    preCare: "Avoid acidic foods 24 hours prior. Brush and floss your teeth.",
    postCare: "Avoid colored beverages (coffee, red wine) and smoking for 48 hours.",
    introduction: "A professional-grade cosmetic treatment designed to safely eliminate stubborn dental stains and revert severe tooth discoloration back to a natural, dazzling white.",
    benefits: [
      "Lifts years of stains caused by tea, coffee, tobacco, and natural aging in just a single visit.",
      "Utilizes clinical-grade gentle whitening agents that protect sensitive tooth enamel.",
      "Provides immediate, uniform shade improvement visible as soon as you step off the chair.",
      "Long-lasting results that boost your self-confidence in social and corporate settings."
    ],
    procedure: "First, we clean your teeth to remove superficial plaque. Then, a protective barrier is applied to your gums. Next, we paint a specialized hydrogen peroxide gel onto your teeth and activate it using a calibrated blue LED light. We repeat this in short 15-minute cycles until your goal shade is unlocked.",
    recoveryInfo: "You might experience mild thermal sensitivity to cold or hot beverages for 24-48 hours. We recommend using a desensitizing paste and avoiding heavily pigmented foods (tea, turmeric, soy sauce) during the white diet window of the first 48 hours.",
    whyChoose: "Dr. Twinkal Munjani combines artist-level shade matching with protective enamel barriers, ensuring your whitening doesn't trigger painful post-treatment sensitivity."
  },
  {
    id: "bonding",
    title: "Bonding",
    category: "Cosmetic",
    icon: "Layers",
    description: "Repair chipped, cracked, or misaligned teeth using high-grade composite materials.",
    fullDetail: "Dental bonding involves applying a specialized tooth-colored composite resin to repair decay, chips, cracks, or minor fractures. It holds exceptional aesthetic versatility, allowing our cosmetic dentists Dr. Twinkal and Dr. Sujit to reshape teeth and seal gaps artistically. The composite is carefully sculpted and cured instantly with a specialized UV light.",
    duration: "30 - 60 mins per tooth",
    seoKeywords: ["Composite bonding Nana Varachha", "Dental bonding Surat", "Chipped tooth repair Gujarat"],
    preCare: "Regular clean teeth initialization.",
    postCare: "Avoid biting extremely hard objects or ice to protect the composite.",
    introduction: "A simple, highly aesthetic treatment where a tooth-colored composite resin is sculpted onto damaged teeth to seamlessly repair chips, close gaps, or restore structural symmetry.",
    benefits: [
      "Extremely conservative treatment that requires virtually zero shaving of natural enamel.",
      "Completed entirely in a single appointment, saving you multiple clinical visits.",
      "Perfectly color-matched to blend invisibly with your surrounding natural teeth.",
      "An affordable, high-impact alternative to veneers for minor cosmetic imperfections."
    ],
    procedure: "The doctor prepares the tooth surface with a gentle conditioning liquid to help the composite adhere. We select a resin shade matching your tooth, apply it in layers, sculpt it meticulously to the desired shape, and harden it using a high-intensity curing light. Finally, we polish it to a natural, glossy sheen.",
    recoveryInfo: "There is zero downtime, and you can resume normal functions immediately. Avoid biting into extremely hard objects (like ice or hard candy) with the bonded tooth, and maintain standard brushing and flossing.",
    whyChoose: "Dr. Twinkal Munjani utilizes premium multi-shade composite layering, ensuring the light reflects off the repaired tooth exactly like a natural, living tooth."
  },
  {
    id: "check-ups",
    title: "Check-ups",
    category: "Preventive",
    icon: "SearchCheck",
    description: "Comprehensive oral exams to diagnose, prevent, and treat dental issues early.",
    fullDetail: "Regular dental check-ups are the cornerstone of long-term oral vitality. At Gajera Dental Clinic, we conduct highly thorough examinations of your teeth, gums, and oral structures. Using digital x-rays when needed, we screen for signs of cavities, gum disease, and other early abnormalities to avoid complex surgeries down the road.",
    duration: "20 - 30 minutes",
    seoKeywords: ["Dental check-up Sarthana Jakatnaka", "Gajera Dental Clinic exam", "Best dentist Surat checkup"],
    preCare: "Bring records of previous clinical treatments if any.",
    postCare: "Schedule your next preventive routine exam in 6 months.",
    introduction: "A thorough, multi-point examination of your teeth, gums, and oral cavity designed to intercept microscopic decay, evaluate gum health, and prevent complex future conditions.",
    benefits: [
      "Saves you from severe toothaches and emergency surgeries through early detection.",
      "Includes early oral cancer screenings and evaluations of old restorations.",
      "Interprets sub-gingival health with digital, low-radiation diagnostic imaging.",
      "Creates a highly customized, proactive roadmap for your family's lifelong dental health."
    ],
    procedure: "The dentist reviews your dental history, performs a physical examination of each tooth using micro-mirrors, checks your gum pocket depths for periodontal disease, and inspects oral soft tissues. If necessary, quick low-radiation digital X-rays are taken to scan between your teeth.",
    recoveryInfo: "There is no recovery required. You will leave with a clear, honest understanding of your oral health and can immediately return to your daily schedule in Surat.",
    whyChoose: "Dr. Nensi Savani provides comprehensive, unhurried diagnostics with absolute clarity, ensuring every patient is fully educated with visual scans rather than rushed through treatment."
  },
  {
    id: "cosmetic-procedures",
    title: "Cosmetic procedures",
    category: "Cosmetic",
    icon: "Smile",
    description: "Modern customized smile makeovers utilizing the state-of-the-art diagnostic designs.",
    fullDetail: "Led by certified Smile Design specialist Dr. Sujit and cosmetic expert Dr. Twinkal, our advanced cosmetic procedures combine multiple disciplines. From gum recontouring to aesthetic spacing, we craft a personalized plan using digital mock-ups that harmonize with your unique facial features.",
    duration: "Varies by treatment",
    seoKeywords: ["Cosmetic dentist Surat", "Smile design specialist Varachha", "Gajera cosmetic smile makeover"],
    preCare: "Detailed visual mapping consultation visit.",
    postCare: "Strict compliance with customized hygiene guide provided.",
    introduction: "An immersive, bespoke smile makeover combining various aesthetic clinical disciplines to transform tooth symmetry, harmony, and balance based on your facial profile.",
    benefits: [
      "Permanently corrects dental alignment, severe discoloration, and structural gaps.",
      "Constructed through advanced digital smile mapping to preview your ideal smile beforehand.",
      "Promotes a vibrant, youthful appearance that matches your unique facial structure.",
      "Restores fully functional biting forces alongside pristine cosmetic excellence."
    ],
    procedure: "We begin with high-definition digital photographs and intraoral scans to build a detailed 3D model of your face and teeth. Together, we preview different shapes and lengths. Once the design is approved, we execute a customized combo of veneers, porcelain crowns, and laser gum contouring.",
    recoveryInfo: "Depending on the specific therapies chosen, recovery can range from immediate normal functioning to a few days of soft diet. We provide fully customized post-care plans to ensure completely pain-free healing.",
    whyChoose: "Led by Dr. Sujit Gajera, a certified Smile Design Specialist, we utilize international facial mapping standards to design custom smiles that look completely natural and radiate health."
  },
  {
    id: "dental-implants",
    title: "Dental implants",
    category: "Surgical",
    icon: "Anchor",
    description: "Permanently replace missing individual teeth or complete jaws with premium titanium anchors.",
    fullDetail: "Dental implants represent the gold standard in modern tooth replacement. Led by expert Implantologist Dr. Sujit, we surgically place medical-grade titanium posts that fuse with the jawbone. These posts act as secure roots for durable hand-crafted ceramic crowns, yielding unparalleled stability, functionality, and facial structure retention.",
    duration: "2 - 3 visits over months",
    seoKeywords: ["Dental implants Sarthana", "Best implantologist Nana Varachha", "Tooth replacement Surat"],
    preCare: "Digital x-ray validation and bone volume analysis.",
    postCare: "Soft food diet for initial healing week, follow sterile wash directions.",
    introduction: "The absolute gold standard of tooth replacement—a biological-grade titanium post placed in the jawbone to permanently replace a missing tooth root and support a natural-looking crown.",
    benefits: [
      "Prevents progressive jawbone loss and preserves youthful, natural facial contours.",
      "Restores 100% natural chewing forces, allowing you to enjoy your favorite foods with ease.",
      "Eliminates the shifting, slipping, and speech difficulties of traditional loose dentures.",
      "Does not require altering, shaving down, or damaging adjacent healthy teeth."
    ],
    procedure: "Using high-definition digital X-rays, Dr. Sujit maps the bone structure. Under gentle local anesthesia, the pure titanium implant post is placed in the jawbone. Over a few months, the bone fuses with the post (osseointegration). Finally, we connect a custom-scanned premium Zirconia crown.",
    recoveryInfo: "Minor swelling and tenderness are easily managed with mild pain-killers for 3-5 days. Patients consume soft, lukewarm foods for the initial 48 hours. The titanium post itself will fuse comfortably over 3-6 months.",
    whyChoose: "Dr. Sujit Gajera is a certified Implantologist trained in global biological implant therapies. He achieves flawless success rates using advanced guided placement techniques."
  },
  {
    id: "dentures-bridges",
    title: "Dentures & bridges",
    category: "General",
    icon: "Grid",
    description: "High-quality custom-crafted partial or complete prosthesis to restore full biting capabilities.",
    fullDetail: "Whether you need a bridge to seamlessly fill a single gap or partial/complete dentures to restore entire arches, we offer premium lightweight biocompatible prosthetics. Our designs focus heavily on natural gum aesthetics, optimized speech, and a highly comfortable custom fit.",
    duration: "2 - 3 appointments",
    seoKeywords: ["Custom dentures Surat", "Dental bridge Varachha", "Affordable dentures Sarthana"],
    preCare: "Full jaw diagnostic impressions.",
    postCare: "Remove dentures at night, clean with specialized soft brush daily.",
    introduction: "Beautifully customized, lightweight prosthetic systems designed to replace multiple missing teeth, restoring full chewing mechanics and restoring facial fullness.",
    benefits: [
      "Fills wide dental gaps to prevent remaining teeth from shifting out of alignment.",
      "Supports facial muscles to prevent a sunken, aged look around the cheeks and mouth.",
      "Drastically enhances pronunciation, speech clarity, and comfortable eating.",
      "Engineered using flexible, ultra-comfortable materials tailored to your gums."
    ],
    procedure: "We take precise intraoral impressions of your remaining teeth and soft gum ridges to establish your bite. These are sent to our laboratory to fabricate a prototype. We test the bite and aesthetic alignment with you in multiple stages before casting the final comfortable prosthesis.",
    recoveryInfo: "New dentures or bridges require a few weeks of adaptation. We suggest starting with softer foods cut into small bites, and practicing reading aloud. Some mild gum irritation is normal and easily adjusted at our clinic.",
    whyChoose: "We offer fully customized, lightweight zirconia bridges and flexible dentures that fit snugly without shifting, restoring your confidence in every smile."
  },
  {
    id: "emergency-care",
    title: "Emergency care",
    category: "Preventive",
    icon: "ShieldAlert",
    description: "Rapid relief for severe toothaches, infections, knocked out teeth, and oral injuries.",
    fullDetail: "Dental crises can occur without warning. Our clinic maintains dedicated slots to accommodate urgent emergencies. If you suffer from a debilitating toothache, abscess, fractured tooth, or a knocked-out tooth, our panel of doctors will provide immediate pain alleviation and therapeutic intervention.",
    duration: "Immediate relief focus",
    seoKeywords: ["Emergency dentist Surat", "24/7 dental pain Sarthana Jakatnaka", "Accidental dental care Varachha"],
    preCare: "Call our emergency numbers 9016198281 immediately; keep any broken tooth in cold clean milk.",
    postCare: "Follow prescribed antibiotic or pain management regimen religiously.",
    introduction: "Immediate, compassionate clinical intervention designed to relieve agonizing dental pain, treat acute infections, or save knocked-out teeth from permanent loss.",
    benefits: [
      "Provides rapid pain relief for throbbing toothaches, abscesses, and fractures.",
      "Protects your blood system from spreading dental infections to other vital organs.",
      "Can permanently save a knocked-out tooth if handled within the golden hour.",
      "Restores safety and complete peace of mind with 24/7 on-call medical support."
    ],
    procedure: "Our emergency team instantly diagnoses the issue using rapid-focus digital X-rays to locate the source of pain or infection. We administer gentle local anesthetic to shut off pain receptors, perform immediate palliative procedures (such as draining an abscess or initiating emergency RCT), and formulate a recovery plan.",
    recoveryInfo: "Varies based on the treatment performed. If an extraction or emergency canal was initiated, you will receive precise care guidelines, soft diet instructions, and pain medication. Most patients experience substantial, immediate relief.",
    whyChoose: "We maintain dedicated clinical slots every single day specifically for emergencies, with direct lines to our surgeons Dr. Sujit (9016198281) and Dr. Twinkal (09426151688)."
  },
  {
    id: "extractions",
    title: "Extractions",
    category: "Surgical",
    icon: "Scissors",
    description: "Safe, painless, and gentle extraction of unsalvageable or deeply decayed teeth.",
    fullDetail: "While preserving natural teeth is our primary focus, severely decayed, broken, or orthodontic crowded teeth may require precision extraction. We perform both standard and surgical extractions (such as impacted wisdom tooth removal) using painless local anesthesia techniques.",
    duration: "30 - 60 minutes",
    seoKeywords: ["Wisdom teeth extraction Surat", "Painless tooth extraction Varachha", "Surgical premium dental extraction"],
    preCare: "Inform our doctor about active blood-thinning medications.",
    postCare: "Maintain bite on cotton gauze for 45 minutes; do not spit or use straws.",
    introduction: "The safe, gentle, and completely painless removal of a tooth that is severely broken, deeply decayed, or impacted, performed to protect your overall oral ecosystem.",
    benefits: [
      "Stops the physical spread of severe dental infections to adjacent healthy teeth.",
      "Relieves agonizing pressure caused by impacted wisdom teeth pushing other teeth.",
      "Paves the way for successful dental implants or clean orthodontic alignments.",
      "Performed using state-of-the-art painless anesthesia extraction protocols."
    ],
    procedure: "The area is completely numbed so that you feel zero pain. The doctor uses highly specialized instruments to gently disengage the tooth fibers from the socket with subtle, twisting forces. For impacted wisdom teeth, a small incision is made in the protective gum tissue for clean removal.",
    recoveryInfo: "Keep the sterile cotton gauze pressed for 45 minutes to encourage a healthy clot. Avoid spitting, drinking through a straw, smoking, or consuming hot foods for the first 24 hours. Eat soft foods like yogurt, and sleep with your head slightly elevated.",
    whyChoose: "Our clinic specializes in 'atraumatic extractions' where bone is preserved, and anxiety is completely dissolved with patient-centered sedation techniques."
  },
  {
    id: "fillings-sealants",
    title: "Fillings and sealants",
    category: "Preventive",
    icon: "Activity",
    description: "Restore cavities with composite fillings and prevent root decay with sealants.",
    fullDetail: "Our premium composite fillings match the exact shade of your tooth for an invisible finish. For deep tooth grooves prone to plaque build-up in school children, we apply durable liquid sealants that harden to create an impenetrable shield against acidic bacteria.",
    duration: "20 - 45 minutes",
    seoKeywords: ["Tooth colored filling Surat", "Dental sealants Varachha", "Cavity repair Gajera clinic"],
    preCare: "Thorough visual detection.",
    postCare: "Avoid eating hard or sticky foods for 2 hours if anesthetic was given.",
    introduction: "Proactive treatments consisting of durable, tooth-colored composite fillings to repair cavities, alongside thin protective sealants to prevent plaque build-up on deep chewing surfaces.",
    benefits: [
      "Arrests tooth decay completely before it can penetrate and damage the underlying nerve.",
      "Tooth-colored composite resins bond directly to teeth, preserving maximum natural tooth structure.",
      "Sealants shield deep, hard-to-clean tooth grooves, especially in young children.",
      "Brings fully restored chewing strength, keeping food from jamming in cavities."
    ],
    procedure: "For fillings, we remove the decayed tooth structure, sterile-wash the cavity, apply the custom-shaded composite, and cure it with a UV light. For sealants, we gently clean the chewing grooves of school-age children, apply a thin medical-grade resin shield, and bond it instantly.",
    recoveryInfo: "You can eat as soon as the local anesthesia wears off, typically within 2 hours. Some mild temperature sensitivity to hot or cold is normal for a few days as the tooth pulp recovers.",
    whyChoose: "We use premium, 100% BPA-free resins that are highly biocompatible and engineered to match your natural tooth's exact color profile."
  },
  {
    id: "laser-dentistry",
    title: "Laser dentistry",
    category: "Surgical",
    icon: "Zap",
    description: "Pain-free soft-tissue therapies and gum sterilization using laser tech.",
    fullDetail: "Laser dentistry is an ultra-modern advance that minimizes bleeding, maximizes safety, and limits the need for stitches. We utilize highly calibrated dental lasers for precise gum reshaping, bacteria elimination in deep periodontal pockets, and pain-free treatments.",
    duration: "20 - 40 minutes",
    seoKeywords: ["Laser dentist Surat", "Painless laser gum therapy Gujarat", "Advanced laser dental Sarthana"],
    preCare: "Comfortable eye-protective laser goggles will be provided.",
    postCare: "Slight cold-rinsing. Minimal down-time expected.",
    introduction: "Advanced, minimally invasive dentistry using calibrated soft-tissue lasers to perform surgical soft-tissue treatments, sterilize pockets, and contour gums with near-zero bleeding.",
    benefits: [
      "Virtually painless procedures that significantly reduce the need for needles or drills.",
      "Maximizes tissue preservation and minimizes bleeding, swelling, and physical trauma.",
      "Promotes incredibly rapid cellular healing, completely eliminating the need for sutures.",
      "Provides gold-standard sterilization as the laser instantly kills surrounding bacteria."
    ],
    procedure: "You are provided with specialized protective eyewear. The clinical laser is focused on the targeted area (such as reshaping an uneven gum line or sterilizing contaminated periodontal pockets). The laser vaporizes damaged cells or bacteria in milliseconds with micro-precision.",
    recoveryInfo: "Healing is exceptionally fast. Patients report almost no post-operative pain or swelling. You can resume your physical routine almost immediately while keeping your meals mild and gentle for 24 hours.",
    whyChoose: "Gajera Dental Clinic is Surat's advanced center for laser therapy, combining state-of-the-art dental lasers with expert surgical handwork."
  },
  {
    id: "mouth-guards",
    title: "Mouth guards",
    category: "Preventive",
    icon: "Activity",
    description: "Premium custom-fit guards to protect teeth from sports impact and night-time grinding (bruxism).",
    fullDetail: "Substandard over-the-counter mouth guards fail to provide uniform protection. At Gajera Dental Clinic, we custom-mold shock-absorbent guards tailored strictly to your dental arch. These provide ultimate protection during intense impact sports or alleviate painful morning jaw tension associated with night grinding.",
    duration: "1 - 2 visits",
    seoKeywords: ["Night guard for bruxism Surat", "Custom sports mouthguard Nana Varachha", "Teeth grinding guards"],
    preCare: "Anatomical impressions of teeth.",
    postCare: "Rinse with cold water after every use, store in ventilated protective case.",
    introduction: "High-performance, custom-molded oral devices designed to cushion teeth from sports-related injuries or protect teeth from severe damage caused by night grinding (bruxism).",
    benefits: [
      "Absorbs and redistributes heavy blows to the face to prevent fractured or knocked-out teeth.",
      "Alleviates chronic morning jaw tension, facial pain, and severe headaches.",
      "Shields tooth enamel from being worn down prematurely by unconscious night grinding.",
      "Custom fit ensures complete comfort, normal breathing, and clear speech."
    ],
    procedure: "The dentist takes highly detailed impressions of your upper and lower arches. These models are mapped on advanced thermoforming equipment to construct a personalized, multi-layered mouth guard from medical-grade, shock-absorbent polymers.",
    recoveryInfo: "There is no recovery required. Simply clean your custom guard with cool water and mild soap after each use, letting it dry in its specialized protective transport case.",
    whyChoose: "Unlike generic, ill-fitting store guards that slide out, our custom-molded guards stay perfectly secured, offering maximum protection and breathing comfort."
  },
  {
    id: "oral-surgery",
    title: "Oral surgery",
    category: "Surgical",
    icon: "Stethoscope",
    description: "Advanced surgical therapies including jaw alignments, soft tissue grafts, and bone rebuilding.",
    fullDetail: "Our surgical unit, spearheaded by Dr. Sujit, handles advanced surgical interventions. This includes surgical management of deep-seated cysts, bone augmentation to prepare for implants, and correction of complex periodontal bone defects under rigorous sterile conditions.",
    duration: "60 - 90 minutes",
    seoKeywords: ["Oral surgeon Surat", "Bone graft dental Sarthana", "Complex jaw surgery Varachha"],
    preCare: "Sterile diagnostics, post-midnight fasting if deep sedation is selected.",
    postCare: "Strict soft, cold diet. Take prescribed medications timely.",
    introduction: "Specialized surgical treatments ranging from bone grafting and cyst removals to complex jaw reformations, managed with strict clinical precision and state-of-the-art technology.",
    benefits: [
      "Rebuilds depleted jaw bone structure to make complex dental implants possible.",
      "Resolves severe chronic jaw joint disorders (TMJ) and eliminates pain permanently.",
      "Removes deep infections, cysts, or impacted teeth before they cause bone erosion.",
      "Performed under strict, hospital-grade sterile protocols to maximize safety."
    ],
    procedure: "Utilizing 3D diagnostic scans, Dr. Sujit Gajera plans the surgical path. The area is thoroughly anesthetized, and tissue is opened with micro-surgical instruments. We remove diseased tissue or place bone grafting materials, and secure the site with micro-sutures.",
    recoveryInfo: "Swelling peaks around 48 hours and gradually resolves. Patients take prescribed anti-inflammatories and antibiotics, apply ice packs periodically, and follow a strict liquid or soft diet for 3 to 7 days.",
    whyChoose: "Led by Dr. Sujit Gajera, a highly trained oral surgeon, our surgical hub employs gold-standard clinical safety shields and autoclave processes to ensure completely worry-free surgeries."
  },
  {
    id: "paediatrics",
    title: "Paediatrics",
    category: "Pediatric",
    icon: "Activity",
    description: "Fun, friendly, and non-threatening dental treatments specifically for developing children.",
    fullDetail: "Early childhood dental experiences dictate lifelong oral habits. Our pediatric specialists use child-friendly vocabulary, positive reinforcement, and colorful setups to make visits deeply engaging. We offer specialized milk-teeth root canal treatments (pulpectomy), fluoride seals, and habit correction advice.",
    duration: "20 - 45 minutes",
    seoKeywords: ["Best kids dentist Surat", "Pediatric dental care Nana Varachha", "Child tooth clinic Sarthana"],
    preCare: "Prepare child in a cheerful, positive light with stories of gentle tooth fairies.",
    postCare: "Reward child non-sugary dental treats; monitor brushing patterns twice daily.",
    introduction: "Warm, gentle, and incredibly fun dental care specifically customized for infants, toddlers, and teenagers to foster excellent oral hygiene habits for life.",
    benefits: [
      "Prevents painful cavities through fluoride applications and cavity sealants.",
      "Monitors jaw and tooth development early to catch habits like thumb-sucking.",
      "Builds fearless, positive relationships with dentists using 'Tell-Show-Do' techniques.",
      "Preserves vital milk teeth to ensure that permanent teeth erupt in proper alignment."
    ],
    procedure: "Our pediatric team uses gentle, child-friendly explanations. We count the child's teeth, clean superficial plaque gently, apply teeth mineralizing fluoride varnishes, or perform child-friendly fillings. We reward every brave little child with a special bravery badge!",
    recoveryInfo: "Children can return to school immediately. If local anesthesia was used, monitor their chewing to prevent them from accidentally biting their numb tongue or lips.",
    whyChoose: "Dr. Nensi Savani creates a magical, stress-free playground atmosphere, taking the fear completely out of children's dentistry."
  },
  {
    id: "root-canals",
    title: "Root canals",
    category: "General",
    icon: "Flame",
    description: "Save deeply decayed or severely infected teeth from extraction with painless therapy.",
    fullDetail: "When decay pierces deep into the tooth's central pulp block, it causes excruciating throbbing pain. Root Canal Treatment (RCT) removes the diseased tissue, disinfects the inner chambers, and seals them with specialized gutta-percha fills. This preserves your natural tooth structure and restores comfortable biting power.",
    duration: "1 - 2 sessions (45m each)",
    seoKeywords: ["Single visit root canal Surat", "Painless RCT Varachha", "Best RCT dentist Sarthana"],
    preCare: "Pre-procedure dental digital x-ray evaluation.",
    postCare: "Avoid direct hard chewing on the treated side until the final protective crown is cemented.",
    introduction: "An advanced therapy designed to clean out painful infections from inside a tooth's root canals, relieving agonizing throbbing sensations and saving the natural tooth from extraction.",
    benefits: [
      "Permanently stops agonizing tooth pain and severe sensitivity to hot and cold.",
      "Saves your natural tooth, avoiding the need for more expensive implants or bridges.",
      "Restores normal, healthy chewing pressure and bite force within days.",
      "Done quickly and painlessly in just 1 to 2 visits using microscopic root-locating tools."
    ],
    procedure: "After thorough numbing, we make a micro-opening in the tooth crown to access the pulp chamber. Using flexible, automated files, we clean and disinfect the micro-root channels. We seal the empty channels with gutta-percha and recommend a protective crown to strengthen it.",
    recoveryInfo: "The outer teeth might feel slightly tender or bruised for 3 to 5 days, which is easily managed with mild anti-inflammatories. Avoid chewing hard foods on that side until the permanent custom crown is placed.",
    whyChoose: "We offer single-visit, computer-controlled Root Canal Treatments that are quick, exceptionally durable, and completely painless."
  },
  {
    id: "teeth-cleaning",
    title: "Teeth cleaning",
    category: "Preventive",
    icon: "Dribbble",
    description: "Advanced ultrasonic scaling and hand-polishing to completely remove built-up plaque and tartar.",
    fullDetail: "Even meticulous daily brushing misses micro-crevices. Our state-of-the-art ultrasonic scaling removes tough yellow tartar blocks, deep plaque colonies, and external superficial stains. We finish with fine professional polishing paste, yielding incredibly clean teeth, healthy firm gums, and minty breath.",
    duration: "30 - 40 minutes",
    seoKeywords: ["Dental cleaning Surat", "Ultrasonic scaling Sarthana Jakatnaka", "Teeth polishing Varachha"],
    preCare: "None. Perfect preventive baseline.",
    postCare: "Avoid intensely staining items for several hours to let teeth settle.",
    introduction: "Advanced professional scaling and polishing utilizing high-frequency ultrasonic tools to safely blast away stubborn plaque, hardened tartar, and ugly yellow stains.",
    benefits: [
      "Completely reverses bleeding gums and prevents destructive gum disease (periodontitis).",
      "Instantly eliminates embarrassing bad breath by removing hidden deep bacteria.",
      "Safely polishes away external stains caused by tea, coffee, and tobacco.",
      "Polishes enamel surfaces, making it much harder for future plaque to stick."
    ],
    procedure: "Our hygienist uses an advanced ultrasonic scaler that vibrates at high frequency. The tip releases a micro-mist of water to painlessly dislodge hard calculus (tartar) blocks from your teeth and gums. We finish by polishing your teeth with a refreshing mint-flavored paste.",
    recoveryInfo: "There is zero recovery time. Your gums will feel incredibly fresh, light, and healthy. If you had deep tartar build-up, you might experience slight cold sensitivity for 24 hours.",
    whyChoose: "We use manufactured ultrasonic clean scalers that are gentle, whisper-quiet, and deeply thorough without scraping or damaging your tooth enamel."
  },
  {
    id: "teeth-reshaping",
    title: "Teeth reshaping",
    category: "Cosmetic",
    icon: "Maximize",
    description: "Subtle polishing and contouring of uneven enamel to yield a symmetric, uniform smile.",
    fullDetail: "Also known as enameloplasty, tooth reshaping is a quick, completely painless cosmetic option. By removing minor microns of enamel, we can smooth out serrated edges, balance overlapping teeth, and restore symmetrical alignment in just minutes without requiring anesthesia.",
    duration: "15 - 30 minutes",
    seoKeywords: ["Teeth contouring Surat", "Enameloplasty Varachha", "Cosmetic teeth smoothing Sarthana"],
    preCare: "Checking enamel thickness via digital metrics.",
    postCare: "Standard daily cleaning, zero special requirements.",
    introduction: "A quick, painless artistic contouring of your teeth enamel, designed to correct uneven edges, minor overlaps, or slightly pointed teeth in a single visit without needles.",
    benefits: [
      "Instantly creates a highly symmetrical, balanced look for your smile profile.",
      "Takes less than 30 minutes with absolutely zero needles, drills, or pain.",
      "Smooths rough edges that can chip easily or catch foods and tear floss.",
      "Enhances dental alignment without requiring long orthodontic therapies."
    ],
    procedure: "We carefully map the tooth dimensions. Using a specialized, round micro-polisher, the cosmetic dentist removes fractional microns of outer enamel to smooth jagged edges, round off sharp tips, or correct slight tooth lengths, polishing it to matching luster.",
    recoveryInfo: "Because the reshaping is limited strictly to the outer enamel layer where there are no nerves, there is absolutely zero sensitivity or recovery period.",
    whyChoose: "Dr. Twinkal Munjani possesses an exceptional eye for dental artwork, reshaping teeth with micro-measurements to achieve perfect symmetry."
  },
  {
    id: "veneers-crowns",
    title: "Veneers & crowns",
    category: "Cosmetic",
    icon: "Box",
    description: "Premium porcelain veneers and durable zirconia crowns to fully fortify or transform teeth.",
    fullDetail: "For premium, complete visual transformations, porcelain veneers offer ultra-thin shells crafted to cover front enamel surfaces, concealing major cracks or severe fluorosis yellowing. Meanwhile, our highly durable CAD-CAM customized Zirconia crowns restore strength and beauty to weakened or root-canal-treated teeth.",
    duration: "2 visits over 3-5 days",
    seoKeywords: ["Zirconia crowns Nana Varachha", "Porcelain veneers Surat", "Dental ceramic cap Sarthana"],
    preCare: "Enamel prep & digitally scanned impressions.",
    postCare: "Slight transient sensitivity might occur. Maintain flawless dental flossing habits.",
    introduction: "High-end dental restorations involving ultra-thin cosmetic porcelain veneers to mask aesthetic defects, alongside heavy-duty custom zirconia crowns to fully cover and fortify damaged teeth.",
    benefits: [
      "Veneers cover stubborn yellowing, cracks, and gaps for a perfect celebrity-ready smile.",
      "Crowns fully restore complete biting strength to cracked or root-canal-treated teeth.",
      "Engineered using digital CAD-CAM files to ensure a snug, comfortable, long-lasting fit.",
      "Constructed from translucent materials that reflect light exactly like natural teeth."
    ],
    procedure: "We prepare the tooth by gently shaving a fraction of a millimeter of enamel. We take high-resolution scans of your jaws. While your permanent zirconia crown or veneer is manufactured, we apply a temporary shell. In a few days, the final piece is bonded.",
    recoveryInfo: "Mild sensitivity to hot and cold may occur for 2-4 days. Continue your routine behavior, brush thoroughly, and floss between the teeth to ensure gum line longevity.",
    whyChoose: "We collaborate with world-class premium laboratories to curate Zirconia and E-max porcelain systems, delivering exceptional longevity and aesthetic satisfaction."
  },
  {
    id: "x-ray",
    title: "X-ray",
    category: "Preventive",
    icon: "Video",
    description: "Low-radiation advanced digital diagnostics to expose hidden decay, bone loss, and buried roots.",
    fullDetail: "At Gajera Dental Clinic, diagnostic accuracy is key. We utilize elite ultra-low exposure digital dental X-Rays. These provide real-time, crystal-clear high-definition imaging of raw sub-gingival root structures, hidden decay pockets, periodontal bone recessions, and unerupted teeth in seconds.",
    duration: "5 minutes",
    seoKeywords: ["Digital dental x-ray Surat", "Low radiation dental scan Varachha", "Dental diagnostic mapping"],
    preCare: "Will be wrapped in protective lead-apron collar.",
    postCare: "The immediate high-res images will be analyzed by the dentists live with you.",
    introduction: "Ultra-modern digital radiography that utilizes low-radiation diagnostic scanning to reveal cavities between teeth, check bone health, and locate buried nerve roots.",
    benefits: [
      "Exposes hidden dental decay, cysts, and infections beneath the gums instantly.",
      "Emits up to 85% less radiation compared to traditional, outdated film-developed X-rays.",
      "Provides instant, high-definition digital images viewed live with the patient onscreen.",
      "Crucial for precise planning of successful root canals, surgeries, and implants."
    ],
    procedure: "You are draped in a protective, lead-lined diagnostic collar. A small, smooth digital sensor is placed gently inside your mouth. The helper positions the high-focus scanning head outside your cheek, and a highly focused diagnostic scan is taken in 1 second.",
    recoveryInfo: "There is absolutely no recovery. The electronic images appear on the dentist's high-definition clinical monitor immediately for joint review.",
    whyChoose: "Our dental rooms are installed with modern low-exposure digital sensors to guarantee maximum patient radiation safety alongside exceptional diagnostic precision."
  }
];

export const PATIENT_TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    patientName: "Rajesh Patel",
    rating: 5,
    treatment: "Dental Implants & Laser Gum Treatment",
    location: "Nana Varachha, Surat",
    comment: "I was extremely anxious about dental implants, but Dr. Sujit Gajera made the entire surgical experience completely painless. The state-of-the-art laser technology and pristine sanitation in Gokulam Arkade are exceptional. Strongly recommend this clinic!",
    date: "2026-04-12",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fm=webp&fit=crop&q=70&w=96&h=96"
  },
  {
    id: "t2",
    patientName: "Meetal Kakadiya",
    rating: 5,
    treatment: "Cosmetic Smile Design & Veneers",
    location: "Yogi Chowk, Surat",
    comment: "Dr. Twinkal Munjani is a true artist! She redesigned my front teeth spacing with custom porcelain veneers. I now smile with confidence at my workplace. Truly the best cosmetic dental clinic in Surat.",
    date: "2026-05-18",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fm=webp&fit=crop&q=70&w=96&h=96"
  },
  {
    id: "t3",
    patientName: "Aarav Shah (Mother's review)",
    rating: 5,
    treatment: "Paediatric Fillings & Sealants",
    location: "Sarthana Jakatnaka, Surat",
    comment: "My 6-year-old was terrified of dental needles on checkups. Dr. Nensi Savani was incredibly patient, friendly, and magical. She treated him with absolute cheerfulness and applied protective sealants. He loved his little star-badge reward!",
    date: "2026-05-29",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fm=webp&fit=crop&q=70&w=96&h=96"
  },
  {
    id: "t4",
    patientName: "Ketan Sheth",
    rating: 5,
    treatment: "Emergency Root Canal (RCT)",
    location: "Kamrej, Surat",
    comment: "I developed a terrifying middle-of-the-night toothache. Checked Google, called Gajera Dental Clinic on 9016198281 first thing in the morning. They accommodated me immediately. Dr. Sujit performed a painless modern RCT. Pain relieved within an hour!",
    date: "2026-06-02",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fm=webp&fit=crop&q=70&w=96&h=96"
  }
];

export const FREQUENT_FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "Where is Gajera Dental Clinic located in Surat?",
    answer: "Our ultra-modern clinic is centrally situated at 101, Gokulam Arkade, Sarthana Jakatnaka, Nana Varachha, Surat, Gujarat - 395013. We are heavily connected by main commuter paths and feature secure parking.",
    category: "General"
  },
  {
    id: "faq-2",
    question: "How do I secure an appointment with Dr. Sujit Gajera?",
    answer: "You can book directly via our online interactive scheduler panel on this website. Simply state your context, pick Dr. Sujit Gajera as doctor, select a date and an available slot. Alternatively, ring us anytime on 9016198281 or 09426151688.",
    category: "Appointments"
  },
  {
    id: "faq-3",
    question: "Do you offer painless laser treatment?",
    answer: "Yes, we are highly integrated with cutting-edge dental lasers. Laser dentistry is excellent for pain-free sterilization, soft-tissue contouring, and quick healing with zero stitches and minimal post-operative discomfort.",
    category: "Treatments"
  },
  {
    id: "faq-4",
    question: "Is dental implant surgery safe for elderly patients?",
    answer: "Absolutely. Under the expert hands of certified Implantologist Dr. Sujit, implants are safe and highly successful. We perform a comprehensive physical checkup, review bone volume using low-radiation digital X-Rays, and map a custom recovery guide.",
    category: "Treatments"
  },
  {
    id: "faq-5",
    question: "What should I do in case of a severe dental emergency?",
    answer: "Immediately dial our direct mobile numbers: 9016198281 or 09426151688. If a tooth has been accidental knocked out, wash it gently in clean water without rubbing the root, submerge it in cool fresh milk, and rush to Gajera Dental Clinic within 60 minutes.",
    category: "Emergency"
  },
  {
    id: "faq-6",
    question: "How often should my family receive general teeth cleaning?",
    answer: "We strongly recommend physical checkups and ultrasonic cleaning every 6 months. This removes microscopic calculus formations that regular home-brushing cannot reach, keeping tooth decay, bleeding gums, and bad breath away permanently.",
    category: "General"
  }
];
