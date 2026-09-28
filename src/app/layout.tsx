import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Atkinson_Hyperlegible, Atkinson_Hyperlegible_Mono } from "next/font/google";
import "./globals.css";

const heading = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const body = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
  display: "swap",
});

const mono = Atkinson_Hyperlegible_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Interchange",
    template: "%s · Interchange",
  },
  description:
    "Interchange is a learning platform for enterprise integration, MuleSoft, SAP BTP, AWS/Azure integration, data engineering, PostgreSQL, and AI engineering.",
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f6fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0d111a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${heading.variable} ${body.variable} ${mono.variable} min-h-dvh bg-bg text-text antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-station focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <div className="flex min-h-dvh flex-col">
          <header className="border-b border-border bg-surface">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
              <span className="font-heading text-lg font-bold">Interchange</span>
              <nav aria-label="Primary" className="text-sm text-text-muted">
                <span>Learn integration, data, and AI engineering</span>
              </nav>
            </div>
          </header>
          <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
            {children}
          </main>
          <footer className="border-t border-border py-6 text-center text-sm text-text-muted">
            Interchange — built for practitioners.
          </footer>
        </div>
      </body>
    </html>
  );
}
