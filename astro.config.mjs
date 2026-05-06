// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import swup from "@swup/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [swup({})],
  fonts: [
    {
      provider: fontProviders.local(),
      name: "ZxProto",
      cssVariable: "--font-ZxProto",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/ZxProto-Regular.ttf"],
            weight: "normal",
            style: "normal",
          },
          {
            src: ["./src/assets/fonts/ZxProto-Bold.ttf"],
            weight: 700,
            style: "normal",
          },
          {
            src: ["./src/assets/fonts/ZxProto-Italic.ttf"],
            weight: "normal",
            style: "italic",
          },
        ],
      },
    },
    {
      provider: fontProviders.fontsource(),
      name: "Libre Barcode 128",
      cssVariable: "--font-Barcode",
    },
    {
      provider: fontProviders.fontsource(),
      name: "Atkinson Hyperlegible",
      cssVariable: "--font-Atkinson",
    },
  ],
});
