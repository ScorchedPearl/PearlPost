import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";

const protectedRoutes = ["/feedback"];
const publicRoutes = ["/signin","/signup"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

      const cookie = (await cookies()).get("session")?.value;
      const session = await decrypt(cookie);
      if (isProtectedRoute && !session) {
        return NextResponse.redirect(new URL("/signin", req.nextUrl));
      }
    
      if (isPublicRoute && session) {
        return NextResponse.redirect(new URL("feedback", req.nextUrl));
      }
        console.log("Authenticated user:", session?.username);
        const response = NextResponse.next();
        response.headers.set("x-username", session?.username as string);
        return response;
    } 