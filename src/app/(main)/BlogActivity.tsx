// components/BlogActivity.tsx
import { ActivityCalendarWrapper } from "./ActivityCalendar";
import { getBlogPosts } from "~/server/utils";

export async function BlogActivity() {
  // Convert blog posts to Activity format
  const blogPosts = await getBlogPosts();

  return (
    <div className="col-start-1 rounded-lg border border-github-border bg-github-bg p-4 md:col-span-2">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-[#c9d1d9]">Activity</h2>
      </div>
      <ActivityCalendarWrapper blogPosts={blogPosts} />
    </div>
  );
}
