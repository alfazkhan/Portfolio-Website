import LaptopImg from "@/app/assets/ProjectImages/Laptop-Photoroom.png";
import { PlaywrightIcon } from "@/app/assets/Icons/Icons";
import {
  FiCpu,
  FiGlobe,
  FiLayers,
  FiSliders,
} from "react-icons/fi";
import { FaChrome, FaFirefox, FaGithub } from "react-icons/fa6";
import {
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiWebassembly,
  SiVitest,
  SiHuggingface,
  SiFirefoxbrowser,
  SiChromewebstore,
} from "react-icons/si";

export const subs2learnData = {
  general: {
    brandName: "2Subs2Learn",
    fontFamily: "'Tropika', 'Tropike', 'Tropika Island', system-ui, sans-serif",
    portfolioUrl: "https://www.theonlyalfaz.com",
    repoUrl: "https://github.com/alfazkhan/2Subs2Learn",
    downloadLinks: {
      chrome:
        "https://chromewebstore.google.com/detail/egkapkomakndamdhmlgknamdhmfnmkbf",
      firefox: "https://addons.mozilla.org/en-US/firefox/addon/2subs2learn/",
    },
    subdomainUrl: "https://2subs2learn.theonlyalfaz.com",
    metaTitle: "2Subs2Learn: Dual Subtitles for YouTube & ZDF Mediathek",
  },

  header: {
    navItems: [
      { label: "Overview", id: "about" },
      { label: "Features", id: "features" },
      { label: "Platforms", id: "platforms" },
      { label: "Highlights", id: "highlights" },
      { label: "Tech Stack", id: "tech-stack" },
    ],
    ctaButton: {
      label: "Alfaz Khan",
      url: "https://www.theonlyalfaz.com",
    },
    githubAriaLabel: "GitHub Repo",
    githubLabel: "GitHub Repository",
    menuOpenLabel: "Open menu",
    menuCloseLabel: "Close menu",
  },

  hero: {
    headlinePrefix: "Learn languages faster with ",
    headlineHighlight: "dual subtitles",
    summary:
      "A browser extension that shows original and translated subtitles together on YouTube and ZDF Mediathek. Translation runs locally in your browser.",
    laptopImage: LaptopImg,
    laptopAlt: "2Subs2Learn showing dual subtitles over a YouTube video",
    actions: {
      githubLabel: "GitHub Repo",
      chromeLabel: "Chrome Store",
      firefoxLabel: "Firefox Store",
      chromeAriaLabel: "Install for Chrome",
      firefoxAriaLabel: "Install for Firefox",
      githubAriaLabel: "GitHub Repo",
    },
  },

  features: {
    title: "Features",
    subtitle: "Watch in your target language and check the meaning at a glance.",
    items: [
      {
        id: "sync",
        icon: FiGlobe,
        title: "Two Subtitles, One Screen",
        description:
          "See the original line and its translation together, perfectly timed to the video. Pause, rewind or skip ahead and both stay in sync.",
      },
      {
        id: "translation",
        icon: FiCpu,
        title: "Translation in Your Browser",
        description:
          "OPUS-MT models run on your device, using WebGPU in Chrome and WebAssembly in Firefox. Nothing is sent to a server, and once a model is downloaded it works offline.",
      },
      {
        id: "overlay",
        icon: FiSliders,
        title: "Make It Yours",
        description:
          "Style each subtitle line separately. Adjust font size, text opacity, background padding and vertical position until it feels right.",
      },
    ],
  },

  platforms: {
    title: "Supported Platforms",
    subtitle:
      "Each site delivers captions differently, so each gets its own extraction logic.",
    items: [
      {
        id: "youtube",
        title: "YouTube",
        badge: "Caption Sync",
        logoType: "youtube",
        summary:
          "Reads the video's caption tracks, then matches the original and translated lines to playback time.",
        details: [
          "Pick your languages from human-reviewed caption tracks",
          "Falls back to auto-generated captions when your language isn't available",
          "Switches videos without a page reload and keeps the subtitles working",
        ],
      },
      {
        id: "zdf",
        title: "ZDF Mediathek",
        badge: "EBU-TT-D XML",
        logoType: "zdf",
        summary:
          "Picks up ZDF's German subtitle files as you browse and translates them into English in the background.",
        details: [
          "Translates the section you jump to first, so subtitles keep up when you scrub",
          "Works with multi-part videos, live or on demand",
          "Caches translations for smooth playback",
        ],
      },
    ],
  },

  engineering: {
    title: "Engineering Highlights",
    subtitle:
      "How the extension translates subtitles on-device without slowing the page.",
    highlights: [
      {
        id: "caption-pipeline",
        icon: FiGlobe,
        title: "Subtitle Parsing",
        description:
          "YouTube and ZDF use different caption formats. Custom parsers turn both into one timeline.",
        bullets: [
          "Parses JSON3 (YouTube) and EBU-TT-D XML (ZDF)",
          "Normalizes cue timestamps into uniform playback intervals",
          "Buffers upcoming subtitles so scrubbing doesn't cause stutter",
        ],
      },
      {
        id: "ai-runtime",
        icon: FiCpu,
        title: "On-Device Machine Translation",
        description:
          "Neural translation normally needs a server. Here it runs in the browser itself.",
        bullets: [
          "Chrome runs models in an offscreen document with WebGPU, off the UI thread",
          "Quantized ONNX models (Xenova OPUS-MT) are cached for instant reuse",
          "German-to-English and English-to-German supported",
        ],
      },
      {
        id: "cross-browser",
        icon: FiLayers,
        title: "One Codebase, Two Browsers",
        description:
          "Built with the WXT framework on Manifest V3, shipping to both Chrome and Firefox.",
        bullets: [
          "Firefox falls back to WebAssembly where WebGPU isn't available",
          "Requests only the permissions it needs, in line with store policies",
          "Unit and end-to-end tests guard caption sync",
        ],
      },
      {
        id: "privacy-first",
        icon: FiSliders,
        title: "Private by Design",
        description:
          "No analytics, no tracking, no server logs.",
        bullets: [
          "Subtitles and translations never leave your browser",
          "No accounts, API keys or subscriptions",
          "Open source, so you can read the code on GitHub",
        ],
      },
    ],
  },

  techStack: {
    title: "Software & Technologies",
    subtitle: "What 2Subs2Learn is built with.",
    speed: 60,
    height: 110,
    items: [
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "WXT (Manifest V3)", icon: FaChrome, color: "#F58B51" },
      { name: "Transformers.js", icon: SiHuggingface, color: "#FFD21E" },
      { name: "WebAssembly", icon: SiWebassembly, color: "#654FF0" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Vitest", icon: SiVitest, color: "#FCC72B" },
      { name: "Playwright", icon: PlaywrightIcon, color: "#2EAD33" },
      { name: "Firefox Engine", icon: SiFirefoxbrowser, color: "#FF7139" },
      { name: "Chrome Web Store", icon: SiChromewebstore, color: "#4285F4" },
    ],
  },

  footer: {
    creatorPrefix: "— Built by ",
    creatorName: "Alfaz Khan",
    creatorUrl: "https://www.theonlyalfaz.com",
    links: {
      chromeLabel: "Chrome Store",
      firefoxLabel: "Firefox Add-ons",
      githubLabel: "GitHub Repo",
      backToTopLabel: "Back to top ↑",
    },
  },
};

