import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍌</span>
            <span className="font-bold text-xl text-foreground">Nano Banana</span>
          </div>

          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">© 2026 Nano Banana. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
