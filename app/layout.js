import websiteData from "@/data";
import { Provider } from "@/components/ui/provider";
import "github-markdown-css/github-markdown.css";
import AnimateThemeProvider from "@/components/ui/AnimateThemeProvider";

export const metadata = websiteData.metaData;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        precedence="default"
      />
      <body suppressHydrationWarning>
        <Provider>
          <AnimateThemeProvider>{children}</AnimateThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
