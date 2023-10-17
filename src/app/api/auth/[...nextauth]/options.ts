import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaClient } from "@prisma/client";
import { isSamePassword } from '../../../utils/passwordUtils'


async function findUserByEmail(email: string): Promise<any> {
    const prisma = new PrismaClient()
    const user = await prisma.users.findFirst({
        where: {
            email: email
        }
    })
    return user;
}

export const options: NextAuthOptions = {
    session: { 
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            authorize: async (credentials, req) => {
                const {email, password }  = credentials as  {
                    email: string;
                    password: string;
                }
                const user = await findUserByEmail(email)
                if(!user) throw new Error("User not found")
                const isPasswordValid = await isSamePassword(password, user.password)
                if(!isPasswordValid) throw new Error("Password is not valid")
                return user;
            },
        })
    ],
    pages: { 
        signIn: '/login',
    }
}