import Link from "next/link";
import { getBlogPosts } from "../../server/utils";
import DateInfo from "../../components/ClientDateInfo";

export default async function BlogPost() {
  const allPosts = (await getBlogPosts()).sort(
    (a, b) =>
      Date.parse(b.metadata.createdAt) - Date.parse(a.metadata.createdAt),
  );

  return (
    <div className="mt-12">
      <div className="">
        <h1 className="text-2xl tracking-tighter md:mb-4 md:text-3xl">
          Dumb thoughts:
        </h1>
        <ol className="flex flex-col gap-[1px] ">
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
  const tags = post.metadata.tags;
  return (
    <li className="relative bg-slate-900 p-2 first:rounded-t-md last:rounded-b-md md:p-4">
      <Link
        href={`/blog/${post.slug}`}
        className="text-lg tracking-tight hover:text-slate-50 hover:underline md:text-xl"
      >
        {post.metadata.title}
      </Link>
      {/*       <div>
        {tags.map((tag) => (
          <span
            key={tag}
            className="min-w-10 rounded-full border-2 border-slate-300  px-2 text-sm font-medium text-slate-300 md:text-base"
          >
            {tag}
          </span>
        ))}
      </div> */}
      <DateInfo
        dateStr={post.metadata.createdAt}
        className="mt-4 flex items-center gap-2 text-sm"
      ></DateInfo>
    </li>
  );
}
