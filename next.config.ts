import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'dsd-nxt.oss-cn-hangzhou.aliyuncs.com'
    ],
    // 或者使用 remotePatterns
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'dsd-nxt.oss-cn-hangzhou.aliyuncs.com',
      },
      {
        protocol: 'https',
        hostname: 'dsd-nxt.oss-cn-hangzhou.aliyuncs.com',
      }
    ]
  },
};

export default nextConfig;
