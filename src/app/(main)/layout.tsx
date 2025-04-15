import "~/styles/globals.css";

import { Inter } from "next/font/google";
import Link from "next/link";
import driveFont from "@components/font/driveFont";
import { type Metadata, type Viewport } from "next";
import NavLinks from "./NavLinks";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  description: "Literally me",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  metadataBase: new URL("https://paulhe.de"),
  title: {
    default: "Paul He",
    template: "%s | Paul He",
  },
  openGraph: {
    title: "Paul He ",
    description: "Literally me",
    url: "https://paulhe.de",
    siteName: "Paul He",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    title: "Paul He",
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`relative font-sans ${inter.variable} dark min-h-screen bg-gray-900/45 text-white`}
      >
        <header className="static top-0 mt-0 flex w-full flex-col justify-between gap-4 border-b border-gray-600 bg-[rgb(1,4,9)] pt-4 text-sm md:sticky md:text-base md:backdrop-blur">
          <Link
            href="/"
            className={`${driveFont.className} ${driveFont.variable} mb-4 ml-6 text-6xl text-cyberviolet group-hover:bg-white md:mb-0`}
          >
            <span className="text-cyberblue">P</span>H
          </Link>

          <Suspense>
            <NavLinks />
          </Suspense>
        </header>
        <main className="mx-auto px-2 text-white md:max-w-7xl md:px-0">
          {children}
        </main>
      </body>
    </html>
  );
}