export function getSubs2LearnProject() {
  return {
    title: subs2learnData.general.brandName,
    year: "2026",
    category: "Browser Extension & Product Development",
    summary: subs2learnData.hero.summary,
    img: subs2learnData.hero.laptopImage,
    link: subs2learnData.general.subdomainUrl,
    repoLink: subs2learnData.general.repoUrl,
    downloadLinks: subs2learnData.general.downloadLinks,
    techStack: [
      "WXT (Manifest V3)",
      "TypeScript",
      "React",
      "Transformers.js",
      "Xenova OPUS-MT Models",
      "ONNX Runtime/WebAssembly",
      "Chrome Translation API",
      "ZDF Mediathek Integration",
      "Vitest (unit)",
      "End-to-End Testing",
    ],
    features: [
      "Dual subtitles on YouTube and ZDF Mediathek",
      "Translation runs in the browser with ONNX Runtime and WebAssembly",
      "Overlay synced to playback, with adjustable font size and position",
      "German-to-English and English-to-German models",
      "Language picker for YouTube caption tracks",
      "Private by design: nothing leaves your browser",
    ],
    challengesSolved: [
      "Kept subtitles in sync across two very different video platforms",
      "Made model loading and translation fast enough to feel instant",
      "Parsed JSON3 and EBU-TT-D XML caption formats",
      "Supported both Chromium browsers and Firefox from one codebase",
    ],
  };
}

export function getSubs2LearnMetadata() {
  return {
    title: {
      absolute: subs2learnData.general.metaTitle,
    },
    description: subs2learnData.hero.summary,
    alternates: {
      canonical: subs2learnData.general.subdomainUrl,
    },
    openGraph: {
      title: subs2learnData.general.metaTitle,
      description: subs2learnData.hero.summary,
      url: subs2learnData.general.subdomainUrl,
      siteName: subs2learnData.general.brandName,
      type: "website",
      ...(subs2learnData.hero.laptopImage?.src
        ? {
            images: [
              {
                url: subs2learnData.hero.laptopImage.src,
                width: subs2learnData.hero.laptopImage.width || 1280,
                height: subs2learnData.hero.laptopImage.height || 720,
                alt: subs2learnData.hero.laptopAlt,
              },
            ],
          }
        : {}),
    },
  };
}

export default subs2learnData;