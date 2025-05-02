"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { getSession, logout } from "@/lib/auth"

type User = {
  id: string
  name: string
  email: string
  role: string
} | null

type AuthContextType = {
  user: User
  isLoading: boolean
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    async function loadUserFromSession() {
      try {
        const session = await getSession()
        setUser(session)
      } catch (error) {
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    loadUserFromSession()
  }, [])

  useEffect(() => {
    // Redirect logic
    if (!isLoading) {
      const isAuthRoute = pathname?.startsWith("/auth")

      if (!user && !isAuthRoute && pathname !== "/") {
        // If not authenticated and not on an auth route, redirect to login
        router.push("/auth/login")
      } else if (user && isAuthRoute) {
        // If authenticated and on an auth route, redirect to dashboard
        router.push("/")
      }
    }
  }, [user, isLoading, pathname, router])

  const handleLogout = async () => {
    await logout()
    setUser(null)
    router.push("/auth/login")
  }

  const value = {
    user,
    isLoading,
    logout: handleLogout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
