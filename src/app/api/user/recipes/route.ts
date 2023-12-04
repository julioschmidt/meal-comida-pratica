import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { findUserByEmail } from "@/app/models/User";
import { getServerSession } from "next-auth";

export async function GET(request: Request) {
    const prisma = new PrismaClient();

    const session = await getServerSession();

    if (session?.user?.email) {
        const id = await findUserByEmail(session.user.email);
        
        const savedRecipes = await prisma.user_saved_recipe.findMany({
            where: {
                user_id: id
            },
        })
        return NextResponse.json(savedRecipes);
    }

}
