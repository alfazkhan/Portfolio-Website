import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fs from "node:fs";
import path from "node:path";
import ConsentBanner from "../ConsentBanner";
import Footer from "../Footer";
import {
  getAnalyticsConsent,
  setAnalyticsConsent,
  openCookieSettings,
  initAnalyticsIfConsented,
  CONSENT_CHOICE,
} from "@/lib/analytics";

vi.mock("@chakra-ui/react", () => {
  const Wrapper = ({ as: Element = "div", children, id, role, ...props }) => (
    <Element id={id} role={role} {...props}>
      {children}
    </Element>
  );

  return {
    Box: Wrapper,
    Flex: Wrapper,
    HStack: Wrapper,
    Container: Wrapper,
    Heading: ({ children, as: Element = "h2", ...props }) => (
      <Element {...props}>{children}</Element>
    ),
    Text: ({ children, id, ...props }) => (
      <p id={id} {...props}>
        {children}
      </p>
    ),
    Button: ({ children, onClick, type = "button", "aria-label": ariaLabel, ...props }) => (
      <button type={type} aria-label={ariaLabel} onClick={onClick} {...props}>
        {children}
      </button>
    ),
    Link: ({ children, asChild, href, ...props }) => {
      if (asChild) {
        return <>{children}</>;
      }
      return (
        <a href={href} {...props}>
          {children}
        </a>
      );
    },
  };
});

describe("Privacy Markdown Documents", () => {
  const rootDir = process.cwd();
  const privacyEnPath = path.join(rootDir, "PRIVACY.md");
  const privacyDePath = path.join(rootDir, "PRIVACY.de.md");

  it("ensures PRIVACY.md exists and contains all required GDPR and TDDDG clauses", () => {
    expect(fs.existsSync(privacyEnPath)).toBe(true);
    const content = fs.readFileSync(privacyEnPath, "utf-8");

    // Check Controller
    expect(content).toContain("Alfaz Khan");
    expect(content).toContain("khanalfaaz14@gmail.com");
    expect(content).toContain("https://theonlyalfaz.com");

    // Check Hosting & Cloudflare
    expect(content).toContain("Firebase Hosting");
    expect(content).toContain("Cloudflare");
    expect(content).toContain("Art. 6(1)(f) GDPR");

    // Check Analytics & Opt-In
    expect(content).toContain("Firebase Analytics");
    expect(content).toContain("Google Analytics 4");
    expect(content).toContain("disabled by default");
    expect(content).toContain("Art. 6(1)(a) GDPR");
    expect(content).toContain("Section 25(1) TDDDG");
    expect(content).toContain("Data Privacy Framework");

    // Check Email & External Links
    expect(content).toContain("mailto:");
    expect(content).toContain("subanalyzer.theonlyalfaz.com");
    expect(content).toContain("2subs2learn.theonlyalfaz.com");

    // Check Local Storage & TDDDG
    expect(content).toContain("analytics_consent");
    expect(content).toContain("Section 25(2) No. 2 TDDDG");

    // Check Rights & BayLDA
    expect(content).toContain("Right of Access");
    expect(content).toContain("Right to Rectification");
    expect(content).toContain("Right to Erasure");
    expect(content).toContain("Right to Restriction of Processing");
    expect(content).toContain("Right to Data Portability");
    expect(content).toContain("Right to Object");
    expect(content).toContain("Right to Withdraw Consent");
    expect(content).toContain("Bayerisches Landesamt für Datenschutzaufsicht");
    expect(content).toContain("BayLDA");
    expect(content).toContain("poststelle@lda.bayern.de");
    expect(content).toContain("https://www.lda.bayern.de");
    expect(content).not.toContain("baylda.bayern.de");

    // Check Phrasing & Exact Social Links
    expect(content).toContain("This website uses **Google Firebase Analytics**");
    expect(content).not.toContain("uses (or will use)");
    expect(content).toContain("https://github.com/alfazkhan");
    expect(content).toContain("https://www.linkedin.com/in/alfaz-khan/");

    // Check for emoji absence
    const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
    expect(emojiRegex.test(content)).toBe(false);
  });

  it("ensures PRIVACY.de.md exists and contains legally equivalent German GDPR and TDDDG clauses", () => {
    expect(fs.existsSync(privacyDePath)).toBe(true);
    const content = fs.readFileSync(privacyDePath, "utf-8");

    // Check German terminology
    expect(content).toContain("Datenschutzerklärung");
    expect(content).toContain("Verantwortlicher");
    expect(content).toContain("Alfaz Khan");
    expect(content).toContain("khanalfaaz14@gmail.com");

    // Check Hosting & Cloudflare
    expect(content).toContain("Firebase Hosting");
    expect(content).toContain("Cloudflare");
    expect(content).toContain("Art. 6 Abs. 1 lit. f DSGVO");

    // Check Analytics & TDDDG
    expect(content).toContain("Firebase Analytics");
    expect(content).toContain("Google Analytics 4");
    expect(content).toContain("standardmäßig vollständig deaktiviert");
    expect(content).toContain("Art. 6 Abs. 1 lit. a DSGVO");
    expect(content).toContain("§ 25 Abs. 1 TDDDG");

    // Check Local Storage
    expect(content).toContain("analytics_consent");
    expect(content).toContain("§ 25 Abs. 2 Nr. 2 TDDDG");

    // Check Rights & BayLDA
    expect(content).toContain("Auskunftsrecht");
    expect(content).toContain("Recht auf Berichtigung");
    expect(content).toContain("Recht auf Löschung");
    expect(content).toContain("Recht auf Einschränkung der Verarbeitung");
    expect(content).toContain("Recht auf Datenübertragbarkeit");
    expect(content).toContain("Widerspruchsrecht");
    expect(content).toContain("Recht auf Widerruf der datenschutzrechtlichen Einwilligung");
    expect(content).toContain("Bayerisches Landesamt für Datenschutzaufsicht");
    expect(content).toContain("BayLDA");
    expect(content).toContain("poststelle@lda.bayern.de");
    expect(content).toContain("https://www.lda.bayern.de");
    expect(content).not.toContain("baylda.bayern.de");

    // Check German Phrasing & Exact Social Links
    expect(content).toContain("Diese Webseite nutzt **Google Firebase Analytics**");
    expect(content).not.toContain("nutzt (bzw. bindet künftig ein)");
    expect(content).toContain("https://github.com/alfazkhan");
    expect(content).toContain("https://www.linkedin.com/in/alfaz-khan/");

    // Check for emoji absence
    const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
    expect(emojiRegex.test(content)).toBe(false);
  });
});

