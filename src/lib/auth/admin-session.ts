import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_ACCESS_COOKIE } from "@/lib/auth/constants";
import { verifyAdminAccess } from "@/lib/auth/verify-admin";

export async function getAdminSession() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ADMIN_ACCESS_COOKIE)?.value;

  if (!accessToken) {
    return null;
  }

  return verifyAdminAccess(accessToken);
}

export async function requireAdmin() {
  const admin = await getAdminSession();

  if (!admin) {
    redirect("/admin/login");
  }

  return admin;
}
