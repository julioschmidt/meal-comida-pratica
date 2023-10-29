import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { findUserByEmail } from "@/app/models/User";

export async function DELETE(request: Request) {
    const prisma = new PrismaClient();
    const requestBody = await request.json()

    const email = requestBody.sessionEmail
    const ingredientId = requestBody.ingredientsId

    const user = await findUserByEmail(email);

    const exist = await prisma.user_ingredient_storage.findFirst({
        where: {
            user_id: user,
            ingredient_id: ingredientId
        }
    })

    if (exist) {
        const deleteItem = await prisma.user_ingredient_storage.delete({
            where: {
                id: exist.id,
                user_id: user,
                ingredient_id: ingredientId,
            }
        })
        return NextResponse.json({ deleteItem });
    }
    return NextResponse.json("O ingrediente já existe");
}
