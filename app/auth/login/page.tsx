import type { Metadata } from "next"
import Link from "next/link"
import { LoginForm } from "@/components/auth/login-form"
import { PublicNavbar } from "@/components/public-navbar"

export const metadata: Metadata = {
  title: "Login | CyberShield Security Dashboard",
  description: "Login to access your CyberShield Security Dashboard",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PublicNavbar />
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="relative mx-auto flex w-full max-w-[350px] flex-col space-y-6 p-4 pt-24">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground" />
            <div className="absolute -inset-1 rounded-full border border-primary/30" />
          </div>
          <h1 className="text-2xl font-bold">CyberShield</h1>
          <p className="text-sm text-muted-foreground">Enter your credentials to access the security dashboard</p>
        </div>
        <div className="cyber-border relative overflow-hidden rounded-lg p-6">
          <div className="scan-line" />
          <LoginForm />
        </div>
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
