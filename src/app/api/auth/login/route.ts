import { NextResponse } from "next/server";
import { ADMIN_ACCESS_COOKIE } from "@/lib/auth/constants";
import { verifyAdminAccess } from "@/lib/auth/verify-admin";
import { getSupabaseConfig } from "@/lib/supabase/config";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: unknown; password?: unknown };
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!EMAIL_PATTERN.test(email) || email.length > 160 || password.length < 8 || password.length > 128) {
      return loginError();
    }

    const { url, publishableKey } = getSupabaseConfig();
    const authResponse = await fetch(`${url}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: {
        apikey: publishableKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });

    if (!authResponse.ok) {
      return loginError();
    }

    const auth = (await authResponse.json()) as { access_token?: string; expires_in?: number };
    if (!auth.access_token) {
      return loginError();
    }

    const admin = await verifyAdminAccess(auth.access_token);
    if (!admin) {
      return loginError();
    }

    const response = NextResponse.json({ ok: true });
    response.headers.set("Cache-Control", "no-store");
    response.cookies.set(ADMIN_ACCESS_COOKIE, auth.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: Math.min(auth.expires_in || 3600, 3600),
    });
    return response;
  } catch {
    return loginError();
  }
}

function loginError() {
  return NextResponse.json({ error: "Email atau password salah." }, { status: 401 });
}
