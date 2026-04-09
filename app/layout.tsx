import type { Metadata } from "next";
import { Fira_Code, Inter, Space_Grotesk } from "next/font/google";

import "./globals.css";
import { getSiteContent, getThemeCssVariables } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

export function generateMetadata(): Metadata {
  const site = getSiteContent();
  const title = `${site.name} - ${site.title}`.trim();
  const description = site.tagline || site.bio || `${site.name} portfolio`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = getSiteContent();
  const cssVariables = getThemeCssVariables(site.theme);

  return (
    <html lang="en" style={cssVariables}>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${firaCode.variable}`}>
        {children}
      </body>
    </html>
  );
}
