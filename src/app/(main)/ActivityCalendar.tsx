"use client";
import { format } from "date-fns";
import Link from "next/link";
import { Suspense } from "react";
import ActivityCalendar, {
  Skeleton,
  type Activity,
} from "react-activity-calendar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import type { getBlogPosts } from "~/server/utils";

interface ActivityCalendarWrapperProps {
  blogPosts: Awaited<ReturnType<typeof getBlogPosts>>;
}

export function ActivityCalendarWrapper({
  blogPosts,
}: ActivityCalendarWrapperProps) {
  const data = (() => {
    const contributionMap = blogPosts.reduce(
      (acc, post) => {
        const date = format(new Date(post.metadata.createdAt), "yyyy-MM-dd");
        acc[date] = (acc[date] ?? 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    // Generate activities for the last year
    const activities: Activity[] = [];
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    for (let d = oneYearAgo; d <= today; d.setDate(d.getDate() + 1)) {
      const date = format(d, "yyyy-MM-dd");
      activities.push({
        date,
        count: contributionMap[date] ?? 0,
        level: contributionMap[date] ? Math.min(contributionMap[date], 4) : 0,
      });
    }
    return activities;
  })();

  return (
    <Suspense fallback={<Skeleton />}>
      <TooltipProvider>
        <ActivityCalendar
          data={data}
          blockSize={10}
          blockMargin={4}
          theme={{
            light: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
            dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
          }}
          labels={{
            legend: {
              less: "Less",
              more: "More",
            },
            months: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            totalCount: "{{count}} posts in {{year}}",
          }}
          colorScheme="dark"
          renderBlock={
            (block, activity) => {
              const blogPost = blogPosts.find(
                (post) =>
                  format(post.metadata.createdAt, "yyyy-MM-dd") ===
                  activity.date,
              );

              return (
                <Tooltip>
                  <TooltipTrigger
                    asChild
                    className={`${blogPost && "cursor-pointer"}`}
                  >
                    {block}
                  </TooltipTrigger>
                  <TooltipContent className="text-md flex gap-2 text-white">
                    {format(new Date(activity.date), "MMM d, yyyy")}
                    {blogPost && ": "}
                    {blogPost && (
                      <Link
                        href={`/blog/${blogPost?.slug}`}
                        className="text-github-link hover:text-github-link/95 hover:underline"
                      >
                        {blogPost?.metadata.title}
                      </Link>
                    )}
                  </TooltipContent>
                </Tooltip>
              );
            }
            //   <div
            //     key={+activity.date + activity.date}
            //     // data-tooltip-id={block.key + activity.date}
            //     // data-tooltip-content={`${activity.count} posts on ${new Date(
            //     //   activity.date,
            //     // ).toISOString()}`}
            //     // style={{
            //     //   width: "10px",
            //     //   height: "10px",
            //     //   borderRadius: "2px",
            //     // }}
            //   />
          }
        />
      </TooltipProvider>
      {/* <TooltipComponent id="blog-activity" /> */}
    </Suspense>
  );
}
