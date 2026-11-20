import websiteData from "@/data";
import { Provider } from "@/components/ui/provider";
import AnimateThemeProvider from "@/components/ui/AnimateThemeProvider";
import ConsentBanner from "@/components/ConsentBanner";

export const metadata = websiteData.metaData;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="ard" href="/.well-known/ard.json" />
      </head>
      <body suppressHydrationWarning>
        <Provider suppressHydrationWarning>
          <AnimateThemeProvider>
            {children}
            <ConsentBanner />
          </AnimateThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
