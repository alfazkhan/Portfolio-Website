"use client";

const CONSENT_STORAGE_KEY = "analytics_consent";
const OPEN_BANNER_EVENT = "open-cookie-banner";
const CONSENT_CHANGE_EVENT = "analytics-consent-change";

export const CONSENT_CHOICE = {
  ACCEPTED: "accepted",
  REJECTED: "rejected",
};

export const FIREBASE_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "portfolio-website-e29d3.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "portfolio-website-e29d3",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "portfolio-website-e29d3.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "",
};

let initializedAnalytics = null;

export function getAnalyticsConsent() {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch (error) {
    console.warn("Unable to access localStorage for analytics consent:", error);
    return null;
  }
}

export async function setAnalyticsConsent(choice) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch (error) {
    console.warn("Unable to persist analytics consent in localStorage:", error);
  }

  // If user rejected, disable Google Analytics measurement ID if set
  if (choice === CONSENT_CHOICE.REJECTED && FIREBASE_CONFIG.measurementId) {
    window[`ga-disable-${FIREBASE_CONFIG.measurementId}`] = true;
  }

  window.dispatchEvent(
    new CustomEvent(CONSENT_CHANGE_EVENT, {
      detail: { choice },
    }),
  );

  if (choice === CONSENT_CHOICE.ACCEPTED) {
    await initAnalyticsIfConsented({ logPageView: true });
  }
}

export function openCookieSettings() {
  if (typeof window === "undefined") {
    return;
  }
  window.dispatchEvent(new CustomEvent(OPEN_BANNER_EVENT));
}

export async function logAnalyticsPageView(analyticsInstance) {
  if (typeof window === "undefined") {
    return;
  }

  const consent = getAnalyticsConsent();
  if (consent !== CONSENT_CHOICE.ACCEPTED) {
    return;
  }

  const analytics = analyticsInstance || initializedAnalytics;
  if (!analytics) {
    return;
  }

  try {
    const { logEvent } = await import("firebase/analytics");
    logEvent(analytics, "page_view", {
      page_location: window.location.href,
      page_path: window.location.pathname,
      page_title: document.title,
    });
  } catch (error) {
    console.warn("Failed to log page_view event:", error);
  }
}

export async function initAnalyticsIfConsented({ logPageView = false } = {}) {
  if (typeof window === "undefined") {
    return null;
  }

  const consent = getAnalyticsConsent();
  if (consent !== CONSENT_CHOICE.ACCEPTED) {
    // Explicit GDPR & TDDDG compliance: Never initialize if consent is not granted
    return null;
  }

  if (initializedAnalytics) {
    if (logPageView) {
      await logAnalyticsPageView(initializedAnalytics);
    }
    return initializedAnalytics;
  }

  // Ensure minimum config exists (e.g., apiKey and measurementId or projectId)
  if (!FIREBASE_CONFIG.apiKey && !FIREBASE_CONFIG.measurementId) {
    return null;
  }

  try {
    const { initializeApp, getApps, getApp } = await import("firebase/app");
    const { getAnalytics, isSupported } = await import("firebase/analytics");

    const supported = await isSupported();
    if (!supported) {
      return null;
    }

    const app = getApps().length > 0 ? getApp() : initializeApp(FIREBASE_CONFIG);
    initializedAnalytics = getAnalytics(app);

    if (logPageView) {
      await logAnalyticsPageView(initializedAnalytics);
    }

    return initializedAnalytics;
  } catch (error) {
    console.error("Firebase Analytics initialization error:", error);
    return null;
  }
}
