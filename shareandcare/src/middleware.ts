import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  const isPrivate =
    pathname.startsWith("/events/create") ||
    pathname.startsWith("/events/manage") ||
    pathname.startsWith("/events/joined");

  if (isPrivate && !sessionCookie) {
    const url = new URL("/login", request.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  if ((pathname === "/login" || pathname === "/register") && sessionCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/events/create",
    "/events/manage/:path*",
    "/events/joined",
    "/login",
    "/register",
  ],
};