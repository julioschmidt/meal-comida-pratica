import { findUserByEmail } from '../../../models/User'
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'


interface SavedRecipeCreateArgs {
    userId: number;
    recipeId: number;
    savedAt: string;
}

async function insertSavedRecipe({ userId, recipeId, savedAt }: SavedRecipeCreateArgs) {
    const prisma = new PrismaClient()
    try {

        const savedRecipe = await prisma.user_saved_recipe.create({
            data: {
                user_id: userId,
                recipe_id: recipeId,
                saved_at: savedAt
            }
        })
        return true
    } catch (e) {
        console.error("Error saving recipe", e)
        return false
    }
}

export async function POST(request: Request) {
    const requestBody = await request.json()

    const userId = await findUserByEmail(requestBody.userEmail)
    console.log(requestBody.recipeId)
    const inserted = await insertSavedRecipe({
        userId: userId,
        recipeId: requestBody.recipeId,
        savedAt: new Date().toISOString()
    })

    if (!inserted) {
        return NextResponse.json("Error inserting saved recipe")
    }

    return NextResponse.json("Saved recipe")
}
