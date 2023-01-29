import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    assetsInclude: ["**/*.json"],
    plugins: [react()],
    build: {
        minify: "esbuild",
        target: "esnext",
    },
});

