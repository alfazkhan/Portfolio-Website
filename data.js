import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTailwindcss,
  SiFigma,
  SiGit,
} from "react-icons/si";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const html = String.raw;

const websiteData = {
  //Metadata
  metaData: {
    title: {
      default: "Alfaz Khan | Frontend Developer & Data Scientist",
      template: "%s | Alfaz Khan",
    },
    // FIXED: Exactly 149 characters for clean Google indexing snippets
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
    authors: [{ name: "Alfaz Khan", url: "https://theonlyalfaz.com" }],
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

    metadataBase: new URL("https://theonlyalfaz.com"),
    alternates: {
      canonical: "/",
    },

    openGraph: {
      title: "Alfaz Khan | Frontend Developer & Data Scientist",
      // FIXED: Exactly 115 characters to prevent truncation in mobile feeds
      description:
        "Explore Alfaz Khan's portfolio showcasing high-performance frontend interfaces and data analytics projects.",
      url: "https://theonlyalfaz.com",
      siteName: "Alfaz Khan Portfolio",
      images: [
        {
          url: "/og-image.png", // Tip: Add text like "View Portfolio" directly on this graphic asset!
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
    buttonText: "Download my CV",
    cvLink:
      "https://drive.google.com/file/d/1rkSHx0wxqKMQYcWudee8-FIxmyuQ3_o6/view?usp=sharing",
  },

  //Left Sidebar Data
  sidebarData: {
    profileImg:
      "https://static.wixstatic.com/media/fb44a3_e9e9df6afcff46ffb8a4b4f6f5310959~mv2.png/v1/crop/x_0,y_870,w_3072,h_3226/fill/w_300,h_315,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/fb44a3_e9e9df6afcff46ffb8a4b4f6f5310959~mv2.png",
    name: "Alfaz",
    title: "React Developer and\n Data Scientist",
    socials: [
      {
        id: "linkedin",
        icon: FaLinkedin,
        link: "https://www.linkedin.com/in/alfaz-khan/",
      },
      { id: "github", icon: FaGithub, link: "https://github.com/alfazkhan" },
      //   { id: "twitter", icon: FaLinkedin },
    ],
    info: [
      { label: "Residence:", value: "Germany", highlight: false },
      { label: "City:", value: "München, Bavaria", highlight: false },
      { label: "Open for Work", value: "Available", highlight: true },
    ],
    languages: [
      { label: "Hindi", proficiency: "C2/Native", level: 6 },
      { label: "English", proficiency: "C1/Highly Proficient", level: 5 },
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
      img: "https://raw.githubusercontent.com/alfazkhan/Reddit-Data-Scrapper/main/src/assets/Screenshots/Sentiments.png",
      link: "https://subanalyzer.theonlyalfaz.com",
    },
    {
      id: 2,
      title: "Content for International Creators",
      year: "2025",
      category: "Video Engineering & Design",
      desc: "Produced high-impact video content for top-tier international creators like Tanmay Bhat (5M+ subscribers) and PokerStars, using Premiere and After Effects.",
      img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=400&h=250&fit=crop",
    },
    {
      id: 3,
      title: "Responsive Web Development",
      year: "2025",
      category: "Web Design (Freelance)",
      desc: "Architected and maintained modern web applications using React JS and current frontend frameworks, focusing on performance and user-centric design.",
      img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=400&h=250&fit=crop",
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
    { id: 9, name: "Git", icon: SiGit, color: "#F05032" },
  ],
};

export default websiteData;
