import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        cyberblue: "#00b8ff",
        cyberpink: "#d600ff",
        cyberviolet: "#bd00ff",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        drive: ["var(--drive-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
