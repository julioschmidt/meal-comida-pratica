import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth/next"
import { redirect } from 'next/navigation'

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

    const session = await getServerSession()
    
    if(!session) { 
        return redirect('http://localhost:3000/login')
    }

    const { searchParams } = new URL(request.url)
    const altura = searchParams.get('altura')
    const largura = searchParams.get('largura')

    const prisma = new PrismaClient()
    const randomId = await generateRandomRecipeId()

    const recipeData = await prisma.recipe.findFirst({
        where: {
            id: randomId
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

    if (altura && largura && recipeData && recipeData.image) {
        recipeData.image.imagem_url = recipeData.image.imagem_url?.replace('120x120', `${altura}x${largura}`) ?? null;
        return NextResponse.json(recipeData)
    }

    return NextResponse.json(recipeData)

}
