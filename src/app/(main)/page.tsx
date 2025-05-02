import Image from "next/image";
import Link from "next/link";
import ImdbIcon from "../../components/icons/ImdbIcon";
import GithubIcon from "../../components/icons/GithubIcon";
import { getBlogPosts } from "~/server/utils";
import { BlogActivity } from "./BlogActivity";
import LetterboxdIcon from "~/components/icons/LetterboxdIcon";

const name = "Paul He";
const username = "paulhe";
const bio = "Wow, what a life!";

export default async function HomePage() {
  const posts = (await getBlogPosts())
    .sort(
      (a, b) =>
        new Date(b.metadata.createdAt).getTime() -
        new Date(a.metadata.createdAt).getTime(),
    )
    .slice(0, 8);

  return (
    <div className="flex flex-col px-2 py-6 md:flex-row md:gap-2 md:px-4 md:py-8">
      <div className="myContainer mx-auto grid max-w-[1200px] grid-cols-1 gap-6 md:grid-cols-[296px_1fr]">
        {/* Profile Section */}
        <div className="profile flex flex-col items-center md:items-end">
          <Image
            priority
            src="/abstract.jpg"
            alt="Literarisch Ich"
            height={200}
            width={200}
            className="h-[120px] w-[120px] rounded-2xl border border-gray-700 bg-gradient-to-r from-orange-500 to-cyan-400 object-contain p-1 shadow-md transition-transform duration-300 hover:scale-105 hover:border-white/30 hover:shadow-lg md:h-[296px] md:w-[296px]"
            placeholder="data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAIAAADwf7zUAAAXPUlEQVR4nO3ZzW6cZxmA4Wfsscex4/wVZ9WqoqKo3VUVCGXDhtPiVFhyGCxAQkhIbEGhVYVoRJrmx3ESx/F47OEsYHFf1xHM986r93vv71l89atfTti3hx9P28ne9YR9vXo+Yfu3b03bl5+sJuzl3U8n7PR8M23fPE+vwO33rybs0ek/J+7kcMJ2/t8/AAAA+N8RAAAAECIAAAAgRAAAAECIAAAAgBABAAAAIQIAAABCBAAAAIQIAAAACBEAAAAQIgAAACBEAAAAQIgAAACAEAEAAAAhAgAAAEIEAAAAhAgAAAAIEQAAABAiAAAAIEQAAABAiAAAAIAQAQAAACECAAAAQgQAAACECAAAAAgRAAAAECIAAAAgRAAAAECIAAAAgBABAAAAIQIAAABCBAAAAIQIAAAACBEAAAAQIgAAACBEAAAAQIgAAACAEAEAAAAhAgAAAEIEAAAAhAgAAAAIEQAAABAiAAAAIEQAAABAiAAAAIAQAQAAACECAAAAQgQAAACECAAAAAgRAAAAECIAAAAgRAAAAECIAAAAgBABAAAAIQIAAABCBAAAAIQIAAAACBEAAAAQIgAAACBEAAAAQIgAAACAEAEAAAAhAgAAAEKWV4e3J+zhrcW07VyvJ+y71+kN8OLyaNp+/fMp++0vnk/Y08s70/aX71cTttm5mbCDk/r5/+8PBxNmAgAAACECAAAAQgQAAACECAAAAAgRAAAAECIAAAAgRAAAAECIAAAAgBABAAAAIQIAAABCBAAAAIQIAAAACBEAAAAQIgAAACBEAAAAQIgAAACAEAEAAAAhAgAAAEIEAAAAhAgAAAAIEQAAABAiAAAAIEQAAABAiAAAAIAQAQAAACECAAAAQgQAAACECAAAAAgRAAAAECIAAAAgRAAAAECIAAAAgBABAAAAIQIAAABCBAAAAIQIAAAACBEAAAAQIgAAACBEAAAAQIgAAACAEAEAAAAhAgAAAEIEAAAAhAgAAAAIEQAAABAiAAAAIEQAAABAiAAAAIAQAQAAACECAAAAQgQAAACECAAAAAgRAAAAECIAAAAgRAAAAECIAAAAgBABAAAAIQIAAABCBAAAAIQIAAAACBEAAAAQIgAAACBEAAAAQIgAAACAEAEAAAAhAgAAAEIEAAAAhAgAAAAIEQAAABAiAAAAIEQAAABAiAAAAIAQAQAAACECAAAAQgQAAACECAAAAAgRAAAAECIAAAAgRAAAAECIAAAAgOn4LwM23+sg7jF+AAAAAElFTkSuQmCC"
          />

          <div className="mt-4 w-full text-center md:text-left">
            <h1 className="text-xl font-semibold leading-[1.25] md:text-2xl">
              {name}
            </h1>
            <div className="text-base font-light leading-6 text-gray-400 md:text-xl">
              @{username}
            </div>
            <div className="md:text-md mx-auto mt-4 max-w-[30ch] text-sm italic text-gray-400">
              {bio}
            </div>
            <ul className="mt-4 flex flex-row items-center justify-center gap-2 text-sm md:flex-col md:items-start md:gap-4">
              {Links.map(({ name, href, icon: Icon }) => (
                <li key={name}>
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href={href}
                    className="flex flex-row justify-start gap-2 hover:text-cyberblue hover:underline focus-visible:text-cyberblue md:items-center"
                  >
                    <Icon className="h-5 w-5 fill-current text-gray-600" />
                    <span className="hidden md:block">{name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Posts Section */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {posts.map(({ metadata, slug }) => (
            <div
              className="relative rounded-lg border border-gray-600 p-4 sm:p-6"
              key={slug}
            >
              <div className="absolute right-2 top-2 rounded-full border border-gray-600 bg-black px-2 py-0.5 text-[10px] font-semibold text-gray-400 first:uppercase">
                public
              </div>
              <Link
                href={`/blog/${slug}`}
                className="text-base font-semibold text-github-link hover:underline sm:text-lg"
              >
                {metadata.title}
              </Link>
              <div className="sm:text-md mt-2 text-sm text-[#8b949e]">
                {metadata.summary}
              </div>
              <div className="mt-2 text-xs text-[#8b949e]">
                {new Date(metadata.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
          <BlogActivity />
        </div>
      </div>
    </div>
  );
}

const Links = [
  {
    name: "Github",
    href: "https://github.com/Mando-C137",
    icon: GithubIcon,
  },
  // {
  //   name: "Instagram",
  //   href: "https://www.instagram.com/paulhe21/",
  //   icon: InstagramIcon,
  // },
  {
    name: "IMDb",
    href: "https://www.imdb.com/name/nm0331516/?ref_=nv_sr_srsg_2_tt_2_nm_4_q_Ryan",
    icon: ImdbIcon,
  },
  {
    name: "Letterboxd",
    href: "https://letterboxd.com/paulspies",
    icon: LetterboxdIcon,
  },
];
