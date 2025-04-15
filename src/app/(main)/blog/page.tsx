import Link from "next/link";
import { getBlogPosts } from "../../../server/utils";
import { type Metadata } from "next";
import { File } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
};

export default async function BlogPost() {
  const allPosts = (await getBlogPosts()).sort(
    (a, b) =>
      Date.parse(b.metadata.updatedAt ?? b.metadata.createdAt) -
      Date.parse(a.metadata.updatedAt ?? a.metadata.createdAt),
  );

  return (
    <>
      <div className="mx-auto max-w-[1200px]">
        <div className="border-github-border border-b p-4">
          <input
            type="text"
            className="text-github-text bg-github-bg border-github-border mb-4 w-full rounded border px-3 py-1.5 text-sm leading-5"
            placeholder="Search blog entries..."
          />
          <div className="bg-github-hover border-github-border mb-4 flex items-center justify-between rounded border p-4">
            <div>
              <span>{allPosts.length} blog entries</span>
            </div>
            <div>
              <button className="border-github-border text-github-text hover:bg-github-hover cursor-pointer rounded border bg-transparent px-4 py-1.5">
                <i className="fas fa-sort"></i> Sort
              </button>
            </div>
          </div>
        </div>

        <table className="w-full border-collapse">
          {allPosts.map((post) => (
            <tbody key={post.slug}>
              <tr className="border-github-border hover:bg-github-hover border-b">
                <td className="w-5 p-4 text-[#8b949e]">
                  <File className="h-6" />
                </td>
                <td className="p-4">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="decoration-none text-github-link font-bold hover:underline"
                  >
                    {post.metadata.title}
                  </Link>
                  <div className="mt-1 text-sm text-[#8b949e]">
                    {post.metadata.summary}
                  </div>
                  <div className="mt-2 flex gap-2">
                    {post.metadata.tags.map((tag) => (
                      <span
                        className="text-github-link rounded-xl bg-[#1f6feb33] px-2 py-1 text-xs"
                        key={tag}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4 text-right text-xs text-[#8b949e]">
                  {new Date(post.metadata.createdAt).toLocaleDateString()}
                  <br />
                  <i className="far fa-clock"></i> 0 min read
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
}
