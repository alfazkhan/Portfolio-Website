"use client";

import websiteData from "@/data";
import { useWebMCPTools } from "./WebMCPTools";

const SECTION_IDS = ["home", "works", "education", "skills", "contact"];

function stripHtml(text = "") {
  return text.replace(/<[^>]+>/g, "");
}

function buildPortfolioPayload(topic = "all") {
  const skills = websiteData.getSkillsData("#000000");
  const fullProfile = {
    intro: {
      headline: websiteData.introData.headline,
      summary: websiteData.introData.para,
      residence: "Germany",
      city: "München, Bavaria",
      workStatus: "Available",
      socials: websiteData.sidebarData.socials.map((s) => ({
        platform: s.id,
        url: s.link,
      })),
    },
    projects: websiteData.projects.map((project) => ({
      title: project.title,
      year: project.year,
      category: project.category,
      summary: stripHtml(project.desc),
      liveUrl: project.link,
      repoUrl: project.repoLink,
      downloadLinks: project.downloadLinks || null,
      techStack: project.techStack,
      features: project.features,
    })),
    education: websiteData.educationData.map((entry) => ({
      period: entry.period,
      title: entry.title,
      location: entry.location,
      type: entry.type,
      description: entry.desc,
    })),
    skills: {
      core: skills.core.map((item) => item.name),
      secondary: skills.secondary.map((item) => item.name),
      languages: websiteData.sidebarData.languages.map((lang) => ({
        language: lang.label,
        proficiency: lang.proficiency,
      })),
    },
    contact: websiteData.contactData,
  };

  if (topic !== "all" && topic in fullProfile) {
    return { [topic]: fullProfile[topic] };
  }
  return fullProfile;
}

export default function HomeWebMCPTools() {
  useWebMCPTools(
    () => [
      {
        name: "navigate_to_section",
        description:
          "Scroll smoothly to a section on Alfaz Khan's portfolio page (home, works, education, skills, or contact).",
        inputSchema: {
          type: "object",
          properties: {
            section: {
              type: "string",
              enum: SECTION_IDS,
              description: "Portfolio section identifier to bring into view.",
            },
          },
          required: ["section"],
        },
        annotations: {
          readOnlyHint: true,
          consequentialHint: false,
          untrustedContentHint: false,
        },
        execute: async ({ section }) => {
          if (!SECTION_IDS.includes(section)) {
            return `Unknown section "${section}". Choose one of: ${SECTION_IDS.join(", ")}.`;
          }
          if (section === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return 'Scrolled to section "home".';
          }
          const element = document.getElementById(section);
          if (!element) {
            return `Section "${section}" is not currently mounted.`;
          }
          element.scrollIntoView({ behavior: "smooth" });
          return `Navigated to section "${section}".`;
        },
      },
      {
        name: "get_portfolio_profile",
        description:
          "Retrieve structured portfolio details for Alfaz Khan, including intro, projects, education/experience, skills, and contact information.",
        inputSchema: {
          type: "object",
          properties: {
            topic: {
              type: "string",
              enum: ["all", "intro", "projects", "education", "skills", "contact"],
              description: "Optional topic slice to return (defaults to 'all').",
            },
          },
          required: [],
        },
        annotations: {
          readOnlyHint: true,
          consequentialHint: false,
          untrustedContentHint: false,
        },
        execute: async ({ topic = "all" } = {}) =>
          JSON.stringify(buildPortfolioPayload(topic)),
      },
      {
        name: "get_resume_links",
        description:
          "Get direct English and German CV/resume URLs and redirect routes for Alfaz Khan.",
        inputSchema: {
          type: "object",
          properties: {
            language: {
              type: "string",
              enum: ["en", "de", "both"],
              description: "Resume language to return ('en', 'de', or 'both').",
            },
          },
          required: [],
        },
        annotations: {
          readOnlyHint: true,
          consequentialHint: false,
          untrustedContentHint: false,
        },
        execute: async ({ language = "both" } = {}) => {
          const allLinks = {
            en: {
              driveUrl: websiteData.introData.cvLinks.english,
              route: "/resume/en",
            },
            de: {
              driveUrl: websiteData.introData.cvLinks.deutsch,
              route: "/resume/de",
            },
          };

          if (language === "en" || language === "de") {
            return JSON.stringify({ [language]: allLinks[language] });
          }
          return JSON.stringify(allLinks);
        },
      },
      {
        name: "copy_contact_detail",
        description:
          "Copy Alfaz Khan's email address or phone number to the clipboard when available and return the contact string.",
        inputSchema: {
          type: "object",
          properties: {
            target: {
              type: "string",
              enum: ["email", "phone"],
              description: "Contact field to copy and return ('email' or 'phone').",
            },
          },
          required: ["target"],
        },
        annotations: {
          readOnlyHint: false,
          consequentialHint: false,
          untrustedContentHint: false,
        },
        execute: async ({ target }) => {
          const value = websiteData.contactData[target];
          if (!value) {
            return `Unknown contact target "${target}".`;
          }
          let copied = false;
          if (navigator?.clipboard?.writeText) {
            try {
              await navigator.clipboard.writeText(value);
              copied = true;
            } catch {
              copied = false;
            }
          }
          return JSON.stringify({ target, value, copied });
        },
      },
    ],
    [],
  );

  return null;
}
