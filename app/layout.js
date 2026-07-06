import websiteData from "@/data";
import { Provider } from "@/components/ui/provider";
import { ColorModeProvider } from "@/components/ui/color-mode"; // FIX: Restored Import
import AnimateThemeProvider from "@/components/ui/AnimateThemeProvider";

export const metadata = websiteData.metaData;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Provider>
          <AnimateThemeProvider>{children}</AnimateThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
