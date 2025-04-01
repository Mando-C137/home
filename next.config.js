/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgflip.com",
        port: "",
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: "/blog/brometrics",
        destination: "https://bro-metrics.vercel.app",
        permanent: true,
      },
      // {
      //   source: "/blog/life-calendar",
      //   destination: "/life-calendar",
      //   permanent: true,
      // },
    ];
  },
  transpilePackages:
    process.env.NODE_ENV !== "production" ? ["next-mdx-remote"] : undefined,
};

export default config;
