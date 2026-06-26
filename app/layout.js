import websiteData from "@/data";
import "./globals.css";
import { Provider } from "@/components/ui/provider";

export const metadata = websiteData.metaData

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
