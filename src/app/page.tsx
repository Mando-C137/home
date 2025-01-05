import Image from "next/image";
import Link from "next/link";
import driveFont from "@components/font/driveFont";
import ImdbIcon from "../components/icons/ImdbIcon";
import InstagramIcon from "../components/icons/InstagramIcon";
import GithubIcon from "../components/icons/GithubIcon";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-2 px-4 py-8 md:gap-12 md:py-16">
      <h1
        className={`bg-gradient-to-r from-cyberblue via-cyberpink to-cyberviolet bg-clip-text py-2 text-3xl font-bold text-transparent lg:text-5xl`}
      >
        <span
          className={`${driveFont.variable} ${driveFont.className} font-medium`}
        >
          Literally{" "}
        </span>
        Paulhe(me)
      </h1>
      <div className="flex w-full min-w-full flex-col gap-0 text-sm md:flex-row md:justify-between md:gap-4">
        <div className="flex flex-col gap-0 p-2 text-sm md:gap-2 md:p-4 md:text-base">
          <p>
            Literally me. <br />
            {/*  
            <span className="font-bold first-letter:uppercase ">Software</span>
            {", "}
            <span className="font-bold first-letter:uppercase">Weights</span>
            {" and "}
            <span className="font-bold first-letter:uppercase">Economy</span>
            .<br />
            */}
            This is my homepage.
          </p>
        </div>
        <div className="mx-auto my-4 md:ml-auto">
          <div className="relative h-[calc(80vw*1.67)] w-[80vw] md:h-[625px] md:w-[375px]">
            <Image
              priority
              fill
              src="/ich.png"
              alt="Literarisch Ich"
              className="object-fit absolute inset-0 ml-auto rounded-md border border-slate-500"
              placeholder="data:image/png;base64,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JEISAAAAAImQBAAAAEAiJAEAAACQCEkAAAAAJEISAAAAAImQBAAAAEAiJAEAAACQCEkAAAAAJEISAAAAAImQBAAAAEAiJAEAAACQCEkAAAAAJEISAAAAAImQBAAAAEAiJAEAAACQCEkAAAAAJEISAAAAAImQBAAAAEAiJAEAAACQCEkAAAAAJEISAAAAAImQBAAAAEAiJAEAAACQCEkAAAAAJEISAAAAAImQBAAAAEAiJAEAAACQCEkAAAAAJEISAAAAAImQBAAAAEAiJAEAAACQCEkAAAAAJEISAAAAAImQBAAAAEAiJAEAAACQCEkAAAAAJEISAAAAAImQBAAAAEAiJAEAAACQCEkAAAAAJEISAAAAAImQBAAAAEAiJAEAAACQCEkAAAAAJEISAAAAAMnBxen3pzcs5fTiyvSEZVx94mPTE5by0d/4g+kJy/jTrxxNT1jK/e3fT09Yxj999eXpCUs5unI4PWEpp48vpics4/TMWe7ShVt9Z55+6rnpCUt5+PDd6QnL+Nlb70xPWIovkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAA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AAAASIQkAAAAABIhCQAAAIBESAIAAAAgEZIAAAAASIQkAAAAABIhCQAAAIBESAIAAAAgEZIAAAAASIQkAAAAABIhCQAAAIBESAIAAAAgEZIAAAAASIQkAAAAABIhCQAAAIBESAIAAAAgEZIAAAAASIQkAAAAABIhCQAAAIBESAIAAAAgEZIAAAAASIQkAAAAABIhCQAAAIBESAIAAAAgEZIAAAAASIQkAAAAABIhCQAAAIBESAIAAAAgEZIAAAAASIQkAAAAABIhCQAAAIBESAIAAAAgEZIAAAAASIQkAAAAABIhCQAAAIBESAIAAAAgEZIAAAAASIQkAAAAABIhCQAAAIBESAIAAAAgEZIAAAAASIQkAAAAABIhCQAAAIBESAIAAAAgEZIAAAAASIQkAAAAABIhCQAAAIBESAIAAAAgEZIAAAAASIQkAAAAABIhCQAAAIBESAIAAAAgEZIAAAAASIQkAAAAABIhCQAAAIBESAIAAAAgEZIAAAAASIQkAAAAABIhCQAAAIBESAIAAAAgEZIAAAAASIQkAAAAAJKDS9vpCWt5dF2b25XjZ4+mJyzl4fnF9IRl7O87y13aXDqenrCMG9ur0xOW4hGJX1qb6QFr2TjQnXn39p3pCUv52c9/Pj1hGaePz6YnLEX1AAAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAkoPpAau5fHA4PWEZR/vOcpcePn44PWEZFxcX0xOWsr3YTk9YxsXWtblLm0ub6QlL2V5yr+/K3Xv3pycsxZ/O3fGMtFvXnrw2PWEZt+/cnZ6wFF8kAQAAAJAISQAAAAAkQhIAAAAAiZAEAAAAQCIkAQAAAJAISQAAAAAkQhIAAAAAiZAEAAAAQCIkAQAAAJAISQAAAAAkQhIAAAAAiZAEAAAAQCIkAQAAAJAISQAAAAAkQhIAAAAAiZAEAAAAQCIkAQAAAJAISQAAAAAkQhIAAAAAiZAEAAAAQCIkAQAAAJAISQAAAAAkQhIAAAAAiZAEAAAAQCIkAQAAAJAISQAAAAAkQhIAAAAAiZAEAAAAQCIkAQAAAJAISQAAAAAkQhIAAAAAiZAEAAAAQCIkAQAAAJAISQAAAAAkQhIAAAAAiZAEAAAAQCIkAQAAAJAISQAAAAAkQhIAAAAAiZAEAAAAQCIkAQAAAJAISQAAAAAkQhIAAAAAiZAEAAAAQCIkAQAAAJAISQAAAAAkQhIAAAAAiZAEAAAAQCIkAQAAAJAISQAAAAAkQhIAAAAAiZAEAAAAQCIkAQAAAJAISQAAAAAkQhIAAAAAiZAEAAAAQCIkAQAAAJAISQAAAAAkQhIAAAAAiZAEAAAAQCIkAQAAAJAISQAAAAAkQhIAAAAAiZAEAAAAQCIkAQAAAJAISQAAAAAkQhIAAAAAiZAEAAAAQCIkAQAAAJAISQAAAAAkQhIAAAAAiZAEAAAAQCIkAQAAAJAISQAAAAAkQhIAAAAAiZAEAAAAQCIkAQAAAJAISQAAAAAkQhIAAAAAyWaz2WynR6zkueeem56wjO3WpblLe3u68a4cHR1NT1jKZrOZnrCMi4uL6QlLuXP37vSEpRxfOZ6esIyHjx5PT1jK8bFrc1c8v+/W/v7B9IRlPDo5nZ6wFG+WAAAAACRCEgAAAACJkAQAAABAIiQBAAAAkAhJAAAAACRCEgAAAACJkAQAAABAIiQBAAAAkAhJAAAAACRCEgAAAACJkAQAAABAIiQBAAAAkAhJAAAAACRCEgAAAACJkAQAAABAIiQBAAAAkAhJAAAAACRCEgAAAACJkAQAAABAIiQBAAAAkAhJAAAAACRCEgAAAACJkAQAAABAIiQBAAAAkAhJAAAAACRCEgAAAACJkAQAAABAIiQBAAAAkAhJAAAAACRCEgAAAACJkAQAAABAIiQBAAAAkAhJAAAAACRCEgAAAACJkAQAAABAIiQBAAAAkAhJAAAAACRCEgAAAACJkAQAAABAIiQBAAAAkAhJAAAAACRCEgAAAACJkAQAAABAIiQBAAAAkAhJAAAAACRCEgAAAACJkAQAAABAIiQBAAAAkAhJAAAAACRCEgAAAACJkAQAAABAIiQBAAAAkAhJAAAAACRCEgAAAACJkAQAAABAIiQBAAAAkAhJAAAAACRCEgAAAACJkAQAAABAIiQBAAAAkAhJAAAAACRCEgAAAACJkAQAAABAIiQBAAAAkAhJAAAAACRCEgAAAACJkAQAAABAIiQBAAAAkAhJAAAAACRCEgAAAACJkAQAAABAIiQBAAAAkAhJAAAAACRCEgAAAACJkAQAAABAIiQBAAAAkAhJAAAAACRCEgAAAACJkAQAAABAIiQBAAAAkGz29va20yNW4jB3aOs0ARi0t5lesJT9vcPpCcu4fPloesJS9vf9b31XNhtnuUubjd+hXXGWu+VOBwAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQAAAAAEiEJAAAAgERIAgAAACARkgAAAABIhCQA/q8dOxAAAAAAEORvvcIAhREAAMAikgAAAABYRBIAAAAAi0gCAAAAYBFJAAAAACwiCQAAAIBFJAEAAACwiCQAAAAAFpEEAAAAwCKSAAAAAFhEEgAAAACLSAIAAABgEUkAAAAALAGJD8KWf40bJwAAAABJRU5ErkJggg=="
            />
          </div>
        </div>
      </div>

      <footer className="mt-auto text-sm md:text-base">
        <ul className="flex gap-4">
          <li>
            <Link
              href="https://github.com/Mando-C137"
              className="text-cyberblue"
            >
              <GithubIcon className="h-6 fill-current text-neutral-200" />
            </Link>
          </li>
          <li>
            <Link
              href="https://www.instagram.com/paulhe21/"
              className="text-cyberblue"
            >
              <InstagramIcon className="h-6 fill-current text-neutral-200" />
            </Link>
          </li>
          <li>
            <Link
              href="https://www.imdb.com/name/nm0331516/?ref_=nv_sr_srsg_2_tt_2_nm_4_q_Ryan"
              className="text-cyberblue"
            >
              <ImdbIcon className="h-6 fill-current text-neutral-200" />
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
}
