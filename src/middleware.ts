import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const token = request.cookies.get("token");

  console.log(token);

  if (token === undefined && pathname !== "/authentication") {
    return NextResponse.redirect(new URL("/authentication", request.url));
  }

  if (token !== undefined && pathname === "/authentication") {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/", "/teachers", "/volunteers", "/authentication"],
};
