// rollup.config.js
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
// import dts from "rollup-plugin-dts";

import postcss from "rollup-plugin-postcss";
// import postcssModules from 'postcss-modules';
import url from 'rollup-plugin-url';
import { terser } from "rollup-plugin-terser";
// import copy from 'rollup-plugin-copy';
import peerDepsExternal from 'rollup-plugin-peer-deps-external'


export default [
  {
    input: 'src/index.ts', // 你的入口文件
    inlineDynamicImports: true,
    output: [
      {
        file: "dist/index.cjs.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/index.esm.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: true,
        declarationDir: "dist/types",
      }),

      // image(),
      url({
        limit: 10000, // All files 10kB and below will be inlined as base64 data URLs
      }),
      postcss(),
      terser(),
      peerDepsExternal(),
    ],
    external: ['react', 'react-dom'], // 添加在这里
  },
];