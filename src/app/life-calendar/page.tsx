import type { Metadata } from "next";
import LifeCalendar from "./LifeCalendar";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Life Calendar",
  };
}

export const dynamic = "force-dynamic";
export default function Page() {
  return <LifeCalendar />;
}
