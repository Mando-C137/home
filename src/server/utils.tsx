import { visit } from "unist-util-visit";
import fs from "fs/promises";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { type PathLike } from "fs";
import { components } from "@components/mdx/mdxComponents";
import rehype from "rehype-highlight";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

type Metadata = {
  title: string;
  createdAt: string;
  updatedAt?: string;
  wip: boolean;
  summary: string;
  tags: string[];
};
const POST_FOLDER = "posts";

async function getMDXFiles(dir: PathLike) {
  return (await fs.readdir(dir)).filter(
    (file) => path.extname(file) === ".mdx",
  );
}

async function readMDXFile(filePath: string) {
  const headings: Heading[] = [];

  const rawContent = await fs.readFile(filePath, "utf-8");

  const { content, frontmatter: metadata } = await compileMDX<Metadata>({
    source: rawContent,
    components: {
      ...components,
    },
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          {
            plugins: [
              rehype,
              rehypeSlug,
              () => {
                return (tree) => {
                  visit(tree, "element", (node: Element) => {
                    if (/^h[1-6]$/.exec(node.tagName)) {
                      const level = parseInt(node.tagName.substring(1));

                      // Text aus den Kindern extrahieren
                      let text = "";
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      visit(node, "text", (textNode: any) => {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                        text += textNode.value;
                      });

                      // ID aus den Properties holen (von rehype-slug gesetzt)
                      const id = (
                        node as unknown as { properties?: { id: string } }
                      ).properties?.id;

                      if (id && text) {
                        headings.push({ id, text, level });
                      }
                    }
                  });
                };
              },
            ],
          },
        ],
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return { content, metadata, headings };
}

async function getMDXData(dir: string) {
  const mdxFiles = await getMDXFiles(dir);
  const result = mdxFiles.map(async (file) => {
    const { metadata, content } = await readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));
    return {
      metadata,
      slug,
      content,
    };
  });
  return Promise.all(result);
}

export async function getBlogPosts() {
  return (await getMDXData(path.join(process.cwd(), POST_FOLDER))).filter(
    (val) => !val.metadata.wip,
  );
}

export async function getBlogPost(slug: string) {
  try {
    return await readMDXFile(
      path.join(process.cwd(), POST_FOLDER, `${slug}.mdx`),
    );
  } catch (err) {
    if (err instanceof Error && "code" in err && err.code === "ENOENT") {
      return "notFound" as const;
    } else {
      console.error(err);
      throw err;
    }
  }
}

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export function extractHeadings(content: string): Heading[] {
  // Regex für Markdown-Überschriften (## Überschrift)
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Heading[] = [];

  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1]?.length;
    const text = match[2]?.trim();
    if (level === undefined || text === undefined) continue; // Fehlerbehandlung
    // ID wird von rehype-slug generiert (text in Kleinbuchstaben, Leerzeichen durch Bindestriche ersetzt)
    const id = text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");

    headings.push({ id, text, level });
  }

  return headings;
}
