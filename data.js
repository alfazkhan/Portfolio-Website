import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiGit,
  SiPython,
  SiFastapi,
  SiNodedotjs,
  SiWxt,
  SiHtml5,
  SiCss,
  SiRedux,
  SiFirebase,
  SiApacheecharts, // NEW: Apache ECharts icon
  SiVitest, // NEW: add if you want to surface testing on the site
} from "react-icons/si";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import SubAnalyzerImg from "@/app/assets/ProjectImages/SubredditAnalyzerOG.png";
import tstl from "@/app/assets/ProjectImages/2s2l.png";
import ProfileImage from "@/app/assets/Profile-Image.jpg";
import {
  TanstackIcon,
  ChakraIcon,
  PythonIcon,
  PlaywrightIcon,
  PostgreSQLIcon,
  FigmaIcon,
  FirebaseIcon,
  DaisyUIIcon,
} from "./app/assets/Icons/Icons";
import { SiVite } from "react-icons/si";
import { FaCss3 } from "react-icons/fa6";

const websiteData = {
  //Metadata
  metaData: {
    title: {
      default: "Alfaz Khan | Frontend Engineer | React & Typescript",
      template: "%s | Alfaz Khan",
    },
    description:
      "Portfolio of Alfaz Khan, a Frontend Engineer | React & Typescript in Munich, Germany. Specializing in performant React architecture and data analytics.",
    keywords: [
      "Alfaz Khan",
      "Frontend Engineer | React & Typescript",
      "Business Intelligence",
      "React Developer",
      "Chakra UI Portfolio",
      "Munich Developer",
      "Data Science Student Germany",
    ],
    authors: [{ name: "Alfaz Khan", url: "https://www.theonlyalfaz.com" }],
    creator: "Alfaz Khan",
    publisher: "Alfaz Khan",

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },

    metadataBase: new URL("https://www.theonlyalfaz.com"),

    alternates: {
      canonical: "/",
    },

    openGraph: {
      title: "Alfaz Khan | Frontend Engineer | React & Typescript",
      description:
        "Explore Alfaz Khan's portfolio showcasing high-performance frontend interfaces and data analytics projects.",
      url: "https://www.theonlyalfaz.com",
      siteName: "Alfaz Khan Portfolio",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Alfaz Khan - Portfolio Showcase Image",
        },
      ],
      locale: "en_US",
      type: "profile",
      firstName: "Alfaz",
      lastName: "Khan",
      username: "theonlyalfaz",
    },

    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  },

  //Intro Page Data
  introData: {
    imageSrc: ProfileImage,
    headline: "Hi! I am Alfaz, Frontend Engineer | React & Typescript",
    para: `I build high-performance React/TypeScript applications that turn complex data into clear visual insights. My work combines clean frontend design with data science techniques to create interactive dashboards and ML-enhanced experiences for real-world decision making.`,
    buttonText: "Download CV",
    cvLinks: {
      english:
        "https://drive.google.com/file/d/1s-BDT456nDBJiTS-4LZb-p1_oCfCiM9P/view?usp=sharing",
      deutsch:
        "https://drive.google.com/file/d/1rkSHx0wxqKMQYcWudee8-FIxmyuQ3_o6/view?usp=sharing",
    },
    // TODO: confirm these two CV files are the FINAL versions you shared with me.
    // If not, re-export and replace these Drive links.
  },

  //Left Sidebar Data
  sidebarData: {
    profileImg: ProfileImage,
    name: "Alfaz",
    title: "React Developer and\n Frontend Engineer | React & Typescript",
    daysWorked: 18,
    socials: [
      {
        id: "linkedin",
        icon: FaLinkedin,
        link: "https://www.linkedin.com/in/alfaz-khan/",
        color: "#0A66C2",
      },
      {
        id: "github",
        icon: FaGithub,
        link: "https://github.com/alfazkhan",
        color: "#14191F",
      },
    ],
    info: [
      { label: "Residence", value: "Germany", highlight: false },
      { label: "City", value: "München, Bavaria", highlight: false },
      { label: "Work Status", value: "Available", highlight: true },
    ],
    languages: [
      { label: "English", proficiency: "C1/Fluent", level: 5 },
      // TODO: this file says B1, but the LIVE site showed A2 when I fetched it.
      // Pick ONE true, current number and make sure the deploy actually matches it.
      { label: "German", proficiency: "B1/Good Knowledge", level: 3 },
      { label: "Hindi", proficiency: "C2/Native", level: 6 },
    ],
    coreSkills: [
      { id: 1, name: "Javascript", icon: SiJavascript, color: "#F7DF1E" },
      { id: 2, name: "Typescript", icon: SiTypescript, color: "#3178C6" },
      { id: 3, name: "React.js", icon: SiReact, color: "#61DAFB" },
      { id: 4, name: "CSS", icon: FaCss3, color: "#27A4D9" },
      { id: 5, name: "Chakra UI", icon: ChakraIcon, color: "#0DC8AB" },
      { id: 6, name: "PostgresSQL", icon: PostgreSQLIcon, color: "#38BDF8" },
      { id: 7, name: "Redux", icon: SiRedux, color: "#7248B6" },
      // NEW: Apache ECharts — only keep this here once it's actually live on
      // Subreddit Analyzer's deployed frontend, not just mid-migration locally.
      { id: 15, name: "Apache ECharts", icon: SiApacheecharts, color: "#AA344D" },
    ],
    extraSkills: [
      { id: 8, name: "Vite", icon: SiVite, color: "#61DAFB" },
      { id: 9, name: "TailwindCSS", icon: SiTailwindcss, color: "#38BDF8" },
      { id: 10, name: "Python", icon: PythonIcon, color: "#F7DF1E" },
      { id: 11, name: "Git & Version Control", icon: SiGit, color: "#EF4444" },
      // REMOVED: Photoshop, Illustrator, Premiere Pro.
      // These point toward design/video, not frontend engineering — cut them
      // from a frontend-focused portfolio. Flagged twice now; please action.
      // NEW: surface testing since you say it now exists across projects —
      // only keep this once you've confirmed real, passing test suites.
      { id: 16, name: "Vitest / Testing", icon: SiVitest, color: "#6E9F18" },
    ],
  },

  //Work and Projects Section
  projects: [
    {
      id: 2,
      title: "2Subs2Learn",
      year: "2026",
      category: "Browser Extension & Product Development",
      desc: "A Manifest V3 browser extension that enables language learners to follow entertainment video with simultaneous original and translated subtitles. Built with <em>WXT</em> framework and fully in TypeScript, featuring multi-platform subtitle syncing (YouTube, ZDF Mediathek), browser-side AI translation using <em>Transformers.js</em> with Xenova OPUS-MT models, and a cross-browser engine (WebGPU-accelerated on Chromium, native WASM on Firefox). Covered by unit and end-to-end tests.",
      img: tstl,
      link: "https://2subs2learn.theonlyalfaz.com",
      repoLink: "https://github.com/alfazkhan/2Subs2Learn",
      downloadLinks: {
        chrome:
          "https://chromewebstore.google.com/detail/egkapkomakndamdhmlgknamdhmfnmkbf",
        firefox: "https://addons.mozilla.org/en-US/firefox/addon/2subs2learn/",
      },
      skills: [
        {
          id: 2,
          name: "TypeScript",
          component: (
            <SiTypescript style={{ fontSize: "24px", color: "#3178C6" }} />
          ),
        },
        { id: 3, name: "React", class: "devicon-react-original colored" },
        {
          id: 4,
          name: "Tailwind CSS",
          component: (
            <SiTailwindcss style={{ fontSize: "24px", color: "#38BDF8" }} />
          ),
        },
        {
          id: 7,
          name: "WXT Framework",
          class: false,
          component: <DaisyUIIcon style={{ width: "30px" }} />,
        },
        // REMOVED "Playwright" chip here — your 2Subs2Learn README doesn't
        // list Playwright as a dependency (that's the Subreddit Analyzer
        // scraper). If 2Subs2Learn's e2e suite actually uses Playwright,
        // add it back — otherwise this was likely copy-pasted between
        // projects.
      ],
      markdownPath: "/2Subs2LearnReadme.md",
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
        "Playwright or equivalent (e2e)", // TODO: confirm actual e2e tool and name it exactly
      ],
      features: [
        "Multi-platform subtitle synchronization (YouTube, ZDF Mediathek)",
        "Browser-side AI translation using ONNX Runtime/WebAssembly",
        "Playback-synchronized overlay with adjustable font size and position",
        "German-to-English and English-to-German model support",
        "Page-level language selection flow for YouTube caption tracks",
        "Privacy-first design with browser-side inference",
      ],
      challengesSolved: [
        "Achieved real-time subtitle synchronization across different video platforms",
        "Optimized model loading and inference for responsive user experience",
        "Handled complex subtitle formats (JSON3, EBU-TT-D XML) seamlessly",
        "Ensured cross-browser compatibility with Chromium-family and Firefox support",
      ],
    },
    {
      id: 1,
      title: "Subreddit Analyzer",
      year: "2026",
      category: "Frontend & Data Science",
      // TODO: Every specific claim below (10M+ posts, 40% latency cut, 95%
      // moderation accuracy, multi-language support, automated moderation)
      // was NOT visible in the public README when I checked. Before this
      // goes live again:
      //   1. Confirm these numbers are real and come from somewhere
      //      measurable (a benchmark script, a log, a test).
      //   2. Put the evidence IN the repo (README section, or a script
      //      that reproduces the number).
      //   3. If you can't do either, rewrite this description to only
      //      claim what the repo actually shows.
      desc: "A full-stack Reddit analysis platform that combines a <em>React dashboard</em> with a <em>Python FastAPI backend</em>, NLP pipelines, and PostgreSQL-backed storage. Features sentiment analysis, community trend detection, and keyword/entity visualization, with charts migrating to <em>Apache ECharts</em>.",
      img: SubAnalyzerImg,
      link: "https://subanalyzer.theonlyalfaz.com",
      repoLink: "https://github.com/alfazkhan/Subreddit-Analyzer",
      skills: [
        { id: 1, name: "React", class: "devicon-react-original colored" },
        { id: 5, name: "Python", class: false, component: <PythonIcon /> },
        { id: 2, name: "Chakra UI", class: false, component: <ChakraIcon /> },
        { id: 3, name: "Redux", class: "devicon-redux-original colored" },
        {
          id: 4,
          name: "Tanstack",
          class: false,
          component: <TanstackIcon />,
        },
        {
          id: 9,
          name: "PostgreSQL",
          class: false,
          component: <PostgreSQLIcon />,
        },
        {
          id: 6,
          name: "Playwright",
          class: false,
          component: <PlaywrightIcon />,
        },
        {
          id: 7,
          name: "Pytorch",
          class: "devicon-pytorch-original colored",
        },
        {
          id: 8,
          name: "FastAPI",
          class: "devicon-fastapi-plain colored",
        },
        // NEW: Apache ECharts chip — add once it's the live charting
        // library on the deployed site, not mid-migration.
        {
          id: 10,
          name: "Apache ECharts",
          class: false,
          component: (
            <SiApacheecharts style={{ fontSize: "24px", color: "#AA344D" }} />
          ),
        },
      ],
      markdownPath: "/SubredditAnalyzerReadme.md",
      techStack: [
        "React.js",
        // TODO: do NOT add "TypeScript" here until tsconfig.json actually
        // exists in the pushed repo. As of this check it still doesn't.
        "Python 3.11",
        "FastAPI",
        "PostgreSQL 15",
        "PyTorch",
        "NLP (spaCy, transformers)",
        "Playwright",
        "Redux Toolkit",
        "TanStack Query",
        "Apache ECharts", // migrating from Chart.js/Recharts
      ],
      features: [
        "Sentiment analysis using transformer models",
        "Community trend detection and visualization",
        "Keyword/entity frequency analysis",
        // REMOVED: "Automated content moderation system" and "95% accuracy
        // in content moderation classification" — not visible in the repo.
        // Add back only once real and documented.
        // REMOVED: "Multi-language support (English, German, Hindi)" — same
        // reason.
        "Interactive dashboard with data export capabilities",
        "API rate limiting and authentication", // TODO: confirm this is actually implemented, not planned
      ],
      challengesSolved: [
        // TODO: "Processed 10M+ Reddit posts" and "Reduced sentiment
        // analysis latency by 40%" need a real source (a log, a benchmark,
        // a comment in code) before they go back on the site or CV. Until
        // then I've replaced them with claims that match what's documented.
        "Built an async scraping and caching pipeline for high post volumes",
        "Implemented live NLP reanalysis over WebSockets with pause/resume control",
        "Implemented scalable data storage for historical analysis",
      ],
    },
  ],

  //Education Section data
  educationData: [
    {
      id: 3,
      period: "2025 - 2026",
      title: "MBA: Business Intelligence & Data Science",
      location: "International School of Management, München, Germany",
      desc: "Specializing in advanced analytics and data-driven decision making.",
      type: "Education",
    },
    {
      id: 2,
      period: "2023 - 2025",
      title: "Webdesigner & Videoeditor",
      location: "Freelance",
      desc: "Developed websites with React JS and created content for high-profile international creators.",
      type: "Work Experince",
    },
    {
      id: 1,
      period: "2021 - 2023",
      title: "System Engineer",
      location: "Tata Consultancy Services (TCS), Pune, India",
      desc: "Automated manual processes for Credit Suisse, improving efficiency by 25%.",
      type: "Work Experince",
    },
    {
      id: 0,
      period: "2017 - 2021",
      title: "Bachelor in Computer Science",
      location: "Poornima College of Engineering, Jaipur, India",
      desc: "Foundation in technical problem solving and software engineering principles.",
      type: "Education",
    },
  ],

  //Skills Section Data
  getSkillsData: (nextColor) => ({
    core: [
      { id: 1, name: "Javascript", icon: SiJavascript, color: "#F7DF1E" },
      { id: 2, name: "Typescript", icon: SiTypescript, color: "#3178C6" },
      { id: 3, name: "React", icon: SiReact, color: "#61DAFB" },
      { id: 11, name: "NodeJs", icon: SiNodedotjs, color: "#417E38" },
      { id: 4, name: "Next.js", icon: SiNextdotjs, color: nextColor },
      { id: 5, name: "WXT Framework", icon: SiWxt, color: "#67D55E" },
      { id: 6, name: "Tanstack Table", icon: TanstackIcon, color: "#38BDF8" },
      { id: 7, name: "Python", icon: PythonIcon, color: "#F7DF1E" },
      { id: 8, name: "FastAPI", icon: SiFastapi, color: "#05998B" },
      { id: 9, name: "PostgreSQL", icon: PostgreSQLIcon, color: "#38BDF8" },
      { id: 10, name: "Git & GitHub Actions", icon: SiGit, color: "#EF4444" },
      // NEW
      { id: 15, name: "Apache ECharts", icon: SiApacheecharts, color: "#AA344D" },
    ],
    secondary: [
      { id: 11, name: "HTML5", icon: SiHtml5, color: "#E96227" },
      { id: 11, name: "CSS3", icon: FaCss3, color: "#27A4D9" },
      { id: 12, name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
      { id: 13, name: "Chakra UI", icon: ChakraIcon, color: "#0DC8AB" },
      { id: 14, name: "Redux Toolkit", icon: SiRedux, color: "#7248B6" },
      { id: 18, name: "Playwright", icon: PlaywrightIcon, color: "#05998B" },
      { id: 22, name: "Firebase", icon: FirebaseIcon, color: "#0DC8AB" },
      { id: 23, name: "Figma", icon: FigmaIcon, color: "" },
      // NEW: surfaces testing on the main skills page too
      { id: 24, name: "Vitest", icon: SiVitest, color: "#6E9F18" },
    ],
  }),
};

export default websiteData;