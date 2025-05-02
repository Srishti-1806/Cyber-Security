"use client"
import Link from "next/link"
import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PublicNavbar() {
  // const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  // const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Shield className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">CyberShield</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/features" className="transition-colors hover:text-foreground/80">
              Features
            </Link>
            <Link href="/pricing" className="transition-colors hover:text-foreground/80">
              Pricing
            </Link>
            <Link href="/about" className="transition-colors hover:text-foreground/80">
              About
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center">
            <Link href="/auth/login">
              <Button variant="ghost" className="mr-2">
                Log in
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button>Sign up</Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
