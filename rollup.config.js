import json from "@rollup/plugin-json";

export default {
    // ... other configs
    plugins: [
        // ... other rollup plugins
        json({
            compact: true,
        }),
    ],
};
