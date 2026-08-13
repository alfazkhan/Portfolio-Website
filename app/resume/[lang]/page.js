import { use } from "react";

const RESUME_URLS = {
  en: "https://drive.google.com/file/d/1s-BDT456nDBJiTS-4LZb-p1_oCfCiM9P/view?usp=sharing",
  de: "https://drive.google.com/file/d/1rkSHx0wxqKMQYcWudee8-FIxmyuQ3_o6/view?usp=sharing",
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "de" }];
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isGerman = lang?.toLowerCase() === "de";

  return {
    title: isGerman ? "Alfaz - Lebenslauf (German Resume)" : "Alfaz - Resume",
    description: "View or download the resume of Alfaz.",
    openGraph: {
      title: isGerman ? "Alfaz - Lebenslauf" : "Alfaz - Resume",
      description: "View or download the resume of Alfaz.",
      type: "website",
    },
  };
}

export default function Page({ params }) {
  const resolvedParams = use(params);
  const lang = resolvedParams?.lang?.toLowerCase();
  const targetUrl = RESUME_URLS[lang] || RESUME_URLS.en;

  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content={`0; url=${targetUrl}`} />
      </head>
      <body className="flex h-screen w-full items-center justify-center font-sans text-sm text-zinc-500">
        <script
          dangerouslySetInnerHTML={{
            __html: `window.location.replace("${targetUrl}");`,
          }}
        />
        <p>
          Redirecting to resume...{" "}
          <a href={targetUrl} className="underline">
            Click here if not redirected.
          </a>
        </p>
      </body>
    </html>
  );
}