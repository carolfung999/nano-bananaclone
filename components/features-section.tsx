import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, User, Layers, Zap, Images, Sparkles } from "lucide-react"

const features = [
  {
    icon: MessageSquare,
    title: "Natural Language Editing",
    description:
      "Edit images using simple text prompts. Nano Banana AI understands complex instructions like GPT for images",
  },
  {
    icon: User,
    title: "Character Consistency",
    description:
      "Maintain perfect character details across edits. This model excels at preserving faces and identities",
  },
  {
    icon: Layers,
    title: "Scene Preservation",
    description: "Seamlessly blend edits with original backgrounds. Superior scene fusion compared to Flux Kontext",
  },
  {
    icon: Zap,
    title: "One-Shot Editing",
    description:
      "Perfect results in a single attempt. Nano Banana solves one-shot image editing challenges effortlessly",
  },
  {
    icon: Images,
    title: "Multi-Image Context",
    description: "Process multiple images simultaneously. Support for advanced multi-image editing workflows",
  },
  {
    icon: Sparkles,
    title: "AI UGC Creation",
    description: "Create consistent AI influencers and UGC content. Perfect for social media and marketing campaigns",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 relative">
      {/* Banana decorations */}
      <div className="absolute top-10 right-10 text-5xl rotate-[30deg] opacity-10 select-none">🍌</div>
      <div className="absolute bottom-20 left-10 text-4xl rotate-[-15deg] opacity-10 select-none">🍌</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-banana uppercase tracking-wide mb-2">Core Features</h2>
          <h3 className="text-4xl font-bold text-foreground mb-4">Why Choose Nano Banana?</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nano Banana is the most advanced AI image editor on LMArena. Revolutionize your photo editing with natural
            language understanding
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-border/50 bg-card hover:shadow-lg hover:border-banana/30 transition-all duration-300 group"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-banana/10 flex items-center justify-center mb-4 group-hover:bg-banana/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-banana" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
