// rollup.config.js
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

import postcss from "rollup-plugin-postcss";
import url from 'rollup-plugin-url';
import { terser } from "rollup-plugin-terser";
// import copy from 'rollup-plugin-copy';
import peerDepsExternal from 'rollup-plugin-peer-deps-external'


export default [
  {
    input: 'src/index.ts', // 你的入口文件
    output: [
      // {
      //   dir: "dist/cjs",
      //   format: "cjs",
      //   sourcemap: true,
      // },
      {
        dir: "dist",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
      }),

      // image(),
      url({
        limit: 10000, // All files 10kB and below will be inlined as base64 data URLs
      }),
      postcss(),
      terser(),
      peerDepsExternal(),
      // copy({
      //   targets: [
      //     { src: 'public/*', dest: 'dist' },
      //   ]
      // }), // 复制public下的文件到dist下
    ],
    external: ['react', 'react-dom'], // 添加在这里
  },

  {
    input: "dist/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],

    external: [/\.css$/],
  },
];