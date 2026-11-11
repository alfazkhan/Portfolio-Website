import websiteData from "@/data";

export const SUBDOMAIN_URL = "https://2subs2learn.theonlyalfaz.com";
export const SUBDOMAIN_TITLE = "2Subs2Learn | Bilingual Subtitle Browser Extension";
export const FALLBACK_SUMMARY =
  "A Manifest V3 browser extension for language learners on YouTube and ZDF Mediathek with simultaneous original and translated subtitles powered by browser-side Transformers.js and ONNX Runtime Web.";

function findSubs2LearnEntry() {
  return websiteData.projects.find((project) => project.title === "2Subs2Learn");
}

/**
 * Builds serializable props for the 2Subs2Learn landing view from portfolio data.
 */
export function getSubs2LearnProject() {
  const entry = findSubs2LearnEntry();
  if (!entry) {
    return {
      title: "2Subs2Learn",
      year: "2026",
      category: "Browser Extension & Product Development",
      summary: FALLBACK_SUMMARY,
      img: "/og-image.png",
      link: SUBDOMAIN_URL,
      repoLink: "https://github.com/alfazkhan/2Subs2Learn",
      downloadLinks: {},
      techStack: [],
      features: [],
      challengesSolved: [],
    };
  }

  return {
    title: entry.title,
    year: entry.year,
    category: entry.category,
    summary: entry.desc ? entry.desc.replace(/<[^>]+>/g, "") : FALLBACK_SUMMARY,
    img: entry.img,
    link: entry.link,
    repoLink: entry.repoLink,
    downloadLinks: entry.downloadLinks,
    techStack: (entry.techStack || []).map((item) =>
      item.includes("or equivalent") ? "End-to-End Testing" : item,
    ),
    features: entry.features || [],
    challengesSolved: entry.challengesSolved || [],
  };
}

/**
 * Generates page-level SEO and Open Graph metadata for the 2Subs2Learn subdomain.
 */
export function getSubs2LearnMetadata() {
  const entry = findSubs2LearnEntry();

  return {
    title: {
      absolute: SUBDOMAIN_TITLE,
    },
    description: FALLBACK_SUMMARY,
    alternates: {
      canonical: SUBDOMAIN_URL,
    },
    openGraph: {
      title: SUBDOMAIN_TITLE,
      description: FALLBACK_SUMMARY,
      url: SUBDOMAIN_URL,
      siteName: "2Subs2Learn",
      type: "website",
      ...(entry?.img?.src
        ? {
            images: [
              {
                url: entry.img.src,
                width: entry.img.width,
                height: entry.img.height,
                alt: "2Subs2Learn dual-subtitle overlay preview on YouTube",
              },
            ],
          }
        : {}),
    },
  };
}
