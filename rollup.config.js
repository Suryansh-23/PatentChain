import json from "rollup-plugin-json";
import resolve from "rollup-plugin-node-resolve";

export default {
    input: "./src/index.js",
    output: {
        file: "./lib/index.js",
        format: "umd",
    },
    plugins: [
        json(),
        resolve({
            extensions: [".js", ".json"],
        }),
    ],
};
