# 云存储上传平台

这是一个基于 Next.js 构建的云存储上传平台，支持多个云服务提供商，包括阿里云 OSS 和腾讯云 COS「暂未支持」。该平台允许用户配置自己的云存储账户信息，并提供简单直观的文件上传界面。

## 功能特点

- 支持多个云服务提供商（阿里云 OSS）
- 用户友好的配置界面
- 文件上传前预览
- 响应式设计，适配各种设备
- 安全的配置存储机制-存储本地缓存/indexDB
- 记录上传历史

## 技术栈

- [Next.js](https://nextjs.org/) - React 框架，用于服务端渲染和静态网站生成
- [React](https://reactjs.org/) - 用户界面库
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集，添加了静态类型
- [Tailwind CSS](https://tailwindcss.com/) - 用于快速 UI 开发的实用优先的 CSS 框架
- [shadcn/ui](https://ui.shadcn.com/) - 可重用的 React 组件库
- 云存储 SDK:
  - [ali-oss](https://github.com/ali-sdk/ali-oss) - 阿里云 OSS SDK
  - [cos-js-sdk-v5](https://github.com/tencentyun/cos-js-sdk-v5) - 腾讯云 COS SDK 目前暂未实现

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=bofengzl/cloud-storage-upload-platform.git&type=Date)](https://star-history.com/#bofengzl/cloud-storage-upload-platform.git&Date)
