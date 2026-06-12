import { NextRequest, NextResponse } from "next/server";

function hasRefreshToken(request: NextRequest) {
  return Boolean(request.cookies.get("refreshToken")?.value);
}

export function middleware(request: NextRequest) {
  if (hasRefreshToken(request)) {
    return NextResponse.next();
  }

  const signInUrl = new URL("/signin", request.url);
  signInUrl.searchParams.set(
    "next",
    `${request.nextUrl.pathname}${request.nextUrl.search}`,
  );

  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
