import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const showcaseItems = [
  {
    image: "/ai-generated-majestic-mountain-landscape-with-dram.jpg",
    title: "Ultra-Fast Mountain Generation",
    description: "Created in 0.8 seconds with Nano Banana's optimized neural engine",
  },
  {
    image: "/ai-generated-beautiful-japanese-zen-garden-with-ch.jpg",
    title: "Instant Garden Creation",
    description: "Complex scene rendered in milliseconds using Nano Banana technology",
  },
  {
    image: "/ai-generated-tropical-beach-sunset-with-palm-trees.jpg",
    title: "Real-time Beach Synthesis",
    description: "Nano Banana delivers photorealistic results at lightning speed",
  },
  {
    image: "/ai-generated-northern-lights-aurora-borealis-over-.jpg",
    title: "Rapid Aurora Generation",
    description: "Advanced effects processed instantly with Nano Banana AI",
  },
]

export function ShowcaseSection() {
  return (
    <section id="showcase" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-banana uppercase tracking-wide mb-2">Showcase</h2>
          <h3 className="text-4xl font-bold text-foreground mb-4">Lightning-Fast AI Creations</h3>
          <p className="text-muted-foreground">See what Nano Banana generates in milliseconds</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {showcaseItems.map((item, index) => (
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-banana/30 transition-all duration-300"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <Badge variant="secondary" className="mb-3 bg-banana/10 text-banana border-0">
                  <span className="mr-1">🍌</span> Nano Banana Speed
                </Badge>
                <h4 className="text-xl font-semibold text-foreground mb-2">{item.title}</h4>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Experience the power of Nano Banana yourself</p>
          <Button className="bg-banana hover:bg-banana-dark text-banana-foreground">
            <span className="mr-2">🍌</span>
            Try Nano Banana Generator
          </Button>
        </div>
      </div>
    </section>
  )
}