describe("Analytics Utilities", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("returns null consent when user has not made a decision", () => {
    expect(getAnalyticsConsent()).toBeNull();
  });

  it("persists consent preference and notifies via custom event", async () => {
    const eventHandler = vi.fn();
    window.addEventListener("analytics-consent-change", eventHandler);

    await setAnalyticsConsent(CONSENT_CHOICE.ACCEPTED);
    expect(getAnalyticsConsent()).toBe("accepted");
    expect(eventHandler).toHaveBeenCalled();

    window.removeEventListener("analytics-consent-change", eventHandler);
  });

  it("does not initialize analytics if consent is rejected or unselected", async () => {
    const resultUnset = await initAnalyticsIfConsented();
    expect(resultUnset).toBeNull();

    await setAnalyticsConsent(CONSENT_CHOICE.REJECTED);
    const resultRejected = await initAnalyticsIfConsented();
    expect(resultRejected).toBeNull();
  });

  it("dispatches open-cookie-banner event when openCookieSettings is called", () => {
    const bannerListener = vi.fn();
    window.addEventListener("open-cookie-banner", bannerListener);

    openCookieSettings();
    expect(bannerListener).toHaveBeenCalledTimes(1);

    window.removeEventListener("open-cookie-banner", bannerListener);
  });
});

describe("Footer Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders a 1-click link to /privacy and a Cookie Settings button", async () => {
    const user = userEvent.setup();
    const openBannerSpy = vi.fn();
    window.addEventListener("open-cookie-banner", openBannerSpy);

    render(<Footer />);

    const privacyLink = screen.getByRole("link", { name: "Privacy Policy" });
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink).toHaveAttribute("href", "/privacy");

    const cookieSettingsButton = screen.getByRole("button", {
      name: "Open cookie preferences dialog",
    });
    expect(cookieSettingsButton).toBeInTheDocument();

    await user.click(cookieSettingsButton);
    expect(openBannerSpy).toHaveBeenCalledTimes(1);

    window.removeEventListener("open-cookie-banner", openBannerSpy);
  });
});

describe("ConsentBanner Component", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders consent banner when user choice is not set and allows accepting", async () => {
    const user = userEvent.setup();
    render(<ConsentBanner />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Cookie & Privacy Preferences")).toBeInTheDocument();

    const acceptButton = screen.getByRole("button", {
      name: "Accept analytics cookies",
    });
    await user.click(acceptButton);

    expect(getAnalyticsConsent()).toBe("accepted");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("allows rejecting analytics cookies", async () => {
    const user = userEvent.setup();
    render(<ConsentBanner />);

    const rejectButton = screen.getByRole("button", {
      name: "Reject analytics cookies",
    });
    await user.click(rejectButton);

    expect(getAnalyticsConsent()).toBe("rejected");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
