import OSS from 'ali-oss';

interface OssConfig {
  accessKeyId: string;
  accessKeySecret: string;
  bucket: string;
  region: string;
}

export function getOssClient(config: OssConfig) {
  return new OSS({
    accessKeyId: config.accessKeyId,
    accessKeySecret: config.accessKeySecret,
    bucket: config.bucket,
    region: config.region,
  });
}

export async function uploadToOSS(client: typeof OSS, file: File): Promise<string> {
  const fileArrayBuffer = Buffer.from(await file.arrayBuffer());
  console.log('%c🤪 ~ file: /Users/zl_bofeng/Documents/github/react/cloud-storage-upload-platform/src/utils/ossClient.ts:21 [uploadToOSS/fileArrayBuffer] -> fileArrayBuffer : ', 'color: #5cfe01', fileArrayBuffer);
  const result = await client.put(file.name, fileArrayBuffer);
  return result.url;
}

