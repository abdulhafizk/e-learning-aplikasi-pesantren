import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Check if the user is authenticated
  if (!session) {
    // If the user is not authenticated and trying to access a protected route
    if (req.nextUrl.pathname.startsWith("/dashboard")) {
      const redirectUrl = new URL("/login", req.url)
      return NextResponse.redirect(redirectUrl)
    }
  } else {
    // If the user is authenticated and trying to access login/register pages
    if (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register") {
      // Get user role to redirect to the appropriate dashboard
      const { data: userData } = await supabase.from("users").select("role").eq("id", session.user.id).single()

      if (userData) {
        const redirectUrl = new URL(userData.role === "santri" ? "/dashboard/santri" : "/dashboard/ustadz", req.url)
        return NextResponse.redirect(redirectUrl)
      }
    }
  }

  return res
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
}
