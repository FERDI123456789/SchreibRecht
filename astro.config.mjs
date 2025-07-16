import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import clerk from "@clerk/astro";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";

export default defineConfig({
  integrations: [react(), clerk(), tailwind()],
  output: "static",
  adapter: vercel(),
});
