import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Banana decorations */}
      <div className="absolute top-20 left-10 text-6xl rotate-[-30deg] opacity-20 select-none">🍌</div>
      <div className="absolute top-40 right-20 text-5xl rotate-[45deg] opacity-20 select-none">🍌</div>
      <div className="absolute bottom-20 left-1/4 text-4xl rotate-[15deg] opacity-15 select-none">🍌</div>
      <div className="absolute top-60 right-1/3 text-3xl rotate-[-20deg] opacity-10 select-none">🍌</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <Badge variant="outline" className="mb-6 px-4 py-2 border-banana/50 bg-banana/10">
          <span className="mr-2">🍌</span>
          The AI model that outperforms Flux Kontext
        </Badge>

        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance">Nano Banana</h1>

        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed text-pretty">
          Transform any image with simple text prompts. Nano Banana&apos;s advanced model delivers consistent character
          editing and scene preservation that surpasses Flux Kontext. Experience the future of AI image editing.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="bg-banana hover:bg-banana-dark text-banana-foreground px-8 py-6 text-lg">
            Start Editing
            <span className="ml-2">🍌</span>
          </Button>
          <Button size="lg" variant="outline" className="px-8 py-6 text-lg bg-transparent">
            View Examples
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <div className="flex justify-center gap-8 mt-12 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            One-shot editing
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            Multi-image support
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            Natural language
          </div>
        </div>
      </div>
    </section>
  )
}
