import { defineConfig, defineProject } from "vitest/config";
import swc from "unplugin-swc";
import { resolve } from "path";
import { loadEnvFile } from "process";

/* 
Vitest implements Vite's env variable solution, instead of Node's.
This means that instead of using process.env.<SOMETHING>
we use import.meta.VITE_<SOMETHING>
But here, because we are testing the server, and not a package with Vite, we need process.env.<SOMETHING>
So we loud it manually
*/
loadEnvFile(resolve(__dirname, "./.env.test"));

export default defineConfig(
  defineProject({
    test: {
      globals: true,
      root: "./src",
    },

    plugins: [
      // This is required to build the test files with SWC
      swc.vite({
        jsc: {
          parser: {
            syntax: "typescript",
            decorators: true,
            dynamicImport: true,
          },
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
          },
          target: "es2023",
        },
        tsconfigFile: "./tsconfig.json",
        // Explicitly set the module type to avoid inheriting this value from a `.swcrc` config file - comment from the nestjs docs
        module: { type: "es6" },
      }),
    ],
    resolve: {
      alias: {
        // Ensure Vitest correctly resolves TypeScript path aliases
        src: resolve(__dirname, "./src"),
        test: resolve(__dirname, "./test"),
      },
    },
  }),
);
