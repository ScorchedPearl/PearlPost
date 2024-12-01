import { decrypt } from "../../lib/session";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(req: NextApiRequest, res:NextApiResponse) {
  const sessionCookie = req.cookies.session;
  if (!sessionCookie) {
    return res.status(401).json({ error: "No session found" });
  }

  const sessionData = await decrypt(sessionCookie);
  if (!sessionData) {
    return res.status(403).json({ error: "Invalid session" });
  }

  res.status(200).json({ username: sessionData.username });
}
