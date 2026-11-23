import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Scripts de deploy (HostGator/cPanel Passenger + FTP): Node CommonJS, fora do app Next.
    "server.js",
    "deploy.js",
  ]),
]);

export default eslintConfig;
