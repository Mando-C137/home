import "~/styles/globals.css";
import "./style.css";
import React from "react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html className="mx-auto h-full min-h-full max-w-3xl">
      <body
        className={`h-full font-sans ${inter.variable} dark bg-zinc-950 text-white`}
      >
        {children}
      </body>
    </html>
  );
}
