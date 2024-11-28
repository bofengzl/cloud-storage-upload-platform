'use client'

import { useState, useRef, useEffect } from 'react'
import { uploadFile, getOssConfig } from './actions'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { addUploadRecord, getUploadHistory } from '@/lib/db'
import { Copy } from 'lucide-react'


interface UploadRecord {
  id?: number;
  filename: string;
  url: string;
  timestamp: number;
}

export default function Home() {
  const [isUploading, setIsUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [uploadedUrl, setUploadedUrl] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')
  const [hasConfig, setHasConfig] = useState(false)
  const [uploadHistory, setUploadHistory] = useState<UploadRecord[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const initSetHasConfig = async () => {
    const savedConfig = await getOssConfig()
    setHasConfig(!!savedConfig)
  }

  useEffect(() => {
    initSetHasConfig()
    loadUploadHistory()
  }, [])

  const loadUploadHistory = async () => {
    const history = await getUploadHistory()
    setUploadHistory(history.reverse())
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsUploading(true)
    setMessage('')
    setUploadedUrl('')

    const formData = new FormData(event.currentTarget)
    const result = await uploadFile(formData)

    setIsUploading(false)
    setMessage(result.message)
    if (result.success && result.url) {
      setUploadedUrl(result.url)
      const file = formData.get('file') as File
      await addUploadRecord({
        filename: file.name,
        url: result.url,
        timestamp: Date.now()
      })
      loadUploadHistory()
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const localPreviewUrl = URL.createObjectURL(file)
      setPreviewUrl(localPreviewUrl)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('链接已复制到剪贴板')
    })
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>上传文件到阿里云存储</CardTitle>
          <CardDescription>选择文件并上传到您配置的云存储服务</CardDescription>
        </CardHeader>
        <CardContent>
          {hasConfig ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="file">选择文件</Label>
                <Input
                  type="file"
                  name="file"
                  id="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="mt-1"
                  required
                  accept="image/*"
                />
              </div>
              {previewUrl && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-500 mb-2">预览：</p>
                  <Image src={previewUrl} alt="Preview" width={200} height={200} className="rounded-lg object-cover" />
                </div>
              )}
              <Button type="submit" disabled={isUploading} className="w-full">
                {isUploading ? '上传中...' : '上传'}
              </Button>
            </form>
          ) : (
            <div className="text-center">
              <p className="mb-4">请先配置云存储信息</p>
              <Link href="/config">
                <Button variant="outline" className="w-full">
                  配置云存储信息
                </Button>
              </Link>
            </div>
          )}
          {message && (
            <p className={`mt-2 text-sm ${message.includes('成功') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
          {uploadedUrl && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-500">上传的文件URL：</p>
              <a href={uploadedUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">
                {uploadedUrl}
              </a>
            </div>
          )}
        </CardContent>
        {hasConfig && (
          <CardFooter>
            <Link href="/config">
              <Button variant="outline">更新云存储配置</Button>
            </Link>
          </CardFooter>
        )}
      </Card>

      {uploadHistory.length > 0 && (
        <Card className="w-full max-w-2xl mx-auto mt-8">
          <CardHeader>
            <CardTitle>上传历史</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {uploadHistory.map((record) => (
                <div key={record.id} className="flex items-center space-x-4">
                  <Image src={record.url} alt={record.filename} width={50} height={50} className="rounded-md object-cover" />
                  <div className="flex-grow">
                    <p className="text-sm font-medium">{record.filename}</p>
                    <p className="text-xs text-gray-500">{new Date(record.timestamp).toLocaleString()}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(record.url)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

