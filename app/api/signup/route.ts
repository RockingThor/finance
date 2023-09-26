import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import * as fs from "fs";

interface signUpProps {
    name: string;
    email: string;
    hashedPassword: string;
    username: string;
}
export async function POST(req: Request) {
    console.log(req.headers);
    const name = req.headers.get("name");
    const email = req.headers.get("email");
    const hashedPassword = req.headers.get("hashedPassword");
    const username = req.headers.get("username");
    if (name || email || hashedPassword || username) {
        return new NextResponse("Some data is missing", { status: 403 });
    } else {
        return new NextResponse("Yayy", { status: 200 });
    }
}
