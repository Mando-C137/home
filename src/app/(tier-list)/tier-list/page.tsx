import TierList from "./TierList";
import React from "react";
import { env } from "~/env";
import { unstable_cache } from "next/cache";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ChevronLeft } from "lucide-react";

export const metadata = {
  title: "Star Wars Tier List",
};

export default async function Page() {
  const allMovies = await movies();
  return (
    <>
      <Link href={"/projects"} passHref>
        <Button
          variant={"outline"}
          title="Back to previous page"
          className="group fixed left-4 top-4 z-10 flex p-3"
        >
          <ChevronLeft />
          <p className="hidden group-hover:block">Back</p>
        </Button>
      </Link>
      <h1 className="my-4 bg-gradient-to-b from-yellow-300 to-yellow-600 bg-clip-text text-center text-3xl font-bold tracking-wide text-transparent text-yellow-400 drop-shadow-lg [transform:perspective(200px)_rotateX(10deg)]">
        RANKING ALL STAR WARS
      </h1>
      <TierList initialData={INITIAL_TIER_LIST} movies={allMovies} />
    </>
  );
}

const movies = unstable_cache(
  () =>
    Promise.all(
      [
        STARWARS_TMDB_IDS.movies.map((id) => resourceUrl(id, "movie")),
        STARWARS_TMDB_IDS.series.map((id) => resourceUrl(id, "tv")),
      ]
        .flat()
        .map((v) =>
          fetch(v, {
            cache: "force-cache",
            next: { revalidate: false },
          })
            .then((v) => v.json())
            .then(
              ({
                id,
                poster_path,
                original_title,
                name,
              }: {
                id: number;
                poster_path: string;
                original_title?: string;
                name?: string;
              }) => ({
                id: id,
                url: posterpathImagepath(poster_path, "original"),
                title: (original_title ?? name)!,
              }),
            ),
        ),
    ),
  ["starwars-movies-and-series"],
  { revalidate: false },
);

const STARWARS_TMDB_IDS = {
  movies: [
    11, 1891, 1892, 1893, 1894, 1895, 140607, 181808, 181812, 348350, 330459,
  ],
  series: [
    83867, 82856, 115036, 114479, 202879, 4194, 3122, 114461, 92830, 105971,
    114478, 60554, 79093,
  ],
};

const INITIAL_TIER_LIST = {
  S: [83867],
  A: [1891, 330459],
  B: [11, 1892],
  C: [4194],
  D: [],
  E: [181808, 115036, 140607, 82856, 114461],
  F: [1893, 1894, 181812, 1895, 92830],
  NOT_WATCHED: [348350, 114478, 60554, 79093, 3122, 202879, 114479, 105971],
};

const resourceUrl = (id: number, type: "movie" | "tv") =>
  `https://api.themoviedb.org/3/${type}/${id}?api_key=${env.TMDB_CLIENT_ID}` as const;

const posterpathImagepath = (
  poster_path: string,
  quality: "w342" | "w500" | "w780" | "original" = "w780",
) => `https://image.tmdb.org/t/p/${quality}/${poster_path}` as const;
