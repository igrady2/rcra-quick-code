import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SkipLink } from "@/components/skip-link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RCRA Quick Code",
  description: "WIP: RCRA waste code and citation lookup tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
 <html lang="en">
      <body
        className="antialiased"
        suppressHydrationWarning
      >
        <SkipLink />
        {/* Optional dataset banner if you added it */}
        {/* <VersionBanner /> */}
        <SiteHeader />
        <main id="main" className="mx-auto max-w-4xl px-4 py-8">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}


