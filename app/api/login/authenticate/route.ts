import { NextResponse } from "next/server";
import * as fs from "fs";
export async function GET(req: Request) {
    return new NextResponse("Access granted", { status: 200 });
}
