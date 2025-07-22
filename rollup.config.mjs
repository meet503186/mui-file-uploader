import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import dts from "rollup-plugin-dts";

const extensions = [".ts", ".tsx"];

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/mui-file-uploader.js",
        format: "esm",
        sourcemap: true,
      },
      {
        file: "dist/mui-file-uploader.cjs",
        format: "cjs",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      nodeResolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.node.json",
        jsx: "preserve",
      }),
      babel({
        babelHelpers: "bundled",
        extensions,
        exclude: "node_modules/**",
        presets: [
          ["@babel/preset-react", { runtime: "automatic" }],
          "@babel/preset-typescript",
        ],
      }),
    ],
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/types/index.d.ts", format: "es" }],
    plugins: [dts()],
  },
];
