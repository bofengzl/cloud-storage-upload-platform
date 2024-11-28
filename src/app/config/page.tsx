'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { saveOssConfig } from '../actions'

interface OssConfig {
  accessKeyId: string
  accessKeySecret: string
  bucket: string
  region: string
}

export default function OssConfigPage() {
  const router = useRouter()
  const [config, setConfig] = useState<OssConfig>({
    accessKeyId: '',
    accessKeySecret: '',
    bucket: '',
    region: ''
  })

  useEffect(() => {
    const savedConfig = localStorage.getItem('ossConfig')
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig))
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('ossConfig', JSON.stringify(config))
    const result = await saveOssConfig(config)
    if (result.success) {
      router.push('/')
    } else {
      alert(result.message)
    }
  }

  const handleCancel = () => {
    router.push('/')
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>OSS 配置</CardTitle>
          <CardDescription>请输入您的 OSS 账户信息</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="accessKeyId">密钥ID（Access Key ID）</Label>
              <Input
                id="accessKeyId"
                name="accessKeyId"
                value={config.accessKeyId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accessKeySecret">密钥Secret（Access Key Secret）</Label>
              <Input
                id="accessKeySecret"
                name="accessKeySecret"
                type="password"
                value={config.accessKeySecret}
                placeholder=""
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bucket">存储桶名称（Bucket）</Label>
              <Input
                id="bucket"
                name="bucket"
                value={config.bucket}
                placeholder=""
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="region">OSS服务的地区/区域（Region）</Label>
              <Input
                id="region"
                name="region"
                value={config.region}
                placeholder="oss-cn-beujing"
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex items-center gap-2">
            <Button type="button" variant="outline" onClick={handleCancel}>取消</Button>
            <Button type="submit" className="flex-1">保存配置</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

