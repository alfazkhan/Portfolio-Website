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

export default async function Page({ params }) {
  const { lang } = await params;
  const targetUrl = RESUME_URLS[lang?.toLowerCase()] || RESUME_URLS.en;

  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${targetUrl}`} />
      <main
        style={{
          display: "flex",
          minHeight: "100vh",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          fontSize: "0.875rem",
        }}
      >
        <p>
          Redirecting to resume...{" "}
          <a href={targetUrl} style={{ textDecoration: "underline" }}>
            Click here if not redirected.
          </a>
        </p>
      </main>
    </>
  );
}
