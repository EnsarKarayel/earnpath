import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@earnpath/core", "@earnpath/db", "@earnpath/i18n"]
};

export default nextConfig;

