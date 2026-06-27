const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

const DEFAULT_ADMIN_EMAIL = "admin@cucilagi.com";
const ADMIN_USER_ID = "cucilagi-shop-admin";
const ADMIN_ROLE = "owner";

type AdminSessionPayload = {
  sub: string;
  email: string;
  role: typeof ADMIN_ROLE;
  name: string;
  iat: number;
  exp: number;
};

type AdminAuthConfig = {
  email: string;
  password: string;
  sessionSecret: string;
  missing: string[];
};

export type AuthenticatedUser = {
  userId: string;
  email: string;
  role: typeof ADMIN_ROLE;
  name: string;
};

export type AdminCredentialResult =
  | { ok: true; email: string }
  | { ok: false; reason: "misconfigured"; missing: string[] }
  | { ok: false; reason: "invalid" };

export function getAdminAuthConfig(): AdminAuthConfig {
  const email = readEnv("ADMIN_EMAIL") || DEFAULT_ADMIN_EMAIL;
  const password = readEnv("ADMIN_PASSWORD") || readEnv("SHOP_ADMIN_PASSWORD");
  const sessionSecret = readEnv("ADMIN_SESSION_SECRET") || readEnv("SUPABASE_SERVICE_ROLE_KEY");
  const missing: string[] = [];

  if (!password) {
    missing.push("ADMIN_PASSWORD");
  }

  if (!sessionSecret) {
    missing.push("ADMIN_SESSION_SECRET");
  }

  return {
    email: email.toLowerCase(),
    password,
    sessionSecret,
    missing,
  };
}

export function getAdminSessionMaxAgeSeconds() {
  const configured = Number.parseInt(readEnv("ADMIN_SESSION_MAX_AGE_SECONDS"), 10);
  return Number.isFinite(configured) && configured > 0 ? configured : 60 * 60 * 8;
}

export function isAdminAuthConfigured() {
  return getAdminAuthConfig().missing.length === 0;
}

export function verifyAdminCredentials(email: string, password: string): AdminCredentialResult {
  const config = getAdminAuthConfig();

  if (config.missing.length > 0) {
    return { ok: false, reason: "misconfigured", missing: config.missing };
  }

  const normalizedEmail = email.trim().toLowerCase();
  const isValidEmail = timingSafeStringEqual(normalizedEmail, config.email);
  const isValidPassword = timingSafeStringEqual(password, config.password);

  if (!isValidEmail || !isValidPassword) {
    return { ok: false, reason: "invalid" };
  }

  return { ok: true, email: config.email };
}

export async function createAdminSession(email: string): Promise<string> {
  const config = getAdminAuthConfig();

  if (config.missing.length > 0) {
    throw new Error(`Admin auth is not configured: ${config.missing.join(", ")}`);
  }

  const issuedAt = Math.floor(Date.now() / 1000);
  const payload: AdminSessionPayload = {
    sub: ADMIN_USER_ID,
    email: email.toLowerCase(),
    role: ADMIN_ROLE,
    name: "Admin Cucilagi Shop",
    iat: issuedAt,
    exp: issuedAt + getAdminSessionMaxAgeSeconds(),
  };
  const encodedPayload = base64UrlEncodeText(JSON.stringify(payload));
  const signature = await signTokenPart(encodedPayload, config.sessionSecret);

  return `v1.${encodedPayload}.${signature}`;
}

export async function verifyAdminSession(token: string | undefined): Promise<AuthenticatedUser | null> {
  if (!token) {
    return null;
  }

  const config = getAdminAuthConfig();
  if (!config.sessionSecret) {
    return null;
  }

  const [version, encodedPayload, signature] = token.split(".");
  if (version !== "v1" || !encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = await signTokenPart(encodedPayload, config.sessionSecret);
  if (!timingSafeStringEqual(signature, expectedSignature)) {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecodeText(encodedPayload)) as Partial<AdminSessionPayload>;
    const now = Math.floor(Date.now() / 1000);

    if (
      payload.sub !== ADMIN_USER_ID ||
      payload.role !== ADMIN_ROLE ||
      typeof payload.email !== "string" ||
      payload.email.toLowerCase() !== config.email ||
      typeof payload.exp !== "number" ||
      payload.exp <= now
    ) {
      return null;
    }

    return {
      userId: ADMIN_USER_ID,
      email: payload.email.toLowerCase(),
      role: ADMIN_ROLE,
      name: payload.name || "Admin Cucilagi Shop",
    };
  } catch {
    return null;
  }
}

function readEnv(name: string) {
  return process.env[name]?.trim() || "";
}

async function signTokenPart(encodedPayload: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    textEncoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, textEncoder.encode(`v1.${encodedPayload}`));
  return base64UrlEncodeBytes(new Uint8Array(signature));
}

function timingSafeStringEqual(left: string, right: string) {
  const maxLength = Math.max(left.length, right.length);
  let result = left.length ^ right.length;

  for (let index = 0; index < maxLength; index += 1) {
    result |= (left.charCodeAt(index) || 0) ^ (right.charCodeAt(index) || 0);
  }

  return result === 0;
}

function base64UrlEncodeText(value: string) {
  return base64UrlEncodeBytes(textEncoder.encode(value));
}

function base64UrlEncodeBytes(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecodeText(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return textDecoder.decode(bytes);
}
