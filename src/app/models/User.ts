import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../utils/passwordUtils";
import { create } from "domain";

interface UserCreateArgs {
  email: string;
  cep: string;
  password: string;
}
interface UserUpdateArgs {
  email: string;
  name: string;
  username: string;
  quick_recipes: boolean;
  lactose_intolerance: boolean;
  gluten_intolerance: boolean;
}
// interface UserPreferencesUpdateArgs {
//   email: string;
// }
const prisma = new PrismaClient();

export async function findUserByEmail(email: string): Promise<any> {
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
    const id = await findUserByEmail(email);

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

export async function updateUser({
  email,
  name,
  username,
  quick_recipes,
  lactose_intolerance,
  gluten_intolerance,
  }: UserUpdateArgs): Promise<boolean> {
  try {
    // console.log(id);
    const id = await findUserByEmail(email);
    const user = await prisma.users.update({
      where: { id: id},
      data: {
        name: name,
        username: username,
      },
    });

    const userPreference = await prisma.user_preferences.findFirst({
      where: {
        user_id: id,
      }
    });

    if (userPreference) {

      const userPreferences = await prisma.user_preferences.update({
        where: { id : userPreference.id},
        data: {
          user_id: id,
          quick_recipes: quick_recipes,
          gluten_intolerance: gluten_intolerance,
          lactose_intolerance: lactose_intolerance,
        },
      });
    } else {
      const userPreferences = await prisma.user_preferences.create({
        data: {
          user_id: id,
          quick_recipes: quick_recipes,
          lactose_intolerance: lactose_intolerance,
          gluten_intolerance: gluten_intolerance,
        },
      });
    }

    return true;
  } catch (error) {
    console.log("Error updating user ", error);
    return false;
  }

}
