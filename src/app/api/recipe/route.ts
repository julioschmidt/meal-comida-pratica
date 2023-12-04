import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { findUserByEmail } from "@/app/models/User";
import { getServerSession } from "next-auth";

export async function GET(request: Request) {
    const prisma = new PrismaClient();
    const { searchParams } = new URL(request.url)
    const id = Number(searchParams.get('id'));
        
    const recipe = await prisma.recipe.findFirst({
        where: {
            id: id
        },
        select: {
            id: true,
            name: true,
            cooking_time: true,
            portions: true,
            category: true,
            ingredients_description: true,
            instructions: true,
            image: {
                select: {
                    imagem_url: true
                }
            },
        }
    })
    return NextResponse.json(recipe);
    

}