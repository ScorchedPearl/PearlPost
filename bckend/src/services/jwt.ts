import { User } from "@prisma/client";
import { SignJWT, jwtVerify } from "jose";
import { JWTUser } from "../interfaces";

const secretKey = "Hlo";
const encodedKey = new TextEncoder().encode(secretKey);
interface JWTPayload extends JWTUser{
  [key: string]: any; 
}
class JWTService{
  public static async generateTokenForUser(user:User){
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt({ id:user.id, email:user.email,expiresAt:expiresAt });
    return session;
  }
  public static async decodeToken(token:string){
    if (!token) {
      console.log("No token provided");
      return undefined; 
    }
    try {
      const { payload } = await jwtVerify(token, encodedKey, {
        algorithms: ["HS256"],
      });
      const { id, email , expiresAt } = payload as JWTPayload;
      const user:JWTUser={
        id, email , expiresAt:new Date(expiresAt),
      }
      return user;
    } catch (error) {
      console.error("Failed to verify token",error);
      return undefined;
    }
  }
}
export default JWTService;
export async function encrypt(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}