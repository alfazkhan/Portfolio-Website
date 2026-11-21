"use client";

import { useState, useSyncExternalStore } from "react";

const SUPPORTED = ["chrome", "firefox"];

function detectBrowser() {
  const param = new URLSearchParams(window.location.search).get("browser")?.toLowerCase();
  if (SUPPORTED.includes(param)) return param;
  return /firefox|fxios/i.test(window.navigator.userAgent) ? "firefox" : "chrome";
}

// Nothing to subscribe to: the value is read once on the client.
const subscribe = () => () => {};

/**
 * Returns ["chrome" | "firefox", setBrowser].
 * The extension can force a value with `?browser=firefox`; otherwise the user agent decides.
 * Chromium browsers (Edge, Brave, Opera) install from the Chrome Web Store, so they map to "chrome".
 * The static HTML renders "chrome" and switches after hydration if needed.
 */
export default function useDetectedBrowser() {
  const detected = useSyncExternalStore(subscribe, detectBrowser, () => "chrome");
  const [override, setOverride] = useState(null);
  return [override || detected, setOverride];
}
