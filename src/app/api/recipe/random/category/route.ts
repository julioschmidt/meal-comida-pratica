import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth/next"
import { redirect } from 'next/navigation'

async function generateRandomRecipeId(category: string, quick: boolean, lactose: boolean, gluten: boolean): Promise<number> {
    const prisma = new PrismaClient()

    let whereClause: {
        category?: {
            contains: string;
        };
        cooking_time?: {
            endsWith: string;
        };
    } = {
        category: {
            contains: category,
        }
    };

    if (quick) {
        whereClause['cooking_time'] = {
            endsWith: 'min',
        };
    }

    const allRecipes = await prisma.recipe.findMany({
        where: whereClause,
        select: {
            id: true,
            ingredients_description: true
        },
    });

    let filteredRecipes = allRecipes;
    if (lactose) {
        filteredRecipes = filteredRecipes.filter(recipe => {
            for (let ingredient of recipe.ingredients_description) {
                if (ingredient.toLowerCase().includes('leite') || ingredient.toLowerCase().includes('queijo') || ingredient.toLowerCase().includes('chocolate')) {
                    return false;
                }
            }
            return true;
        });
    }

    if (gluten) {
        filteredRecipes = filteredRecipes.filter(recipe => {
            for (let ingredient of recipe.ingredients_description) {
                if (ingredient.toLowerCase().includes('trigo')) {
                    return false;
                }
            }
            return true;
        });
    }

    const listOfid = filteredRecipes.map((recipe) => recipe.id)
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
    const category: string = searchParams.get('category') || 'lanches'
    const quick = searchParams.get('quick') === 'true'
    const lactose = searchParams.get('lactose') === 'true'
    const gluten = searchParams.get('gluten') === 'true'

    const prisma = new PrismaClient()
    const randomId = await generateRandomRecipeId(category, quick, lactose, gluten)

    const recipeData = await prisma.recipe.findFirst({
        where: {
            id: randomId,
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