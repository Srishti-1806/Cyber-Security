import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth/auth-provider"
import { FloatingChat } from "@/components/floating-chat"
import { NotificationSystem } from "@/components/notification-system"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CyberShield - Advanced Cybersecurity Monitoring Platform",
  description:
    "Real-time threat detection, vulnerability scanning, and AI-powered security insights to protect your digital assets.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AuthProvider>
            {children}
            <FloatingChat />
            <NotificationSystem />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
