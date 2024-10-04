import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'

// 1. Specify protected and public routes as regular expressions
const protectedRoutes = [
  /^\/find-a-role$/,
  /^\/dashboard$/,
  /^\/corporate\/.*$/,
  /^\/individual\/.*$/
]
const publicRoutes = [
  /^\/auth\/login$/,
  /^\/auth\/signup$/,
]

export default async function middleware(req) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some(route => route.test(path))
  const isPublicRoute = publicRoutes.some(route => route.test(path))

  // 3. Decrypt the session from the cookie
  const cookie =   cookies().get('access_token')?.value
  let session
  if (cookie) {
    session = jwtDecode(cookie)
  }

  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.user_id) {
    return NextResponse.redirect(new URL(`/auth/login?next=${path}`, req.nextUrl))
  }

  // 6. Redirect to /dashboard if the user is authenticated
  // 6. Redirect to the appropriate dashboard based on user type
  if (isPublicRoute && session?.user_id) {
    // Check if user is corporate and redirect accordingly
    if (session.is_corporate) {
      return NextResponse.redirect(new URL('/corporate/dashboard', req.nextUrl))
    } else {
      return NextResponse.redirect(new URL('/Individual/dashboard', req.nextUrl))
    }
  }

  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
