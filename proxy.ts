import { publicClient } from '@/features/api/client'
import { NextRequest, NextResponse } from 'next/server'

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (request.nextUrl.pathname.startsWith('/api')) return

  const rawCookieHeader = request.headers.get('cookie')
  const user = (
    await publicClient.GET('/api/Account/user-info', { headers: { Cookie: rawCookieHeader } })
  ).data?.id

  //for dashboard
  if (pathname.startsWith('/dashboard')) {
    if (!user) return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  //for auth page
  else if (pathname.startsWith('/auth')) {
    if (user) return NextResponse.redirect(new URL('/dashboard', request.url))
    return NextResponse.next()
  }

  //for index page
  else if (pathname === '/') {
    if (!user) return NextResponse.redirect(new URL('/auth/signin', request.url))
  }
}

export const config = {
  matcher: [
    '/((?!api|_next|.*\\..*).*)',
    '/((?!api|_next/static|_next/image|robots.txt|sw.js|favicon.ico|manifest.json|.*\\.(?:svg|png|js|txt|jpg|jpeg|gif|webp|mp3|mp4)$).*)',
  ],
}
