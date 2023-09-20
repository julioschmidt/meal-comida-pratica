import { PrismaClient } from '@prisma/client'
import images from "./seeding_data/images.json" assert { type: "json" }

const prisma = new PrismaClient()

const imageData = images.map(({ id, ...rest }) => rest)

await prisma.image.createMany({ data: imageData })
