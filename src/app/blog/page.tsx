import Link from "next/link";
import { getBlogPosts } from "../../server/utils";
import DateInfo from "@components/ClientDateInfo";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

export default async function BlogPost() {
  const allPosts = (await getBlogPosts()).sort(
    (a, b) =>
      Date.parse(b.metadata.createdAt) - Date.parse(a.metadata.createdAt),
  );

  return (
    <div className="mt-12">
      <div>
        <div className="flex items-center justify-center pb-8 md:pb-10">
          <h1
            className="bg-gradient-to-r from-cyberblue via-cyberpink to-cyberviolet  bg-clip-text text-center 
          text-4xl font-bold tracking-tighter text-transparent md:mb-4 md:text-4xl"
          >
            Paulhe (me.)
          </h1>
        </div>
        <p className="p-2 text-lg ">
          Sehr witzig, falls das wirklich jemand liest
        </p>
        <ol className="mt-6 flex flex-col divide-y divide-white/30 md:divide-none">
          {allPosts.map((post) => (
            <BlogListElement key={post.slug} post={post} />
          ))}
        </ol>
      </div>
    </div>
  );
}

function BlogListElement({
  post,
}: {
  post: Awaited<ReturnType<typeof getBlogPosts>>[number];
}) {
  return (
    <li className="relative flex flex-col gap-0 p-2 py-6 pt-4  first:pt-0 md:p-4 md:py-10">
      <Link
        href={`/blog/${post.slug}`}
        className="text-xl tracking-tight hover:text-slate-50 hover:underline md:text-2xl"
      >
        {post.metadata.title}
      </Link>
      <div className="mt-2 space-y-2">
        <DateInfo
          withIcon={false}
          dateStr={post.metadata.createdAt}
          className="flex items-center gap-1 py-1 text-sm text-white/40 md:text-lg"
        />
        <p className="text-sm text-white/75 md:text-lg">
          {post.metadata.summary}
        </p>
      </div>
    </li>
  );
}
