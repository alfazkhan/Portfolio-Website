"use client";

import React from "react";
import { Box } from "@chakra-ui/react";
import { useWebMCPTools } from "@/components/WebMCPTools";
import Subs2LearnHeader from "./subs2learn/Subs2LearnHeader";
import Subs2LearnHero from "./subs2learn/Subs2LearnHero";
import Subs2LearnFeatures from "./subs2learn/Subs2LearnFeatures";
import Subs2LearnPlatforms from "./subs2learn/Subs2LearnPlatforms";
import Subs2LearnEngineering from "./subs2learn/Subs2LearnEngineering";
import Subs2LearnTechMarquee from "./subs2learn/Subs2LearnTechMarquee";
import Subs2LearnFooter from "./subs2learn/Subs2LearnFooter";
import subs2learnData from "./subs2learn/data-2s2l";

// Polyfill IntersectionObserver in jsdom/test environments for motion features
if (typeof globalThis !== "undefined" && !globalThis.IntersectionObserver) {
  globalThis.IntersectionObserver = class {
    constructor(callback) {
      this.callback = callback;
    }
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

export default function Subs2LearnLanding({ project }) {
  const currentProject = project || {};
  const repoLink = project ? project.repoLink : subs2learnData.general.repoUrl;

  useWebMCPTools(
    () => [
      {
        name: "get_extension_details",
        description:
          "Retrieve structured product information, Chrome/Firefox store install URLs, supported platforms (YouTube, ZDF Mediathek), features, engineering highlights, and tech stack for 2Subs2Learn.",
        inputSchema: {
          type: "object",
          properties: {
            section: {
              type: "string",
              enum: [
                "all",
                "overview",
                "install",
                "platforms",
                "features",
                "tech_stack",
              ],
              description: "Product detail slice to return (defaults to 'all').",
            },
          },
          required: [],
        },
        annotations: {
          readOnlyHint: true,
          consequentialHint: false,
          untrustedContentHint: false,
        },
        execute: async ({ section = "all" } = {}) => {
          const payload = {
            overview: {
              title: currentProject.title || subs2learnData.general.brandName,
              year: currentProject.year || "2026",
              category: currentProject.category || "Browser Extension",
              summary: currentProject.summary || subs2learnData.hero.summary,
              url: currentProject.link || subs2learnData.general.subdomainUrl,
              repoUrl: repoLink || null,
            },
            install: {
              chrome: project ? (project.downloadLinks?.chrome || null) : subs2learnData.general.downloadLinks.chrome,
              firefox: project ? (project.downloadLinks?.firefox || null) : subs2learnData.general.downloadLinks.firefox,
              github: repoLink || null,
            },
            platforms: subs2learnData.platforms.items.map((p) => ({
              name: p.title,
              captionFormat: p.badge,
              summary: p.summary,
            })),
            features: currentProject.features || subs2learnData.features.items.map((f) => f.title),
            challengesSolved: currentProject.challengesSolved || subs2learnData.engineering.highlights.map((h) => h.title),
            tech_stack: currentProject.techStack || subs2learnData.techStack.items.map((t) => t.name),
          };

          if (section !== "all" && section in payload) {
            return JSON.stringify({ [section]: payload[section] });
          }
          return JSON.stringify(payload);
        },
      },
    ],
    [currentProject, project, repoLink],
  );

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Subs2LearnHeader repoLink={repoLink} />
      <Box as="main" id="main-content" flex={1}>
        <Subs2LearnHero project={currentProject} />
        <Subs2LearnFeatures />
        <Subs2LearnPlatforms />
        <Subs2LearnEngineering
          features={currentProject.features}
          challengesSolved={currentProject.challengesSolved}
        />
        <Subs2LearnTechMarquee />
      </Box>
      <Subs2LearnFooter project={currentProject} />
    </Box>
  );
}
