// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import netlify from "@astrojs/netlify";

import clerk from "@clerk/astro";

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
  integrations: [react(), clerk()],
  adapter: netlify(),
  output: "server",
});
