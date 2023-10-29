import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { findUserByEmail } from "@/app/models/User";
import { getServerSession } from "next-auth";

export async function GET(request: Request) {
    const prisma = new PrismaClient();

    const session = await getServerSession()

    if (session?.user?.email) {
        const user = await findUserByEmail(session.user.email);

        const armazem = await prisma.user_ingredient_storage.findMany({
            where: {
                user_id: user
            },
            select: {
                ingredient_id: true,
                ingredients: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            }
        })

        return NextResponse.json(armazem);
    }

}
