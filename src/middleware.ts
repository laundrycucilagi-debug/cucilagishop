import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_ACCESS_COOKIE } from "@/lib/auth/constants";
import { verifyAdminAccess } from "@/lib/auth/verify-admin";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get(ADMIN_ACCESS_COOKIE)?.value;
  const admin = accessToken ? await verifyAdminAccess(accessToken) : null;

  if (admin) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
