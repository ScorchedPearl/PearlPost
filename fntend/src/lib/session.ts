import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";


const secretKey = "Hlo";
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(username: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ username, expiresAt });

  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
}

export async function deleteSession() {
  (await cookies()).delete("session");
}

type SessionPayload = {
  username: string;
  expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  if (!session) {
    console.log("No session provided");
    return null; 
  }
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    const { username, expiresAt } = payload as SessionPayload;

    return { username, expiresAt };
  } catch (error) {
    console.error("Failed to verify session",error);
    return null;
  }
}
export async function getUsernameFromSession() {
  const sessionCookie = (await cookies()).get("session")?.value;

  if (!sessionCookie) {
    console.log("No session cookie found");
    return null;
  }

  const sessionData = await decrypt(sessionCookie);

  if (!sessionData) {
    console.log("Invalid session or decryption failed");
    return null;
  }

  const { username } = sessionData;
  return username;
}