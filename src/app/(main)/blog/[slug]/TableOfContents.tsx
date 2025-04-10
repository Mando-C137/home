"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Heading } from "~/server/utils";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { AlignJustify } from "lucide-react";

type TableItem = {
  id: string;
  text: string;
  level: number;
  children: TableItem[];
  parent?: TableItem;
};

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [open, setOpen] = useState(false);

  // Convert flat headings array into nested structure with parent references
  const createHierarchy = (headings: Heading[]): TableItem[] => {
    const root: TableItem[] = [];
    const stack: TableItem[] = [];

    headings.forEach((heading) => {
      const item: TableItem = {
        ...heading,
        children: [],
      };

      while (
        stack.length > 0 &&
        stack[stack.length - 1]!.level >= heading.level
      ) {
        stack.pop();
      }

      if (stack.length > 0) {
        const parent = stack[stack.length - 1]!;
        item.parent = parent;
        parent.children.push(item);
      } else {
        root.push(item);
      }

      stack.push(item);
    });

    return root;
  };

  // Get all parent IDs for a given item
  const getParentIds = (item: TableItem): string[] => {
    const parentIds: string[] = [];
    let current = item.parent;

    while (current) {
      parentIds.push(current.id);
      current = current.parent;
    }

    return parentIds;
  };

  // Find item by ID in the hierarchy
  const findItemById = (
    items: TableItem[],
    id: string,
  ): TableItem | undefined => {
    for (const item of items) {
      if (item.id === id) return item;
      const found = findItemById(item.children, id);
      if (found) return found;
    }
    return undefined;
  };

  // Get all active IDs (current + parents)
  const getActiveIds = (
    hierarchy: TableItem[],
    currentId: string,
  ): Set<string> => {
    const activeIds = new Set<string>();
    const currentItem = findItemById(hierarchy, currentId);

    if (currentItem) {
      activeIds.add(currentId);
      getParentIds(currentItem).forEach((id) => activeIds.add(id));
    }

    return activeIds;
  };

  const hierarchy = createHierarchy(headings);

  useEffect(() => {
    const getSectionElements = () => {
      return headings
        .map((heading) => {
          const element = document.getElementById(heading.id);
          if (!element) return null;

          const { top, bottom } = element.getBoundingClientRect();
          return {
            id: heading.id,
            top: top + window.scrollY,
            bottom: bottom + window.scrollY,
          };
        })
        .filter((section): section is NonNullable<typeof section> => !!section);
    };

    const handleScroll = () => {
      const sections = getSectionElements();
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      const currentSection = sections.find((section) => {
        const nextSection = sections.find((s) => s.top > section.bottom);
        return (
          scrollPosition >= section.top &&
          (!nextSection || scrollPosition < nextSection.top)
        );
      });

      if (currentSection) {
        setActiveId(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  const TableItems = ({
    items,
    closeFn,
  }: {
    items: TableItem[];
    closeFn?: () => void;
  }) => {
    const activeIds = getActiveIds(hierarchy, activeId);

    return (
      <ul className="space-y-2 text-sm">
        {items.map(({ children, id, text }) => {
          const isItemActive = activeIds.has(id);

          return (
            <li key={id}>
              <Link
                href={`#${id}`}
                className={`block py-1 transition-colors focus-within:font-semibold hover:text-cyberblue focus-visible:text-cyberblue/60 focus-visible:outline-none ${
                  isItemActive
                    ? "font-medium text-cyberblue"
                    : "text-gray-200 lg:text-gray-600"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(id)?.scrollIntoView({
                    behavior: "smooth",
                  });
                  closeFn?.();
                }}
              >
                {text}
              </Link>
              {children.length > 0 && (
                <div
                  className={`ml-4 mt-2 border-l-2 pl-2 ${children.some((i) => activeIds.has(i.id)) ? "border-cyberblue" : "border-gray-600"}`}
                >
                  <TableItems items={children} closeFn={closeFn} />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  if (headings.length === 0) return null;

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          className="fixed bottom-4 right-4 z-50 rounded-full bg-cyberblue/75 p-3 text-gray-200 shadow-lg"
          aria-label="Open Table of Contents"
        >
          <AlignJustify
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="size-6"
          />
        </DialogTrigger>
        <DialogContent>
          <div
            className="max-h-[80vh] w-full max-w-md overflow-y-auto rounded-lg p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold">
                Table of Contents
              </DialogTitle>
            </div>
            <TableItems items={hierarchy} closeFn={() => setOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
