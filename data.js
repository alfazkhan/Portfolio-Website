import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFigma,
  SiGit,
  SiPython,
  SiFastapi,
  SiNodedotjs,
  SiWxt,
  SiHtml5,
  SiCss,
  SiRedux,
  SiFirebase,
} from "react-icons/si";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import SubAnalyzerImg from "@/app/assets/ProjectImages/SubredditAnalyzerOG.png";
import tstl from "@/app/assets/ProjectImages/2s2l.png";
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

    // CRITICAL: Point directly to working WWW origin so relative image paths resolve correctly
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
    imageSrc:
      "https://static.wixstatic.com/media/fb44a3_e9e9df6afcff46ffb8a4b4f6f5310959~mv2.png/v1/crop/x_0,y_870,w_3072,h_3226/fill/w_300,h_315,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/fb44a3_e9e9df6afcff46ffb8a4b4f6f5310959~mv2.png",
    headline: "Hi! I am Alfaz, Frontend Engineer | React & Typescript",
    para: "I am a Business Intelligence and Data Science student in Munich, who also has a experince in Web design, Graphic design and Video editing. I also have a experince with social media marketing and working alongside clients to grow their social media channels.",
    buttonText: "Download CV",
    cvLinks: {
      english:
        "https://drive.google.com/file/d/1s-BDT456nDBJiTS-4LZb-p1_oCfCiM9P/view?usp=sharing",
      deutsch:
        "https://drive.google.com/file/d/1rkSHx0wxqKMQYcWudee8-FIxmyuQ3_o6/view?usp=sharing",
    },
  },

  //Left Sidebar Data
  sidebarData: {
    profileImg:
      "https://static.wixstatic.com/media/fb44a3_e9e9df6afcff46ffb8a4b4f6f5310959~mv2.png/v1/crop/x_0,y_870,w_3072,h_3226/fill/w_300,h_315,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/fb44a3_e9e9df6afcff46ffb8a4b4f6f5310959~mv2.png",
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
      { label: "German", proficiency: "A2/Good Knowledge", level: 2 },
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
    ],
    extraSkills: [
      { id: 8, name: "Vite", icon: SiVite, color: "#61DAFB" },
      { id: 9, name: "TailwindCSS", icon: SiTailwindcss, color: "#38BDF8" },
      { id: 10, name: "Python", icon: PythonIcon, color: "#F7DF1E" },
      { id: 11, name: "Git & Version Control", icon: SiGit, color: "#EF4444" },
      { id: 12, name: "Photoshop", icon: ChakraIcon, color: "#05998B" },
      { id: 13, name: "Illustrator", icon: FigmaIcon, color: "#F24E1E" },
      { id: 14, name: "Premiere Pro", icon: PlaywrightIcon, color: "#05998B" },
    ],
  },

  //Work and Projects Section
  projects: [
    {
      id: 1,
      title: "Subreddit Analyzer",
      year: "2026",
      category: "Frontend & Data Science",
      desc: "A full-stack Reddit analysis platform that combines a <em>React dashboard</em> with a <em>Python FastAPI backend</em>, NLP pipelines, and PostgreSQL-backed storage. Features real-time sentiment analysis, community trend detection, and automated content moderation using PyTorch models.",
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
      ],
      markdownPath: "/SubredditAnalyzerReadme.md",
      techStack: [
        "React.js",
        "TypeScript",
        "Python 3.11",
        "FastAPI",
        "PostgreSQL 15",
        "PyTorch",
        "NLP (spaCy, transformers)",
        "Playwright",
        "Redux Toolkit",
        "TanStack Query",
      ],
      features: [
        "Real-time sentiment analysis using transformer models",
        "Community trend detection and visualization",
        "Automated content moderation system",
        "Multi-language support (English, German, Hindi)",
        "Interactive dashboard with data export capabilities",
        "API rate limiting and authentication",
      ],
      challengesSolved: [
        "Processed 10M+ Reddit posts efficiently using async pipelines",
        "Reduced sentiment analysis latency by 40% through model optimization",
        "Implemented scalable data storage for historical analysis",
        "Achieved 95% accuracy in content moderation classification",
      ],
    },
    {
      id: 2,
      title: "2Subs2Learn",
      year: "2026",
      category: "Browser Extension & Product Development",
      desc: "A Manifest V3 browser extension that enables language learners to follow entertainment video with simultaneous original and translated subtitles. Built with <em>WXT</em> framework, featuring multi-platform subtitle syncing (YouTube, ZDF Mediathek) and browser-side AI translation using <em>Transformers.js</em> with Xenova OPUS-MT models.",
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
          component: <SiTypescript style={{ fontSize: "24px", color: "#3178C6" }}/>,
        },
        { id: 3, name: "React", class: "devicon-react-original colored" },
        {
          id: 4,
          name: "Tailwind CSS",
          component: <SiTailwindcss style={{ fontSize: "24px", color: "#38BDF8" }}/>,
        },
        {
          id: 6,
          name: "Playwright",
          class: false,
          component: <PlaywrightIcon style={{ width: "30px" }}/>,
        },
        {
          id: 7,
          name: "WXT Framework",
          class: false,
          component: <DaisyUIIcon style={{ width: "30px" }}/>,
        },
      ],
      markdownPath: "/2Subs2LearnReadme.md",
      techStack: [
        "WXT (Manifest V3)",
        "JavaScript/TypeScript",
        "Transformers.js",
        "Xenova OPUS-MT Models",
        "ONNX Runtime/WebAssembly",
        "Chrome Translation API",
        "ZDF Mediathek Integration",
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
    ],
  }),
};

export default websiteData;
