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
  eslint: {
    // 忽略构建错误
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 忽略类型检查错误
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
