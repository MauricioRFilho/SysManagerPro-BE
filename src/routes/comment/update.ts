import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from 'zod';

export async function updateComment(app: FastifyInstance){
    app.put('/comment/', async (req,res) => {
        const bodySchema = z.object({
            id: z.number(),
            text: z.string().optional(),
            userId: z.number().optional()
          });
        // Validar o corpo da solicitação
        const commentData = bodySchema.parse(req.body)
        const id = commentData.id
        try {
            const comment = await prisma.comment.findUnique({
                where: {
                    id: id,
                },
            });
            
            if(comment){
                const updateComment = {
                ...comment,
                ...commentData,
                }
                const returnComment = await prisma.comment.update({
                    where: {
                        id: id,
                    },
                    data: updateComment
                });
                return {
                    returnComment,
                    success: "Usuário encontrado.",
                };
            }else{
                return {
                    comment,
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