import React, { type SVGProps } from "react";
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
    <>
      <Header metadata={post.metadata} />
      <section className="prose prose-invert mb-10 flex flex-col gap-4 pt-6 prose-headings:text-balance prose-p:text-pretty md:pt-10">
        <article>{post.content}</article>
      </section>
    </>
  );
}
export async function generateStaticParams() {
  const posts = await getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
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
    <div className="relative pt-20">
      <h1 className="mb-1   text-3xl md:mb-2">{metadata.title}</h1>
      <div className="flex items-center gap-2  text-white/40 ">
        <Persona className="h-4 w-4 md:h-5 md:w-5 " />
        Paul Heisner
      </div>
      <DateInfo
        withIcon={true}
        dateStr={metadata.createdAt}
        className="flex items-center gap-2 pt-1 text-white/40"
      />
      {metadata.tags.length > 0 && (
        <div className="flex items-center gap-2 pt-1  text-white/40 ">
          <Hashtag className="h-4 w-4 md:h-5 md:w-5 " />
          {metadata.tags.join(", ")}
        </div>
      )}
      {metadata.wip && (
        <span className="span-2 absolute right-0 top-10 rounded-full border-2 border-yellow-400/75 px-2 text-white/80 md:top-14">
          Unfinished
        </span>
      )}
    </div>
  );
}

function Persona(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      {...props}
    >
      <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
    </svg>
  );
}

function Hashtag(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M7.487 2.89a.75.75 0 1 0-1.474-.28l-.455 2.388H3.61a.75.75 0 0 0 0 1.5h1.663l-.571 2.998H2.75a.75.75 0 0 0 0 1.5h1.666l-.403 2.114a.75.75 0 0 0 1.474.28l.456-2.394h2.973l-.403 2.114a.75.75 0 0 0 1.474.28l.456-2.394h1.947a.75.75 0 0 0 0-1.5h-1.661l.57-2.998h1.95a.75.75 0 0 0 0-1.5h-1.664l.402-2.108a.75.75 0 0 0-1.474-.28l-.455 2.388H7.085l.402-2.108ZM6.8 6.498l-.571 2.998h2.973l.57-2.998H6.8Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
