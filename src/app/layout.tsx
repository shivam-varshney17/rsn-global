import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/lang";

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RSN Club — Private Wholesale Institution",
  description:
    "The digital growth arm of RSLOG's South Asia Distribution Network. China sourcing authority, cross-border logistics, members-only wholesale, and AI operations — one institutional platform.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className={`rsn-root ${jetbrains.variable}`}>
          <style>{`
            html, body { background: #FAFAF7; margin: 0; padding: 0; }
            .rsn-root {
              font-family: 'Helvetica Neue', Helvetica, 'Arial Nova', Arial, 'PingFang SC', 'Microsoft YaHei', 'Liberation Sans', sans-serif;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            .rsn-serif,
            .rsn-display {
              font-family: 'Helvetica Neue', Helvetica, 'Arial Nova', Arial, 'PingFang SC', 'Microsoft YaHei', sans-serif;
              font-weight: 300;
            }
            .rsn-mono {
              font-family: var(--font-jetbrains), ui-monospace, monospace;
            }
          `}</style>
          <LangProvider>{children}</LangProvider>
        </div>
      </body>
    </html>
  );
}
