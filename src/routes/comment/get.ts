import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from 'zod';

export async function getComment(app: FastifyInstance){
    app.get('/comment/:commentId', async (req,res) => {
        const paramsSchema = z.object({
            commentId: z.string().optional()
        });

        // Validar o corpo da solicitação
        var id = 0;
        const params = paramsSchema.parse(req.params);
        if(params.commentId != null){
            id = parseInt(params.commentId);
        }
        try {
            // Verificar se o email já está em uso
            if(id != 0){
                const comment = await prisma.user.findFirst({
                    where: {
                        id: id,
                    },
                });
                return {
                    comment,
                    success: "Comentário encontrado.",
                };
            } else {
                const comments = await prisma.user.findMany();
                return {
                    comments,
                    success: "Comentários encontrados.",
                };
            }
        } catch (error) {
            return {
                error: "Ocorreu um erro ao encontrar o usuário.",
            };
        }
    });
}