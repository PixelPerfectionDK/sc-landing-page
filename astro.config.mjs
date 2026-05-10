// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import netlify from "@astrojs/netlify";

import clerk from "@clerk/astro";

import { storyblok } from "@storyblok/astro";
import { loadEnv } from "vite";
const env = loadEnv("", process.cwd(), "STORYBLOK");
const { STORYBLOK_DELIVERY_API_TOKEN } = loadEnv(
  import.meta.env.MODE,
  process.cwd(),
  "",
);

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["react-dom/client", "react/jsx-runtime"],
    },
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Manrope",
      cssVariable: "--font-manrope",
    },
    {
      provider: fontProviders.google(),
      name: "JetBrains Mono",
      cssVariable: "--font-jetbrains-mono",
    },
    {
      provider: fontProviders.google(),
      name: "Caveat",
      cssVariable: "--font-caveat",
      weights: ["400", "500", "600", "700"],
    },
    {
      provider: fontProviders.google(),
      name: "Permanent Marker",
      cssVariable: "--font-permanent-marker-raw",
      weights: ["400", "500", "600", "700"],
    },
  ],
  integrations: [
    react(),
    clerk(),
    storyblok({
      accessToken: env.STORYBLOK_DELIVERY_API_TOKEN,
      apiOptions: {
        region: "eu",
      },
      components: {
        "ordbog-article": "storyblok/OrdbogArticle",
      },
    }),
  ],
  adapter: netlify(),
  output: "server",
});
