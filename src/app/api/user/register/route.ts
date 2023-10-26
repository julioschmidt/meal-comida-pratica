import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createUser } from "../../../models/User";

export async function POST(request: Request) {
  const prisma = new PrismaClient();
  const body = await request.json();
  const user = await createUser({
    email: body.email,
    cep: body.cep,
    password: body.password,
  });

  if (!user) {
    return new NextResponse({
      status: 400,
      body: {
        message: "Error creating user",
      },
    } as any);
  }

  return new NextResponse({
    status: 200,
    body: {
      message: "User created",
    },
  } as any);
}
