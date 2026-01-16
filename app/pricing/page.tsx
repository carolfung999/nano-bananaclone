import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background pt-24 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Pricing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p>This is a placeholder pricing page.</p>
            <Button asChild className="bg-banana hover:bg-banana-dark text-banana-foreground">
              <Link href="/#generator">Launch Now</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
