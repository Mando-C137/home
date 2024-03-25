import { type MDXRemoteProps } from "next-mdx-remote";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import {
  type DetailedHTMLProps,
  type AnchorHTMLAttributes,
  type SVGProps,
  type PropsWithChildren,
} from "react";

export const components = {
  TwoGrid: ({ children }: PropsWithChildren) => (
    <div className="grid grid-cols-1 gap-2  md:grid-cols-2">{children}</div>
  ),
  Image: (props: ImageProps) => <Image {...props} alt={props.alt} />,
  a: (
    props: Omit<
      DetailedHTMLProps<
        AnchorHTMLAttributes<HTMLAnchorElement>,
        HTMLAnchorElement
      >,
      "ref"
    >,
  ) => {
    if (typeof props.href !== "string") {
      return null;
    }
    const isSpotifyLink = props.href.startsWith("https://open.spotify.com");
    const isSoundCloudLink =
      props.href.startsWith("http://www.soundcloud.com") ||
      props.href.startsWith("https://www.soundcloud.com");

    return (
      <Link
        {...props}
        href={props.href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {props.children}
        {isSoundCloudLink && <SoundcloudSVG className="ml-2 inline h-6 w-6" />}
        {isSpotifyLink && <SpotifySVG className="ml-2 inline h-6 w-6" />}
      </Link>
    );
  },
} satisfies MDXRemoteProps["components"];

function SoundcloudSVG(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 291.319 291.319" xmlSpace="preserve" {...props}>
      <g>
        <path
          style={{ fill: "#FF7700" }}
          d="M72.83,218.485h18.207V103.832c-6.828,1.93-12.982,5.435-18.207,10.041
		C72.83,113.874,72.83,218.485,72.83,218.485z M36.415,140.921v77.436l1.174,0.127h17.033v-77.682H37.589
		C37.589,140.803,36.415,140.921,36.415,140.921z M0,179.63c0,14.102,7.338,26.328,18.207,33.147V146.52
		C7.338,153.329,0,165.556,0,179.63z M109.245,218.485h18.207v-109.6c-5.444-3.396-11.607-5.635-18.207-6.5V218.485z
		 M253.73,140.803h-10.242c0.519-3.168,0.847-6.382,0.847-9.705c0-32.182-25.245-58.264-56.388-58.264
		c-16.896,0-31.954,7.775-42.287,19.955v125.695h108.07c20.747,0,37.589-17.388,37.589-38.855
		C291.319,158.182,274.477,140.803,253.73,140.803z"
        />
      </g>
    </svg>
  );
}

function SpotifySVG(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" {...props}>
      <path
        fill="#1ed760"
        d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8Z"
      />
      <path d="M406.6 231.1c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3zm-31 76.2c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm-26.9 65.6c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4z" />
    </svg>
  );
}
