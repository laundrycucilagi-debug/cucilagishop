import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_ACCESS_COOKIE } from "@/lib/auth/constants";
import { verifyAdminSession } from "@/lib/auth/session";

export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get(ADMIN_ACCESS_COOKIE)?.value;
  const user = sessionToken ? await verifyAdminSession(sessionToken) : null;

  if (request.nextUrl.pathname === "/admin/login") {
    if (user) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return NextResponse.next();
  }

  if (user) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
