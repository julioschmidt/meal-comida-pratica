import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { updateUser } from "../../../models/User";

export async function POST(request: Request) {
  const prisma = new PrismaClient();
  const body = await request.json();
  const user = await updateUser({
    email: body.email,
    name: body.name,
    username: body.username,
    quick_recipes: body.prefersQuickRecipes,
    lactose_intolerance: body.prefersIntLactose,
    gluten_intolerance: body.prefersIntGluten,
  });
  // console.log(id);
  if (!user) {
    return new NextResponse({
      status: 400,
      body: {
        message: "Error updating user",
      },
    } as any);
  }

  return new NextResponse({
    status: 200,
    body: {
      message: "User updated",
    },
  } as any);
}
