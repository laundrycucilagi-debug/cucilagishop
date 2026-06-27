import { NextResponse } from "next/server";
import { ADMIN_ACCESS_COOKIE } from "@/lib/auth/constants";
import { createAdminSession, getAdminSessionMaxAgeSeconds, verifyAdminCredentials } from "@/lib/auth/session";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: unknown; password?: unknown };
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!email || email.length > 254 || !password || password.length > 512) {
      return loginError();
    }

    const credential = verifyAdminCredentials(email, password);
    if (!credential.ok) {
      if (credential.reason === "misconfigured") {
        console.error("[auth/login] Admin login is not configured", { missing: credential.missing });
        return loginError("Login admin belum dikonfigurasi di server.", 503);
      }

      return loginError("Email atau password admin salah.");
    }

    const sessionToken = await createAdminSession(credential.email);
    const response = NextResponse.json({ ok: true });
    response.headers.set("Cache-Control", "no-store");
    response.cookies.set(ADMIN_ACCESS_COOKIE, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: getAdminSessionMaxAgeSeconds(),
    });
    return response;
  } catch (error) {
    console.error("[auth/login] Login request failed", error instanceof Error ? error.message : "Unknown error");
    return loginError("Login belum dapat diproses oleh server.", 503);
  }
}

function loginError(message = "Email atau password admin salah.", status = 401) {
  return NextResponse.json({ error: message }, { status });
}
