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
    ];
  },
};

export default config;
