import { NextResponse } from "next/server";

export function GET(request: Request) {
    const data = {test: 'test', number: 1, boolean: true};

    return NextResponse.json(data)
}