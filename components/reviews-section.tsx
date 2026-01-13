import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const reviews = [
  {
    name: "AIArtistPro",
    role: "Digital Creator",
    avatar: "AA",
    content:
      "This editor completely changed my workflow. The character consistency is incredible - miles ahead of Flux Kontext!",
  },
  {
    name: "ContentCreator",
    role: "UGC Specialist",
    avatar: "CC",
    content:
      "Creating consistent AI influencers has never been easier. It maintains perfect face details across edits!",
  },
  {
    name: "PhotoEditor",
    role: "Professional Editor",
    avatar: "PE",
    content: "One-shot editing is basically solved with this tool. The scene blending is so natural and realistic!",
  },
]

export function ReviewsSection() {
  return (
    <section className="py-20 relative">
      {/* Banana decorations */}
      <div className="absolute top-20 left-20 text-4xl rotate-[-25deg] opacity-10 select-none">🍌</div>
      <div className="absolute bottom-10 right-20 text-5xl rotate-[20deg] opacity-10 select-none">🍌</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-banana uppercase tracking-wide mb-2">User Reviews</h2>
          <h3 className="text-4xl font-bold text-foreground">What creators are saying</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <Card
              key={index}
              className="border-border/50 bg-card hover:shadow-lg hover:border-banana/30 transition-all duration-300"
            >
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="bg-banana/20">
                    <AvatarFallback className="bg-banana/20 text-banana font-semibold">{review.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{review.name}</p>
                    <p className="text-sm text-muted-foreground">{review.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-banana text-banana" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">&quot;{review.content}&quot;</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
