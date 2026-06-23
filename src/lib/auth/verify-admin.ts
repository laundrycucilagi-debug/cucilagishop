import { getSupabaseConfig } from "@/lib/supabase/config";

export type AdminIdentity = {
  userId: string;
  email: string;
  accessToken: string;
};

export async function verifyAdminAccess(accessToken: string): Promise<AdminIdentity | null> {
  try {
    const { url, publishableKey } = getSupabaseConfig();
    const authHeaders = {
      apikey: publishableKey,
      Authorization: `Bearer ${accessToken}`,
    };

    const userResponse = await fetch(`${url}/auth/v1/user`, {
      headers: authHeaders,
      cache: "no-store",
    });

    if (!userResponse.ok) {
      return null;
    }

    const user = (await userResponse.json()) as { id?: string; email?: string };
    if (!user.id || !user.email) {
      return null;
    }

    const adminResponse = await fetch(
      `${url}/rest/v1/admin_users?user_id=eq.${encodeURIComponent(user.id)}&select=user_id,email&limit=1`,
      {
        headers: {
          ...authHeaders,
          Accept: "application/json",
        },
        cache: "no-store",
      },
    );

    if (!adminResponse.ok) {
      return null;
    }

    const admins = (await adminResponse.json()) as Array<{ user_id: string; email: string }>;
    if (!admins.length) {
      return null;
    }

    return {
      userId: user.id,
      email: user.email,
      accessToken,
    };
  } catch {
    return null;
  }
}
