import { NextResponse } from "next/server";

export function middleware(request) {
    const loggedIn = request.cookies.has('sessionToken')


    if (!loggedIn && (request.nextUrl.pathname === "/movies" || request.nextUrl.pathname === "/music")) {
         return NextResponse.redirect(new URL('/login', request.url))
    }


    if (loggedIn && (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register")) {
         return NextResponse.redirect(new URL('/movies', request.url))
    }

    if (request.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL('/movies', request.url))
    }
}

export const config = {
    matcher: ["/","/movies","/music","/login","/register"]
}