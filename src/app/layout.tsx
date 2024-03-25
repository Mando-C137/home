import "~/styles/globals.css";

import { Inter } from "next/font/google";
import Link from "next/link";
import driveFont from "@components/font/driveFont";
import { type Metadata } from "next";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`relative font-sans ${inter.variable} mx-4 min-h-screen bg-current bg-gradient-to-b from-zinc-950  to-zinc-900 text-white `}
      >
        <header className="static top-0 mx-auto flex w-full max-w-5xl justify-between pt-4 text-sm md:sticky md:text-base md:backdrop-blur">
          <Link
            href="/"
            className={`${driveFont.className} ${driveFont.variable} hidden text-5xl text-cyberviolet md:block`}
          >
            <span className="text-cyberblue">P</span>H
          </Link>
          <nav>
            <ul className="flex flex-row justify-end gap-2 last:mr-6 md:gap-5 md:last:mr-0">
              <li className="p-2">
                <Link href="/" className="group transition duration-500">
                  Home
                  <span
                    aria-hidden={true}
                    className="block h-0.5 max-w-0 bg-cyberblue  transition-all duration-500 group-hover:max-w-full group-hover:bg-cyberviolet"
                  ></span>
                </Link>
              </li>
              <li className="p-2">
                <Link href="/blog" className="group transition duration-500">
                  Blog
                  <span
                    aria-hidden={true}
                    className="block h-0.5 max-w-0 bg-cyberblue  transition-all duration-500 group-hover:max-w-full group-hover:bg-cyberviolet"
                  ></span>
                </Link>
              </li>
              <li className="p-2">
                <Link href="/" className="group transition duration-500">
                  About
                  <span
                    aria-hidden={true}
                    className="block h-0.5 max-w-0 bg-cyberblue  transition-all duration-500 group-hover:max-w-full group-hover:bg-cyberviolet"
                  ></span>
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="mx-auto  px-2 text-white md:max-w-3xl  md:px-0">
          {children}
        </main>
      </body>
    </html>
  );
}
