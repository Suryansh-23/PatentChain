import json from "@rollup/plugin-json";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    assetsInclude: ["**/*.json"],
    plugins: [react()],
    build: {
        rollupOptions: {
            plugins: [
                // ... other rollup plugins
                json({
                    compact: true,
                }),
            ],
        },
        minify: "esbuild",
        target: "esnext",
    },
});

