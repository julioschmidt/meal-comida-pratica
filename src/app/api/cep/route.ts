import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const cep = searchParams.get('cep');
    const prisma = new PrismaClient()

    const cepData = await prisma.ceps.findFirst({
        where: {
            cep: cep as string
        },
        select: {
            cep: true,
            logradouro: true,
            bairro: true,
            cities: {
                select: {
                    city_name: true,
                    state: {
                        select: {
                            state_name: true,
                            state_initials: true
                        }
                    }
                }
            }
        }
    })

    return NextResponse.json(cepData)
} 