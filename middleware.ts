import { NextRequest, NextResponse } from "next/server";

const REFRESH_TOKEN_COOKIE_NAMES = [
  process.env.AUTH_REFRESH_COOKIE_NAME,
  process.env.REFRESH_TOKEN_COOKIE_NAME,
  "refreshToken",
  "refresh_token",
  "refresh-token",
  "animex_refresh_token",
].filter(Boolean) as string[];

function hasRefreshToken(request: NextRequest) {
  return REFRESH_TOKEN_COOKIE_NAMES.some((cookieName) =>
    Boolean(request.cookies.get(cookieName)?.value),
  );
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
