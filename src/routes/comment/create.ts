import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../../lib/prisma'

export async function createComment(app: FastifyInstance){
    app.post('/comment/', async (req) => {
        const bodySchema = z.object({
            text: z.string(),
            userId: z.number(),
            dateCreated: z.date(),
        });
        // Validar o corpo da solicitação
        const commentData = bodySchema.parse(req.body);

        // Adiciona a data atual ao objeto commentData
        commentData.dateCreated = new Date();

        try {
            // Comentario pode existir vários repetidos
            const comment = await prisma.comment.create({
                data: commentData,
            });

            return {
                comment,
                success: "Comentário registrado com sucesso!",
            };
        } catch (error) {
            return {
                error: "Ocorreu um erro ao registrar o comentário.",
            };
        }
    });
}
