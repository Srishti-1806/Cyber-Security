import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Lock, Globe, Database, Bot } from "lucide-react"

export default function HomePage() {
  return (
    <>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Advanced Cybersecurity Monitoring Platform
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Real-time threat detection, vulnerability scanning, and AI-powered security insights to protect your
                    digital assets.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/auth/register">
                    <Button size="lg" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/auth/login">
                    <Button size="lg" variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-[350px] rounded-full bg-primary/5 p-4">
                  <div className="absolute inset-0 rounded-full border border-primary/20" />
                  <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20" />
                  <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/40" />
                  <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
                  <div className="scan-line absolute inset-0 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">Key Features</h2>
              <p className="max-w-[85%] text-muted-foreground md:text-xl">
                Comprehensive security tools to protect your organization from cyber threats
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center gap-2 rounded-lg border border-border/50 bg-card p-6 text-center shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Vulnerability Scanner</h3>
                <p className="text-sm text-muted-foreground">
                  Identify and remediate security vulnerabilities across your network and applications.
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-lg border border-border/50 bg-card p-6 text-center shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Attack Map</h3>
                <p className="text-sm text-muted-foreground">
                  Visualize cyber attacks in real-time with our global threat intelligence map.
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-lg border border-border/50 bg-card p-6 text-center shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">CVE Database</h3>
                <p className="text-sm text-muted-foreground">
                  Access comprehensive information on known vulnerabilities and exposures.
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-lg border border-border/50 bg-card p-6 text-center shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">AI Assistant</h3>
                <p className="text-sm text-muted-foreground">
                  Get security insights and recommendations from our AI-powered assistant.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="cyber-border mx-auto flex max-w-5xl flex-col items-center gap-6 rounded-lg border border-primary/50 bg-card p-8 text-center shadow-lg">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold">Ready to secure your digital assets?</h2>
              <p className="max-w-[85%] text-muted-foreground md:text-xl">
                Join thousands of organizations that trust CyberShield for their security needs.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/auth/register">
                  <Button size="lg" className="w-full">
                    Start Free Trial
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button size="lg" variant="outline" className="w-full">
                    Schedule Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <span className="text-lg font-bold">CyberShield</span>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} CyberShield. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
