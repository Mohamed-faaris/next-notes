/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  typescript: {
    // !! WARNING !!
    // This allows production builds to succeed even if
    // your project has type errors.
    // !! WARNING !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // ⚠️ WARNING: Allows production builds to succeed even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default config;
