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
    <html>
      <body
        className={`font-sans ${inter.variable} dark bg-zinc-950 text-white`}
      >
        <div className="mx-auto max-w-3xl">{children}</div>
      </body>
    </html>
  );
}
