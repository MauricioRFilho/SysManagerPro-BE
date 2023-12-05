import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from 'zod';

export async function deleteComment(app: FastifyInstance){
    app.delete('/comment/:commentId', async (req,res) => {
        const paramsSchema = z.object({
            commentId: z.string()
        });

        // Validar o corpo da solicitação
        const params = paramsSchema.parse(req.params);
        var id = parseInt(params.commentId);
        try {
            // Verificar se o email já está em uso
            const existingComment = await prisma.comment.findUnique({
                where: {
                    id: id,
                },
            });

            if (existingComment) {
                // Criar o novo usuário no banco de dadosnp
                const comment = await prisma.comment.delete({ where: { id: id } })
                return {
                    comment,
                    success: "Comentário deletado com sucesso!",
                };
            } else {
                return {
                    error: "Comentário não encontrado.",
                };
            }
        } catch (error) {
            return {
                error: "Ocorreu um erro ao encontrar o comentário.",
            };
        }
    });
}
