/**
 * Google Analytics 4 (GA4) Web Analytics Integration Services
 * Gajera Dental Clinic & Implant Center - Nana Varachha, Surat
 */

// Extend window interface safely for window.gtag and window.dataLayer references
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

// Retrieve dynamic Google Analytics 4 Measurement ID from Vite environment variables
const GA_MEASUREMENT_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID as string) || "";

/**
 * Initializes and dynamically injects GA4 scripts into the document header.
 * Designed to load asynchronously to guarantee lightning-fast page speed.
 */
export function initGA() {
  if (typeof window === "undefined") return;

  if (!GA_MEASUREMENT_ID) {
    if (import.meta.env.DEV) {
      console.log(
        "%c[GA4 Mock Engine] Activation Ready: %cto track live visitors, add %cVITE_GA_MEASUREMENT_ID=\"G-XXXXXXXXXX\" %cto your .env configuration.",
        "color: #0d9488; font-weight: bold;",
        "color: #64748b; font-weight: normal;",
        "color: #2563eb; font-weight: bold; font-family: monospace;",
        "color: #64748b; font-weight: normal;"
      );
    }
    return;
  }

  try {
    // 1. Double initialization guard
    if (window.gtag) return;

    // 2. Set up dataLayer structure
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };

    // 3. Inject asynchronous gtag.js script node
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // 4. Default configuration parameters for GA4 standard streams
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: window.location.pathname + window.location.hash,
      send_page_view: true,
      cookie_flags: "SameSite=None;Secure" // Support preview sandbox frame policies
    });

    if (import.meta.env.DEV) {
      console.log(`[GA4 Engine] Successfully initialized stream ID: ${GA_MEASUREMENT_ID}`);
    }
  } catch (error) {
    console.error("[GA4 Initialization Failure] Could not load tracking script asynchronously:", error);
  }
}

/**
 * Tracks custom events to the GA4 endpoint or falls back to logger.
 */
export function trackEvent(
  eventName: string,
  eventParams: Record<string, string | number | boolean> = {}
) {
  if (typeof window === "undefined") return;

  if (window.gtag) {
    window.gtag("event", eventName, eventParams);
  }

  if (import.meta.env.DEV) {
    console.log(
      `%c[GA4 Event] %c${eventName}%c:`,
      "color: #0ea5e9; font-weight: bold;",
      "color: #ec4899; font-weight: bold;",
      "color: #64748b;",
      eventParams
    );
  }
}

/**
 * Custom track helper for Section Navigation and SPA virtual pageviews.
 */
export function trackPageView(pageTitle: string, sectionHash: string) {
  const cleanPath = `${window.location.pathname}${sectionHash}`;
  
  if (typeof window !== "undefined" && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_title: pageTitle,
      page_path: cleanPath
    });
  }

  if (import.meta.env.DEV) {
    console.log(`%c[GA4 PageView] %cTitle: "${pageTitle}" %cPath: "${cleanPath}"`, 
      "color: #10b981; font-weight: bold;", 
      "color: #1e293b; font-weight: bold;", 
      "color: #64748b;"
    );
  }
}

/**
 * Tracks User Click-to-Call Actions
 */
export function trackClickToCall(phoneNumber: string, label: string) {
  trackEvent("click_to_call", {
    phone_number: phoneNumber,
    source_label: label,
    device_type: window.innerWidth < 768 ? "mobile" : "desktop"
  });
}

/**
 * Tracks WhatsApp Live Consultant Interactions
 */
export function trackWhatsAppClick(actionSource: string) {
  trackEvent("whatsapp_click", {
    action_source: actionSource,
    destination_number: "919426151688"
  });
}

/**
 * Tracks Contact Info Message Submissions
 */
export function trackContactFormSubmit(subject: string, patientNameHash: string) {
  trackEvent("contact_form_submit", {
    message_subject: subject || "General Inquiry",
    has_name_provided: !!patientNameHash
  });
}

/**
 * Tracks Appointment Booking Button and Flow Completions
 */
export function trackAppointmentBooking(
  service: string,
  doctor: string,
  appointmentDate: string,
  timeSlot: string
) {
  trackEvent("appointment_booking_success", {
    selected_service: service,
    selected_doctor: doctor,
    scheduled_date: appointmentDate,
    scheduled_time: timeSlot
  });
}

/**
 * Tracks Navigation Menu Interactivity
 */
export function trackNavigationClick(menuLabel: string, targetSection: string) {
  trackEvent("navigation_interaction", {
    menu_label: menuLabel,
    target_section: targetSection
  });
}
