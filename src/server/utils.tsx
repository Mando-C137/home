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
  const rawContent = await fs.readFile(filePath, "utf-8");
  const { content, frontmatter: metadata } = await compileMDX<Metadata>({
    source: rawContent,
    components: {
      ...components,
    },
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [{ plugins: [rehype, rehypeSlug] }],
        remarkPlugins: [remarkGfm],
      },
    },
  });
  return { content, metadata };
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
  return await Promise.all(result);
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
