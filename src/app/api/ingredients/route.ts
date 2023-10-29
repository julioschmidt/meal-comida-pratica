import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(request: Request) {
    const prisma = new PrismaClient();

    const ingredients = await prisma.ingredients.findMany({
        select: {
            id: true,
            name: true,
        },
    });

    return NextResponse.json({
        ingredients: ingredients,
    });
}
