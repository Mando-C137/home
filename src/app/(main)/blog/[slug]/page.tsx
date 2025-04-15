import React, { type SVGProps } from "react";
import { notFound } from "next/navigation";
import { getBlogPost, getBlogPosts } from "../../../../server/utils";
import { type Metadata } from "next";
import "~/styles/atom-one-dark.css";
import ProgressBar from "./ProgressBar";
import TableOfContents from "./TableOfContents";
import { FileText, Tag } from "lucide-react";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const blogpost = await getBlogPostCached(slug);
  if (blogpost === "notFound") {
    return notFound();
  }
  return {
    title: blogpost.metadata.title,
    keywords: blogpost.metadata.tags.join(", "),
    description: blogpost.metadata.summary,
  };
}

export default async function Blog({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const post = await getBlogPostCached((await params).slug);
  if (post === "notFound" || post.metadata.wip) {
    return notFound();
  }
  return (
    <>
      <TableOfContents headings={post.headings} />
      <ProgressBar />
      <Header metadata={post.metadata} />
      <div className="mt-4 bg-[#0d1117] text-[#c9d1d9]">
        <div className="mx-auto max-w-4xl px-4 py-8">
          {/* File Info Bar */}
          <div className="mb-8 rounded-lg border border-[#30363d] bg-[#161b22] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-[#8b949e]" />
                  <span className="text-sm">0 min read</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Tag className="h-5 w-5 text-[#8b949e]" />

                  <div className="flex space-x-2">
                    {post.metadata.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#1f6feb33] px-3 py-1 text-xs text-[#58a6ff]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="prose prose-invert mb-10 pt-6 prose-headings:text-balance prose-p:text-pretty md:pt-10 md:[&_h1]:scroll-mt-16 md:[&_h2]:scroll-mt-16 md:[&_h3]:scroll-mt-16 md:[&_h4]:scroll-mt-16 md:[&_h5]:scroll-mt-16">
            <article>
              {post.metadata.wip ? "Ich bin dran" : post.content}
            </article>
          </section>
        </div>
      </div>
    </>
  );
}

export async function generateStaticParams(): Promise<
  {
    slug: string;
  }[]
> {
  const posts = await getBlogPosts();
  return posts.map(({ slug }) => ({
    slug,
  }));
}

function Header({
  metadata,
}: {
  metadata: Exclude<
    Awaited<ReturnType<typeof getBlogPost>>,
    "notFound"
  >["metadata"];
}) {
  return (
    <div className="mb-6 mt-6 border-b border-[#30363d] px-4 pb-6 sm:mb-8 sm:mt-8 sm:pb-8">
      <div className="flex flex-wrap items-center space-x-2 text-xs text-[#8b949e] sm:text-sm">
        <span>Paul He</span>
        <span>•</span>
        <time dateTime={metadata.createdAt}>
          {new Date(metadata.createdAt).toLocaleDateString()}
        </time>
      </div>
      <h1 className="mt-3 text-2xl font-bold leading-tight sm:mt-4 sm:text-4xl">
        {metadata.title}
      </h1>
      <p className="mt-2 text-base text-[#8b949e] sm:text-lg">
        {metadata.summary}
      </p>
    </div>
  );
}

const getBlogPostCached = React.cache(getBlogPost);
