import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from 'zod';

export async function updatePost(app: FastifyInstance){
    app.put('/user/', async (req,res) => {
        const bodySchema = z.object({
            id: z.number(),
            username: z.string().optional(),
            email: z.string().email().optional(),
            password: z.string().optional(),
            status: z.boolean().optional(),
          });
        // Validar o corpo da solicitação
        const userData = bodySchema.parse(req.body)
        const userId = userData.id
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            
            if(user){
                const updtUser = {
                ...user,
                ...userData,
                }
                const returnUser = await prisma.user.update({
                    where: {
                        id: userId,
                    },
                    data: updtUser
                });
                return {
                    returnUser,
                    msg: "Usuário encontrado.",
                };
            }else{
                return {
                    user,
                    error: "Usuário não encontrado.",
                };
            }
        } catch (error) {
            return {
                error: "Ocorreu um erro ao encontrar o usuário.",
            };
        }
    });
}