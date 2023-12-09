// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: {
        "observus-toaster": resolve(__dirname, "src/lib/toaster.ts"),
      },
      name: "observus-toaster",
    },
  },
  plugins: [
    dts({
      entryRoot: "src/lib",
      exclude: "**/*.test.ts",
    }),
  ],
});

