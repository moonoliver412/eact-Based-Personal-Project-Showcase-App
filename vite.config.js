import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// Vite powers the dev server/build; the `test` block configures Vitest,
// which runs the React Testing Library suite in a jsdom environment.
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    css: false,
  },
});
