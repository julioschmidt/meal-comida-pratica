import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../utils/passwordUtils';

interface UserCreateArgs {
    email: string;
    cep: string;
    password: string;
}

async function getCepIdByValue(cep: string): Promise<number> {
    const prisma = new PrismaClient()
    const cepValue = await prisma.ceps.findFirst({
        where: {
            cep: cep
        }
    })

    if (!cepValue) {
        throw new Error('Cep not found')
    }
    return cepValue.id
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
export async function createUser({ email, cep, password }: UserCreateArgs): Promise<boolean> {
    const normCep = cep.replace("-", "");
    const cepId = await getCepIdByValue(normCep)

    const hashedPassword = await hashPassword(password)
    try {
        const prisma = new PrismaClient()

        const user = await prisma.users.create({
            data: {
                email: email,
                cep_id: cepId,
                password: hashedPassword
            }
        });
        return true;
    } catch (error) {
        console.error("Error creating user ", error)
        return false;
    }
}