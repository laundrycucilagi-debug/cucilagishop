import { NextResponse } from "next/server";
import { ADMIN_ACCESS_COOKIE } from "@/lib/auth/constants";

export function POST() {
  const response = NextResponse.json({ ok: true });
  response.headers.set("Cache-Control", "no-store");
  response.cookies.set(ADMIN_ACCESS_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
