import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const projects: { name: string; description: string; href: string }[] = [
  {
    name: "Life Calendar",
    description: "How far are you into your life?",
    href: "/life-calendar",
  },
  {
    name: "Star Wars Tier List",
    description: "Ranking it",
    href: "/tier-list",
  },
];

const Page = () => {
  return (
    <div className="max-w-4xl px-4 py-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {projects.map(({ description, name, href }) => (
          <div
            className="relative rounded-lg border border-gray-600 p-4 sm:p-6"
            key={name}
          >
            <Link
              href={href}
              className="inline-flex items-center gap-2 text-base font-semibold text-github-link hover:underline sm:text-lg"
            >
              {name} <SquareArrowOutUpRight className="inline-block size-5" />
            </Link>
            <div className="sm:text-md mt-2 text-sm text-[#8b949e]">
              {description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
