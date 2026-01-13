"use client"

import type React from "react"

import { useState, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Upload, ImageIcon, Sparkles, X } from "lucide-react"

export function EditorSection() {
  const [images, setImages] = useState<string[]>([])
  const [prompt, setPrompt] = useState("")
  const [model, setModel] = useState("nano-banana")
  const [isDragging, setIsDragging] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const readAndStoreFiles = useCallback((files: File[]) => {
    setError(null)
    const imageFiles = files.filter((file) => file.type.startsWith("image/"))

    imageFiles.forEach((file) => {
      if (file.size > 10 * 1024 * 1024) {
        setError("图片太大了（最大 10MB），请换一张再试。")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        if (!e.target?.result) return
        setImages((prev) => {
          if (prev.length >= 9) return prev
          return [...prev, e.target!.result as string]
        })
      }
      reader.readAsDataURL(file)
    })
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      readAndStoreFiles(Array.from(e.dataTransfer.files))
    },
    [readAndStoreFiles],
  )

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    readAndStoreFiles(Array.from(e.target.files || []))
    e.target.value = ""
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleGenerate = async () => {
    setError(null)
    setGeneratedImage(null)

    const trimmedPrompt = prompt.trim()
    if (!images[0]) {
      setError("请先点击 Add Image 上传一张图片。")
      return
    }
    if (!trimmedPrompt) {
      setError("请先在 Main Prompt 里输入提示词。")
      return
    }

    try {
      setIsGenerating(true)
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: trimmedPrompt, images: [images[0]] }),
      })

      const data = (await res.json()) as { image?: string; error?: string }
      if (!res.ok) {
        setError(data.error || "生成失败，请稍后重试。")
        return
      }
      if (!data.image) {
        setError("未收到模型返回的图片。")
        return
      }
      setGeneratedImage(data.image)
    } catch (err) {
      setError(err instanceof Error ? err.message : "生成失败，请稍后重试。")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <section id="generator" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold text-banana uppercase tracking-wide mb-2">Get Started</h2>
          <h3 className="text-4xl font-bold text-foreground">Try The AI Editor</h3>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Experience the power of Nano Banana&apos;s natural language image editing. Transform any photo with simple
            text commands
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Input */}
          <Card className="border-border/50 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-banana" />
                Prompt Engine
              </CardTitle>
              <p className="text-sm text-muted-foreground">Transform your image with AI-powered editing</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Tabs */}
              <Tabs defaultValue="img2img" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="img2img">Image to Image</TabsTrigger>
                  <TabsTrigger value="txt2img">Text to Image</TabsTrigger>
                </TabsList>
                <TabsContent value="img2img" className="mt-4">
                  <div className="space-y-4">
                    {/* Model Selection */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">AI Model Selection</Label>
                      <Select value={model} onValueChange={setModel}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nano-banana">🍌 Nano Banana</SelectItem>
                          <SelectItem value="nano-banana-pro">🍌 Nano Banana Pro</SelectItem>
                          <SelectItem value="seedream">SeeDream 4</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-1">
                        Different models offer unique characteristics and styles
                      </p>
                    </div>

                    {/* Batch Processing */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">Batch Processing</Label>
                        <span className="text-xs bg-banana/20 text-banana px-2 py-0.5 rounded">Pro</span>
                      </div>
                      <Switch disabled />
                    </div>

                    {/* Image Upload Area */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Reference Image <span className="text-muted-foreground">{images.length}/9</span>
                      </Label>
                      <div
                        className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
                          isDragging ? "border-banana bg-banana/10" : "border-border hover:border-banana/50"
                        }`}
                        role="button"
                        tabIndex={0}
                        onClick={() => fileInputRef.current?.click()}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click()
                        }}
                        onDragOver={(e) => {
                          e.preventDefault()
                          setIsDragging(true)
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          className="hidden"
                          accept="image/*"
                          multiple
                          onChange={handleFileSelect}
                        />
                        {images.length === 0 ? (
                          <div className="space-y-3">
                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto">
                              <Upload className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">Add Image</p>
                              <p className="text-xs text-muted-foreground">Max 10MB</p>
                            </div>
                            <Button
                              type="button"
                              variant="link"
                              className="text-banana"
                              onClick={(e) => {
                                e.stopPropagation()
                                fileInputRef.current?.click()
                              }}
                            >
                              Select from Library
                            </Button>
                          </div>
                        ) : (
                          <div className="grid grid-cols-3 gap-2">
                            {images.map((img, i) => (
                              <div key={i} className="relative aspect-square rounded-lg overflow-hidden group">
                                <img
                                  src={img || "/placeholder.svg"}
                                  alt={`Upload ${i + 1}`}
                                  className="w-full h-full object-cover"
                                />
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    removeImage(i)
                                  }}
                                  className="absolute top-1 right-1 w-6 h-6 bg-background/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                            {images.length < 9 && (
                              <label
                                className="aspect-square border-2 border-dashed border-border rounded-lg flex items-center justify-center cursor-pointer hover:border-banana/50 transition-colors"
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  fileInputRef.current?.click()
                                }}
                              >
                                <Upload className="h-6 w-6 text-muted-foreground" />
                              </label>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Prompt Input */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Main Prompt</Label>
                      <Textarea
                        placeholder="Describe how you want to transform your image..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="min-h-[100px] resize-none"
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="txt2img" className="mt-4">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Main Prompt</Label>
                      <Textarea
                        placeholder="Describe the image you want to generate..."
                        className="min-h-[150px] resize-none"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <Button
                className="w-full bg-banana hover:bg-banana-dark text-banana-foreground py-6 text-lg"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                {isGenerating ? "Generating..." : "Generate Now"}
              </Button>

              {error && <p className="text-sm text-destructive">{error}</p>}
            </CardContent>
          </Card>

          {/* Right Panel - Output */}
          <Card className="border-border/50 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-banana" />
                Output Gallery
              </CardTitle>
              <p className="text-sm text-muted-foreground">Your ultra-fast AI creations appear here instantly</p>
            </CardHeader>
            <CardContent>
              <div className="aspect-square rounded-xl bg-muted/50 border border-border flex flex-col items-center justify-center text-center p-4 overflow-hidden">
                {generatedImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={generatedImage} alt="Generated" className="w-full h-full object-contain" />
                ) : isGenerating ? (
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-full bg-banana/10 flex items-center justify-center mx-auto">
                      <Sparkles className="h-5 w-5 text-banana" />
                    </div>
                    <p className="text-sm text-muted-foreground">正在生成中…</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="w-16 h-16 rounded-full bg-banana/10 flex items-center justify-center mx-auto">
                      <span className="text-3xl">🍌</span>
                    </div>
                    <h4 className="font-semibold text-foreground">Ready for instant generation</h4>
                    <p className="text-sm text-muted-foreground">上传图片并输入提示词，然后点击 Generate Now</p>
                  </div>
                )}
              </div>

              <div className="mt-4 p-3 rounded-lg bg-muted/50 text-center">
                <p className="text-sm text-muted-foreground">Want more powerful image generation features?</p>
                <Button variant="link" className="text-banana">
                  Visit Full Generator →
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
