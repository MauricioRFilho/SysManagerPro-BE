import { PrismaClient } from '../../prisma/generated/client/edge'

export const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB