import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

async function generateRandomRecipeId(): Promise<number> {
    const prisma = new PrismaClient()
    const recipeIds = await prisma.recipe.findMany({
        select:
        {
            id: true
        }
    })
    const listOfid = recipeIds.map((recipe) => recipe.id)
    const randomIndex = Math.floor(Math.random() * listOfid.length)
    return listOfid[randomIndex];
}

export async function GET(request: Request) {
    const prisma = new PrismaClient()
    const randomId = await generateRandomRecipeId()

    const recipeData = await prisma.recipe.findFirst({
        where: {
            id: randomId
        },
        select: {
            id: true,
            name: true,
            image: {
                select: {
                    imagem_url: true
                }
            },
        }
    })
    return NextResponse.json(recipeData)
}
