import Image from "next/image";
import Link from "next/link";
import driveFont from "../components/font/driveFont";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-2 px-4 py-8 md:gap-12 md:py-16 ">
      <h1
        className={` bg-gradient-to-r from-cyberblue   via-cyberpink to-cyberviolet bg-clip-text py-2 text-3xl  font-bold   text-transparent lg:text-5xl`}
      >
        <span
          className={`${driveFont.variable} ${driveFont.className} font-medium`}
        >
          Literally{" "}
        </span>
        Paulhe(me)
      </h1>
      <div className="flex w-full  min-w-full  flex-col  gap-0 text-sm md:flex-row md:justify-between  md:gap-4">
        <div className="flex flex-col gap-0 p-2 text-sm md:gap-2 md:p-4 md:text-base ">
          <p>
            You know me. Literally me. <br />
            <span className="font-bold">Software dev</span> and{" "}
            <span className="font-bold">passionate weightlifter</span>
            .<br />
            This is my homepage.
          </p>
        </div>
        <div className="mx-auto my-4 md:ml-auto">
          <div
            className={`relative h-[468px] w-[325px] md:h-[422px] md:w-[292.5px]`}
          >
            <Image
              priority
              fill
              src="/ich.png"
              alt="Literarisch Ich"
              className="object-fit absolute inset-0 ml-auto rounded-md border border-slate-500 "
            />
          </div>
        </div>
      </div>

      <footer className="mt-auto text-sm md:text-base">
        <p className="">Contact my ass</p>
        <ul className="flex gap-2">
          <li>
            <Link
              href="https://github.com/Mando-C137"
              className="text-cyberblue"
            >
              Github
            </Link>
          </li>
          <li>
            <Link
              href="https://www.instagram.com/paulhe21/"
              className="text-cyberblue"
            >
              Gram
            </Link>
          </li>
          <li>
            <Link
              href="https://www.imdb.com/name/nm0331516/?ref_=nv_sr_srsg_2_tt_2_nm_4_q_Ryan"
              className="text-cyberblue"
            >
              IMDb
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
}
