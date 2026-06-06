import { publicClient } from '@/features/api/client'
import { NextRequest, NextResponse } from 'next/server'

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (request.nextUrl.pathname.startsWith('/api')) return

  const rawCookieHeader = request.headers.get('cookie')
  const user = (
    await publicClient.GET('/api/Account/user-info', { headers: { Cookie: rawCookieHeader } })
  ).data?.id

  //for auth pages
  if (pathname.startsWith('/auth')) {
    if (user) return NextResponse.redirect(new URL('/', request.url))
    return NextResponse.next()
  }

  //for other pages
  else if (
    pathname === '/' ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/activity') ||
    pathname.startsWith('/user')
  ) {
    if (!user) return NextResponse.redirect(new URL('/auth/signin', request.url))
  }
}

export const config = {
  matcher: [
    '/((?!api|_next|.*\\..*).*)',
    '/((?!api|_next/static|_next/image|robots.txt|sw.js|favicon.ico|manifest.json|.*\\.(?:svg|png|js|txt|jpg|jpeg|gif|webp|mp3|mp4)$).*)',
  ],
}
