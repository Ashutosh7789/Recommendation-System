import { NextResponse } from "next/server";

export function middleware(request) {
    const loggedIn = request.cookies.has('sessionToken')

    if (loggedIn && (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register")) {
         return NextResponse.redirect(new URL('/', request.url))
    }

}

export const config = {
    matcher: ["/login","/register"]
}