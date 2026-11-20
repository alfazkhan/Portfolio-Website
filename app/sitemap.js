export const dynamic = "force-static";

export default function sitemap() {
  return [
    {
      url: "https://www.theonlyalfaz.com/",
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: "https://www.theonlyalfaz.com/2subs2learn",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://www.theonlyalfaz.com/resume/en",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://www.theonlyalfaz.com/resume/de",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://www.theonlyalfaz.com/privacy",
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
