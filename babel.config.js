module.exports = {
  presets: ["babel-preset-expo"],
  plugins: [
    "inline-dotenv",
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [
          ".ios.ts",
          ".android.ts",
          ".ts",
          ".ios.tsx",
          ".android.tsx",
          ".tsx",
          ".jsx",
          ".js",
          ".json",
        ],
        alias: {
          types: "./src/types",
          "@assets": "./src/assets",
          "@common": "./src/common",
          "@components": "./src/components",
          "@navigations": "./src/navigations",
          "@src": "./src",
          "@store": "./src/store",
          "@styles": "./src/styles",
          "@utils": "./src/utils",
          "@views": "./src/views",
        },
      },
    ],
  ],
};
