import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_ACCESS_COOKIE } from "@/lib/auth/constants";
import { verifyAdminSession } from "@/lib/auth/session";

export async function getAdminSession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ADMIN_ACCESS_COOKIE)?.value;

  if (!sessionToken) {
    return null;
  }

  return verifyAdminSession(sessionToken);
}

export async function requireAdmin() {
  const admin = await getAdminSession();

  if (!admin) {
    redirect("/admin/login");
  }

  return admin;
}
