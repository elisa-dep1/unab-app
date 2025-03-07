import { NextResponse } from "next/server";

export async function GET() {
    const response = NextResponse.json({ message: "Logged out" });

    // Eliminar la cookie del navegador
    response.cookies.set("token", "", {
        expires: new Date(0), // Expira inmediatamente
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    });

    return response;
}
