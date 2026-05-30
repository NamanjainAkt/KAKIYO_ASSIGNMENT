import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    // We allow public auth routes
    const publicRoutes = ['/sign-in', '/sign-up', '/api/auth'];
    if (publicRoutes.some(route => pathname.startsWith(route)) || pathname === '/') {
        return NextResponse.next();
    }
    
    // Simple cookie check for session presence before letting them hit protected routes
    const sessionCookie = request.cookies.get("better-auth.session_token") || request.cookies.get("__Secure-better-auth.session_token");
    if (!sessionCookie) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
