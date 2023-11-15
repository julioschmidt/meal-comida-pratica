import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../utils/passwordUtils";

interface UserCreateArgs {
  email: string;
  cep: string;
  password: string;
}
export async function findUserByEmail(email: string): Promise<any> {
  const prisma = new PrismaClient()
  const user = await prisma.users.findFirst({
    where: {
      email: email
    }
  })

  return user?.id
}
export async function createUser({
  email,
  cep,
  password,
}: UserCreateArgs): Promise<boolean> {
  const normCep = cep.replace("-", "");
  const hashedPassword = await hashPassword(password);
  try {
    const prisma = new PrismaClient();

    const user = await prisma.users.create({
      data: {
        email: email,
        cep: cep,
        password: hashedPassword,
      },
    });
    return true;
  } catch (error) {
    console.error("Error creating user ", error);
    return false;
  }
}
