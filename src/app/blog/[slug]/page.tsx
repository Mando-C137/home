import React from "react";
import { notFound } from "next/navigation";
import { getBlogPost, getBlogPosts } from "../../../server/utils";
import DateInfo from "../../../components/ClientDateInfo";
export default async function Blog({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const post = await getBlogPost(slug);
  if (post === "notFound") {
    return notFound();
  }

  return (
    <section className="prose prose-invert mb-10 flex flex-col gap-4 prose-headings:text-balance prose-p:text-pretty">
      <div className="relative pt-8">
        {post.metadata.wip && (
          <span className="span-2 absolute right-0 top-0 rounded-full border-2 border-yellow-400 px-2">
            Unfinished
          </span>
        )}
        <h1 className="mb-2 text-xl md:text-3xl">{post.metadata.title}</h1>
        <div className="flex flex-row">
          <p>{post.metadata.summary}</p>
          <DateInfo
            dateStr={post.metadata.createdAt}
            className="ml-auto flex flex-shrink-0 flex-row items-center justify-center text-slate-100"
          />
        </div>
      </div>
      <article>{post.content}</article>
    </section>
  );
}
export async function generateStaticParams() {
  const posts = await getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
