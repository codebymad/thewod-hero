import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => {
  const base = mode === "production" ? "/thewod-hero/" : "/";

  return {
    base,

    plugins: [
      react(),
      tailwindcss(),

      VitePWA({
        registerType: "autoUpdate",

        manifest: {
          name: "theWOD",
          short_name: "theWOD",
          description: "Your daily workouts and planner",

          theme_color: "#111827",
          background_color: "#111827",
          display: "standalone",

          icons: [
            {
              src: `${base}icons/icon-192.png`,
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: `${base}icons/icon-512.png`,
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
      }),
    ],
  };
});