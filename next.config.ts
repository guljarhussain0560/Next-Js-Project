import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  experimental: {
    ppr: true,
  },
  devIndicators: {
    position: "top-right", // replacement for buildActivityPosition
  },
};

export default withSentryConfig(nextConfig, {
  org: "na-9dq",
  project: "javascript-nextjs",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  automaticVercelMonitors: true,
});
