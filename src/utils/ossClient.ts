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
  const result = await client.put(file.name, fileArrayBuffer);
  return result.url;
}

