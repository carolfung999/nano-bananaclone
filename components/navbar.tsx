import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🍌</span>
            <span className="font-bold text-xl text-foreground">Nano Banana</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#generator" className="text-muted-foreground hover:text-foreground transition-colors">
              Editor
            </Link>
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#showcase" className="text-muted-foreground hover:text-foreground transition-colors">
              Showcase
            </Link>
            <Link href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </Link>
          </div>

          <Button className="bg-banana hover:bg-banana-dark text-banana-foreground">
            <span className="mr-2">🍌</span>
            Try Pro
          </Button>
        </div>
      </div>
    </nav>
  )
}
