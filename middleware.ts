import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("currentUser")?.value
  const isLoggedIn = !!currentUser
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth/")
  const isApiRoute = request.nextUrl.pathname.startsWith("/api/")
  const isPublicRoute = request.nextUrl.pathname === "/"

  // Allow API routes to pass through
  if (isApiRoute) {
    return NextResponse.next()
  }

  // Redirect authenticated users trying to access auth pages to dashboard
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // Redirect authenticated users on the public home page to dashboard
  if (isLoggedIn && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // Redirect unauthenticated users trying to access protected routes to login
  if (!isLoggedIn && !isAuthPage && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
