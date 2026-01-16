import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ApiDocsPage() {
  return (
    <main className="min-h-screen bg-background pt-24 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>API</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-muted-foreground">
            <p>This is a placeholder page for API docs.</p>
            <p>Current backend endpoint: POST /api/generate</p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

