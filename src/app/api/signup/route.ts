import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {email, password, firstName, lastName} = body;

        const response = await prisma.user.create({data: {email, password, name: `${firstName} ${lastName}`}})
        return NextResponse.json({...response}, {status: 200});
    }catch(error: any) {
        console.log(error);
        return NextResponse.json({error: error}, {status: 500});
    }
}