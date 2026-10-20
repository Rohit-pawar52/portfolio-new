import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Libraries change far less often than the portfolio content, so they get their own long-cached
// chunks: after a content update, returning visitors only re-download the small app chunk.
const vendorChunks = [
  { name: "react", test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/, priority: 2 },
  { name: "motion", test: /[\\/]node_modules[\\/](framer-motion|motion-dom|motion-utils)[\\/]/, priority: 1 },
];

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Modern browsers only (Chrome/Edge 107+, Firefox 104+, Safari 16+), no legacy transpiling.
    // This is Vite's default, written out on purpose: "es2022" was measured and gave no smaller JS.
    target: "baseline-widely-available",
    rolldownOptions: {
      output: {
        codeSplitting: { groups: vendorChunks },
      },
    },
  },
});
