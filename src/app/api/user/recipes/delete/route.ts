import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { findUserByEmail } from "@/app/models/User";

export async function DELETE(request: Request) {
    const prisma = new PrismaClient();
    const requestBody = await request.json()

    const email = requestBody.sessionEmail
    const recipeId = requestBody.id

    const user = await findUserByEmail(email);

    const exist = await prisma.user_saved_recipe.findFirst({
        where: {
            user_id: user,
            recipe_id: recipeId,
        }
    })

    if (exist) {
        const deleteItem = await prisma.user_saved_recipe.delete({
            where: {
                id: exist.id,
                user_id: user,
                recipe_id: recipeId,
            }
        })
        return NextResponse.json({ deleteItem });
    }
    return NextResponse.json("O ingrediente já existe");
}
