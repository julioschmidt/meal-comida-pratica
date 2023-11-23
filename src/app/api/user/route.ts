import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { findUserByEmail } from "@/app/models/User";
import { getServerSession } from "next-auth";

export async function GET(request: Request) {
    const prisma = new PrismaClient();

    const session = await getServerSession()

    if (session?.user?.email) {
        const id = await findUserByEmail(session.user.email);

        const user = await prisma.users.findFirst({
            where: {
                id: id
            },
            include: {
                user_preferences: true,
            }
        })

        return NextResponse.json(user);
    }

}
