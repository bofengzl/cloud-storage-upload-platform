'use server'

import { cookies } from 'next/headers'
import { uploadToOSS, getOssClient } from '@/utils/ossClient'

interface OssConfig {
  accessKeyId: string
  accessKeySecret: string
  bucket: string
  region: string
}

export async function saveOssConfig(config: OssConfig) {
  const cookieStore = await cookies()
  cookieStore.set('ossConfig', JSON.stringify(config), { httpOnly: true, secure: true })
  return { success: true, message: '配置已保存' }
}

export async function getOssConfig(): Promise<OssConfig | null> {
  const cookieStore = await cookies()
  const configCookie = cookieStore.get('ossConfig')
  return configCookie ? JSON.parse(configCookie.value) : null
}

export async function uploadFile(formData: FormData) {
  const file = formData.get('file') as File
  if (!file) {
    return { success: false, message: '没有选择文件' }
  }

  const config = await getOssConfig()
  console.log('##OSS配置###', config);
  if (!config) {
    return { success: false, message: 'OSS 配置未设置，请先配置 OSS 信息' }
  }

  try {
    const ossClient = getOssClient(config)
    const url = await uploadToOSS(ossClient, file)
    return { success: true, message: '上传成功', url }
  } catch (error) {
    console.error('上传失败:', error)
    return { success: false, message: '上传失败，请重试' }
  }
}

