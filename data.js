import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTailwindcss,
  SiFigma,
  SiGit,
  SiExpress,
  SiCreatereactapp,
  SiPython,
  SiChakraui,
  SiShadcnui,
} from "react-icons/si";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import SubAnalyzerImg from "@/app/assets/ProjectImages/SubredditAnalyzerOG.png";


const websiteData = {
  //Metadata
  metaData: {
    title: {
      default: "Alfaz Khan | Frontend Developer & Data Scientist",
      template: "%s | Alfaz Khan",
    },
    description:
      "Portfolio of Alfaz Khan, a Frontend Developer & Data Scientist in Munich, Germany. Specializing in performant React architecture and data analytics.",
    keywords: [
      "Alfaz Khan",
      "Frontend Developer",
      "Data Scientist",
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
      title: "Alfaz Khan | Frontend Developer & Data Scientist",
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
    headline: "Hi! I am Alfaz, Frontend Developer & Data Scientist",
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
    title: "React Developer and\n Data Scientist",
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
      { label: "Residence:", value: "Germany", highlight: false },
      { label: "City:", value: "München, Bavaria", highlight: false },
      { label: "Open for Work", value: "Available", highlight: true },
    ],
    languages: [
      { label: "Hindi", proficiency: "C2/Native", level: 6 },
      { label: "English", proficiency: "C2/Native", level: 6 },
      { label: "German", proficiency: "A2/Good Knowledge", level: 2 },
    ],
    coreSkills: [
      "Javascript",
      "React.js",
      "CSS",
      "Chakra UI",
      "PostgresSQL",
      "Redux",
    ],
    extraSkills: [
      "Vite",
      "TailwindCSS",
      "Python",
      "Git & Version Control",
      "Photoshop",
      "Illustrator",
      "Premiere Pro",
      "Figma",
      "Canva",
    ],
  },

  //Work and Projects Section
  projects: [
    {
      id: 1,
      title: "Subreddit Analyzer",
      year: "2026",
      category: "Frontend & Data Science",
      desc: "A full-stack Reddit analysis platform that combines a <em>React dashboard</em> with a <em>Python FastAPI backend</em>, NLP pipelines, and PostgreSQL-backed storage",
      img: SubAnalyzerImg,
      link: "https://subanalyzer.theonlyalfaz.com",
      repoLink:"https://github.com/alfazkhan/Subreddit-Analyzer",
      skills: [
        { id: 3, name: "React", icon: SiReact, color: "#61DAFB" },
        { id: 6, name: "Tailwindcss", icon: SiTailwindcss, color: "#38BDF8" },
        { id: 8, name: "Git", icon: SiGit, color: "#F05032" },
        {
          id: 11,
          name: "Python",
          icon: SiPython,
          color: "#F7C63A",
        },
        { id: 12, name: "Chakra UI", icon: SiChakraui, color: "#0DC8AB" },
      ],
      markdownPath: "/SubredditAnalyzerReadme.md"
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
  getSkillsData: (nextColor) => [
    { id: 1, name: "Javascript", icon: SiJavascript, color: "#F7DF1E" },
    { id: 2, name: "Typescript", icon: SiTypescript, color: "#3178C6" },
    { id: 3, name: "React", icon: SiReact, color: "#61DAFB" },
    { id: 4, name: "Next.js", icon: SiNextdotjs, color: nextColor },
    { id: 5, name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { id: 6, name: "Tailwindcss", icon: SiTailwindcss, color: "#38BDF8" },
    { id: 7, name: "Figma", icon: SiFigma, color: "#F24E1E" },
    { id: 8, name: "Git", icon: SiGit, color: "#F05032" },
    { id: 9, name: "Express Js", icon: SiExpress, color: nextColor },
    { id: 10, name: "React Native", icon: SiCreatereactapp, color: "#61DAFB" },
    {
      id: 11,
      name: "Python",
      icon: "./Python.svg",
      color: "#F7C63A",
      isCustomSvg: true,
    },
    { id: 12, name: "Chakra UI", icon: SiChakraui, color: "#0DC8AB" },
    { id: 13, name: "Shadcn", icon: SiShadcnui, color: nextColor },
  ],
};

export default websiteData;
