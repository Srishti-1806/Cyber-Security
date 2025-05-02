"use server"

import { cookies } from "next/headers"

// Mock user database - in a real app, this would be a database
const users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    password: "password123", // In a real app, this would be hashed
    role: "admin",
  },
]

// In a real app, you would use a proper authentication library
// and hash passwords securely
export async function login(email: string, password: string) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const user = users.find((u) => u.email === email && u.password === password)

  if (!user) {
    throw new Error("Invalid credentials")
  }

  // Set a secure HTTP-only cookie
  const cookieStore = cookies()
  cookieStore.set("auth-token", createAuthToken(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  }
}

export async function register(name: string, email: string, password: string) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Check if user already exists
  if (users.some((u) => u.email === email)) {
    throw new Error("User already exists")
  }

  // In a real app, you would hash the password and store in a database
  const newUser = {
    id: String(users.length + 1),
    name,
    email,
    password, // Would be hashed in a real app
    role: "user",
  }

  users.push(newUser)

  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
  }
}

export async function logout() {
  const cookieStore = cookies()
  cookieStore.delete("auth-token")
}

export async function resetPassword(email: string) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Check if user exists
  const user = users.find((u) => u.email === email)

  if (!user) {
    // In a real app, you might not want to reveal if an email exists
    // for security reasons, so we'll just return success anyway
    return { success: true }
  }

  // In a real app, you would send an email with a reset link
  return { success: true }
}

export async function getSession() {
  const cookieStore = cookies()
  const token = cookieStore.get("auth-token")

  if (!token) {
    return null
  }

  try {
    // In a real app, you would verify the token
    const payload = verifyAuthToken(token.value)

    if (!payload) {
      return null
    }

    const user = users.find((u) => u.id === payload.id)

    if (!user) {
      return null
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }
  } catch (error) {
    return null
  }
}

// Helper functions for token management
// In a real app, you would use a proper JWT library
function createAuthToken(user: (typeof users)[0]) {
  // This is a simplified version - in a real app, use a proper JWT
  return Buffer.from(
    JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      exp: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
    }),
  ).toString("base64")
}

function verifyAuthToken(token: string) {
  try {
    const payload = JSON.parse(Buffer.from(token, "base64").toString("utf-8"))

    if (payload.exp < Date.now()) {
      return null
    }

    return payload
  } catch (error) {
    return null
  }
}
