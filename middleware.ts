import { NextResponse, NextRequest } from "next/server";

export const middleware = (request: NextRequest) => {
  const response = NextResponse.redirect(new URL("/", request.url));

  if (request.nextUrl.searchParams.get("error")) {
    response.cookies.set("signInStatus", "unauthenticated");
  }

  return response;
};

export const config = {
  matcher: ["/api/auth/signin"],
};
