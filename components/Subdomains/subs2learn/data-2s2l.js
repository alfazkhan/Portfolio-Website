import LaptopImg from "@/app/assets/ProjectImages/Laptop-Photoroom.png";
import { PlaywrightIcon } from "@/app/assets/Icons/Icons";
import {
  FiCpu,
  FiGlobe,
  FiLayers,
  FiSliders,
} from "react-icons/fi";
import {
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiWebassembly,
  SiVitest,
  SiHuggingface,
  SiFirefoxbrowser,
  SiChromewebstore,
  SiWxt,
  SiOnnx,
  SiWebgpu,
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
      { label: "How It Works", id: "how-it-works" },
      { label: "Features", id: "features" },
      { label: "Platforms", id: "platforms" },
      { label: "Highlights", id: "highlights" },
      { label: "Tech Stack", id: "tech-stack" },
    ],
    ctaButton: {
      label: "Alfaz Khan",
      url: "https://www.theonlyalfaz.com",
      ariaLabel: "Portfolio by Alfaz Khan",
    },
    githubAriaLabel: "GitHub Repo",
    githubLabel: "GitHub Repository",
    menuOpenLabel: "Open menu",
    menuCloseLabel: "Close menu",
  },

  hero: {
    eyebrow: "Free and Open source",
    headlinePrefix: "Learn languages faster with ",
    headlineHighlight: "dual subtitles",
    summary:
      "A browser extension that shows original and translated subtitles together on YouTube and ZDF Mediathek. Translation runs locally in your browser.",
    laptopImage: LaptopImg,
    laptopAlt: "2Subs2Learn showing dual subtitles over a YouTube video",
    trustPoints: ["Runs on your device", "No account needed", "Open source"],
    floatingBadges: {
      languages: "German ⇄ English",
      runtime: "WebGPU + WebAssembly",
    },
    actions: {
      githubLabel: "GitHub Repo",
      chromeLabel: "Chrome Store",
      firefoxLabel: "Firefox Store",
      chromeAriaLabel: "Install for Chrome",
      firefoxAriaLabel: "Install for Firefox",
      githubAriaLabel: "GitHub Repo",
    },
  },

  demo: {
    eyebrow: "How it works",
    title: "Watch, read, understand",
    subtitle:
      "The original line sits on top, the translation underneath, both timed to the video.",
    nowPlayingLabel: "Now playing · ZDF Mediathek",
    playerAriaLabel:
      "Example of a German subtitle line shown with its English translation underneath",
    intervalMs: 3200,
    pairs: [
      {
        original: "Guten Abend und willkommen zu den Nachrichten.",
        translation: "Good evening and welcome to the news.",
      },
      {
        original: "Heute sprechen wir über das Wetter in Berlin.",
        translation: "Today we're talking about the weather in Berlin.",
      },
      {
        original: "Morgen wird es sonnig und warm.",
        translation: "Tomorrow will be sunny and warm.",
      },
      {
        original: "Vielen Dank fürs Zuschauen!",
        translation: "Thanks for watching!",
      },
    ],
    steps: [
      {
        title: "Install the extension",
        description:
          "Add it to Chrome or Firefox in one click. No account or sign-up.",
      },
      {
        title: "Open a video",
        description:
          "Play anything with subtitles on YouTube or ZDF Mediathek.",
      },
      {
        title: "Pick your languages",
        description:
          "Choose the original and the translation. Both lines appear, timed to the video.",
      },
    ],
  },

  features: {
    eyebrow: "Why 2Subs2Learn",
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
    eyebrow: "Where it works",
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
    eyebrow: "Under the hood",
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
    atAGlance: {
      featuresTitle: "Key Features",
      challengesTitle: "Challenges Solved",
    },
  },

  techStack: {
    eyebrow: "Built with",
    title: "Tech Stack",
    subtitle: "What 2Subs2Learn is built with.",
    speed: 60,
    height: 110,
    items: [
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "WXT (Manifest V3)", icon: SiWxt, color: "#67D55E" },
      { name: "Transformers.js", icon: SiHuggingface, color: "#FFD21E" },
      { name: "ONNX Runtime", icon: SiOnnx, color: "#005CED" },
      { name: "WebGPU", icon: SiWebgpu, color: "#005A9C" },
      { name: "WebAssembly", icon: SiWebassembly, color: "#654FF0" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Vitest", icon: SiVitest, color: "#6E9F18" },
      { name: "Playwright", icon: PlaywrightIcon, color: "#2EAD33" },
      { name: "Firefox Engine", icon: SiFirefoxbrowser, color: "#FF7139" },
      { name: "Chrome Web Store", icon: SiChromewebstore, color: "#4285F4" },
    ],
  },

  cta: {
    title: "Make your next video a lesson",
    subtitle: "Free, private and open source. Installs in seconds.",
  },

  welcome: {
    path: "/welcome",
    metaTitle: "Welcome to 2Subs2Learn: Get Started in a Minute",
    metaDescription:
      "Thanks for installing 2Subs2Learn. Pin the extension, open a video on YouTube or ZDF Mediathek, and start learning with dual subtitles.",
    navItems: [
      { label: "Welcome", id: "welcome" },
      { label: "Pin It", id: "pin" },
      { label: "How to Use", id: "how-to-use" },
      { label: "Settings", id: "settings" },
      { label: "Help", id: "help" },
    ],
    overviewLabel: "Product page",

    hero: {
      eyebrow: "Installed successfully",
      title: "Welcome to 2Subs2Learn",
      subtitle:
        "You're ready to learn with dual subtitles. Here's how to get started in under a minute.",
      primaryAction: { label: "Open YouTube", url: "https://www.youtube.com" },
      secondaryAction: { label: "Open ZDF Mediathek", url: "https://www.zdf.de" },
    },

    pin: {
      eyebrow: "Step 1",
      title: "Pin it to your toolbar",
      subtitle: "Keep the settings one click away while you watch.",
      browserLabels: { chrome: "Chrome", firefox: "Firefox" },
      browserSwitchLabel: "Show instructions for",
      steps: {
        chrome: [
          "Click the puzzle-piece Extensions icon at the top right of Chrome.",
          "Find 2Subs2Learn in the list.",
          "Click the pin icon next to it.",
        ],
        firefox: [
          "Click the puzzle-piece Extensions button in the toolbar.",
          "Find 2Subs2Learn in the list.",
          "Click the gear icon next to it and choose “Pin to Toolbar”.",
        ],
      },
      mockMenuTitle: "Extensions",
      mockOtherExtensions: ["Password Manager", "Ad Blocker"],
    },

    howToUse: {
      eyebrow: "Step 2",
      title: "Open a video",
      subtitle: "2Subs2Learn starts working as soon as subtitles are available.",
      platforms: [
        {
          id: "youtube",
          logoType: "youtube",
          title: "YouTube",
          steps: [
            "Open any video that has captions.",
            "A “Select Subtitle Tracks” window appears on the video.",
            "Choose the language to translate from and the language to translate to.",
            "Both subtitle lines appear, timed to the video.",
          ],
          tip: "No captions in your language? Auto-generated captions are used instead.",
          action: { label: "Open YouTube", url: "https://www.youtube.com" },
        },
        {
          id: "zdf",
          logoType: "zdf",
          title: "ZDF Mediathek",
          steps: [
            "Open any video with subtitles.",
            "The German subtitles are picked up automatically.",
            "They're translated into English on your device as you watch.",
          ],
          tip: "Jump around freely. The part you skip to is translated first.",
          action: { label: "Open ZDF Mediathek", url: "https://www.zdf.de" },
        },
      ],
      download: {
        title: "A one-time download",
        description:
          "The first time it translates on your device, 2Subs2Learn downloads a translation model of about 120 MB. This only happens once. After that, translation starts right away and works offline.",
        mockTitle: "Downloading AI Model for Translation",
        mockNote:
          "This is a one-time setup for offline neural model size(~120MB) for in-browser translation",
      },
    },

    settings: {
      eyebrow: "Step 3",
      title: "Make the subtitles yours",
      subtitle:
        "Click the 2Subs2Learn icon in your toolbar to open the settings. Try them here first.",
      popup: {
        enabledLabel: "Enabled",
        pausedLabel: "Paused",
        heading: "Settings",
        translateFromLabel: "Translate From",
        translateToLabel: "Translate To",
        translateFromValue: "German",
        translateToValue: "English",
        toggleAriaLabel: "Turn 2Subs2Learn on or off",
        decreaseLabel: "Decrease",
        increaseLabel: "Increase",
      },
      controls: [
        { key: "sourceFontSize", label: "Target language size", unit: "px", min: 8, max: 48, initial: 22 },
        { key: "targetFontSize", label: "My language size", unit: "px", min: 8, max: 48, initial: 16 },
        { key: "windowWidth", label: "Translation window size", unit: "%", min: 20, max: 100, initial: 80 },
        { key: "verticalPosition", label: "Subs vertical position", unit: "%", min: 0, max: 90, initial: 8 },
      ],
      previewLabel: "Live preview",
      pausedPreviewText: "Subtitles are paused",
      previewPair: {
        original: "Ich lerne jeden Tag ein bisschen Deutsch.",
        translation: "I learn a little German every day.",
      },
      tips: [
        {
          title: "Pause anytime",
          description: "Flip the switch to hide the subtitles without uninstalling anything.",
        },
        {
          title: "Size each line separately",
          description: "Make the language you're learning bigger and your own language smaller, or the other way round.",
        },
        {
          title: "Move it out of the way",
          description: "Change the width and height so the subtitles never cover what matters.",
        },
      ],
    },

    help: {
      eyebrow: "Need anything?",
      title: "Help make it better",
      subtitle: "2Subs2Learn is a free, open-source side project. Feedback goes a long way.",
      cards: [
        {
          id: "rate",
          title: "Leave a review",
          description: "A quick rating helps other learners find it.",
          actionLabel: "Rate it",
        },
        {
          id: "issue",
          title: "Report a problem",
          description: "Something not working on a video? Open an issue on GitHub.",
          actionLabel: "Open an issue",
          url: "https://github.com/alfazkhan/2Subs2Learn/issues",
        },
        {
          id: "star",
          title: "Star the repo",
          description: "Follow along and see what's coming next.",
          actionLabel: "Star on GitHub",
          url: "https://github.com/alfazkhan/2Subs2Learn",
        },
      ],
      reviewLinks: {
        chrome:
          "https://chromewebstore.google.com/detail/egkapkomakndamdhmlgknamdhmfnmkbf/reviews",
        firefox: "https://addons.mozilla.org/en-US/firefox/addon/2subs2learn/reviews/",
      },
    },
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

export function getSubs2LearnWelcomeMetadata() {
  const { general, welcome } = subs2learnData;
  const url = `${general.subdomainUrl}${welcome.path}`;
  return {
    title: { absolute: welcome.metaTitle },
    description: welcome.metaDescription,
    // Post-install onboarding page: useful for users, not for search results.
    robots: { index: false, follow: true },
    alternates: { canonical: url },
    openGraph: {
      title: welcome.metaTitle,
      description: welcome.metaDescription,
      url,
      siteName: general.brandName,
      type: "website",
    },
  };
}

export default subs2learnData;