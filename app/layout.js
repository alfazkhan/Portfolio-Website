import websiteData from "@/data";
import { Provider } from "@/components/ui/provider";
import Script from "next/script";
import "github-markdown-css/github-markdown.css";
import AnimateThemeProvider from "@/components/ui/AnimateThemeProvider";
import { themeBootstrapScript } from "@/components/ui/theme-script";

export const metadata = websiteData.metaData;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <template suppressHydrationWarning>
          {/* <Script id="theme-bootstrap" strategy="beforeInteractive" suppressHydrationWarning>
            {themeBootstrapScript}
          </Script> */}
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
            precedence="default"
          />
        </template>
      </head>
      <body suppressHydrationWarning>
        <Provider suppressHydrationWarning>
          <AnimateThemeProvider>{children}</AnimateThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
