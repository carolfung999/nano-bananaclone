import { NextResponse } from "next/server"

type GenerateRequestBody = {
  prompt: string
  images: string[]
}

type OpenRouterImagePart = {
  type: "image_url"
  image_url: {
    url: string
  }
}

type OpenRouterResponse = {
  choices?: Array<{
    message?: {
      images?: Array<{
        image_url?: { url?: string }
        type?: string
        mimeType?: string
        content?: string
      }>
      content?: unknown
    }
  }>
  error?: { message?: string }
}

function normalizeReturnedImageUrl(value: string, fallbackMimeType: string) {
  const trimmed = value.trim()
  if (trimmed.startsWith("data:")) return trimmed
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `data:${fallbackMimeType};base64,${trimmed}`
}

function extractDataUrlFromContent(content: unknown) {
  if (typeof content !== "string") return null
  const match = content.match(/data:image\/[a-zA-Z0-9+.-]+;base64,[A-Za-z0-9+/=]+/)
  return match?.[0] ?? null
}

export async function POST(req: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: "Missing OPENROUTER_API_KEY" }, { status: 500 })
  }

  let body: GenerateRequestBody
  try {
    body = (await req.json()) as GenerateRequestBody
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const prompt = (body.prompt ?? "").trim()
  const images = Array.isArray(body.images) ? body.images.filter(Boolean) : []

  if (!prompt) return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
  if (images.length === 0) return NextResponse.json({ error: "At least one image is required" }, { status: 400 })

  const origin = req.headers.get("origin") ?? undefined
  const siteUrl = process.env.OPENROUTER_SITE_URL ?? origin
  const siteTitle = process.env.OPENROUTER_SITE_TITLE ?? "image-editor-clone"

  const content: Array<{ type: "text"; text: string } | OpenRouterImagePart> = [{ type: "text", text: prompt }]
  for (const imageUrl of images.slice(0, 1)) {
    content.push({ type: "image_url", image_url: { url: imageUrl } })
  }

  const upstreamRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...(siteUrl ? { "HTTP-Referer": siteUrl } : {}),
      ...(siteTitle ? { "X-Title": siteTitle } : {}),
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash-image",
      modalities: ["image", "text"],
      messages: [{ role: "user", content }],
    }),
  })

  if (!upstreamRes.ok) {
    const text = await upstreamRes.text().catch(() => "")
    return NextResponse.json(
      { error: `Upstream error (${upstreamRes.status})`, details: text.slice(0, 2000) },
      { status: 502 },
    )
  }

  const data = (await upstreamRes.json()) as OpenRouterResponse
  const message = data.choices?.[0]?.message
  const first = message?.images?.[0]

  const returnedUrl = first?.image_url?.url ?? extractDataUrlFromContent(message?.content)
  const mimeType = first?.mimeType || "image/png"

  if (!returnedUrl) {
    return NextResponse.json(
      { error: "No image returned from model", raw: message ?? null },
      { status: 502 },
    )
  }

  return NextResponse.json({ image: normalizeReturnedImageUrl(returnedUrl, mimeType) })
}
