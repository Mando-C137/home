"use client";
import {
  Ellipsis,
  type BookOpen,
  PanelsTopLeft,
  Package,
  Star,
  NotebookPen,
  House,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

const navItems: {
  name: string;
  icon: typeof BookOpen;
  disabled: boolean;
  href: string;
  mobile: boolean;
}[] = [
  {
    name: "Overview",
    icon: House,
    disabled: false,
    href: "/",
    mobile: true,
  },
  {
    name: "Blog",
    icon: NotebookPen,
    disabled: false,
    href: "/blog",
    mobile: true,
  },
  {
    name: "Projects",
    disabled: false,
    icon: PanelsTopLeft,
    href: "/projects",
    mobile: false,
  },
  {
    name: "Packages",
    disabled: true,
    icon: Package,
    href: "/packages",
    mobile: false,
  },
  {
    name: "Stars",
    icon: Star,
    href: "/stars",
    disabled: true,
    mobile: false,
  },
];

const NavLinks = () => {
  const path = usePathname();

  const isActive = (href: string) => {
    switch (href) {
      case "/":
        return path === "/";
      default:
        return path.startsWith(href);
    }
  };

  return (
    <nav className="mx-auto flex w-full items-center pr-4">
      <ul className="mx-auto flex flex-row justify-center gap-2 px-2">
        {navItems.map(({ mobile, name, icon: Icon, href, disabled }) => (
          <li key={name}>
            <div>
              <Link
                href={href}
                className={`group relative flex h-12 flex-row items-center gap-2 border-b-2 border-transparent text-sm transition-all duration-700 ${isActive(href) && "border-b-orange-700 font-bold"} ${disabled && "pointer-events-none"} ${mobile ? "" : "hidden md:flex"} `}
              >
                <div className="flex flex-row items-center gap-2 rounded-md px-2 py-1 group-hover:bg-zinc-800/70">
                  <Icon className="h-5 text-gray-400" />
                  {name}
                </div>
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <DropdownMenu>
        <DropdownMenuTrigger asChild className="">
          <Button
            variant={"outline"}
            size={"icon"}
            className="ml-auto flex items-center bg-[rgb(33,40,48)] text-github-text md:hidden"
          >
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="z-50">
          {navItems
            .filter((item) => !item.mobile)
            .map(({ name, icon: Icon, href, disabled }) => (
              <DropdownMenuItem key={name}>
                <Link
                  href={href}
                  className={`group relative flex flex-row items-center gap-2 border-b-2 border-transparent text-sm transition-all duration-700 ${isActive(href) && "font-bold"} ${disabled && "pointer-events-none"} `}
                >
                  <div className="flex flex-row items-center gap-2 rounded-md group-hover:bg-zinc-800/70">
                    <Icon className="h-4 text-gray-400" />
                    {name}
                  </div>
                </Link>
              </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default NavLinks;
