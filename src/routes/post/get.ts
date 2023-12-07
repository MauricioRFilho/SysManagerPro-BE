import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from 'zod';

export async function getPost(app: FastifyInstance){
    app.get('/post/:userId', async (req,res) => {
        const paramsSchema = z.object({
            userId: z.string().optional()
        });

        // Validar o corpo da solicitação
        var id = 0;
        const params = paramsSchema.parse(req.params);
        if(params.userId != null){
            id = parseInt(params.userId);
        }
        try {
            // Verificar se o email já está em uso
            if(id != 0){
                const users = await prisma.user.findFirst({
                    where: {
                        id: id,
                    },
                });
                return {
                    users,
                    msg: "Usuário encontrado.",
                };
            } else {
                const users = await prisma.user.findMany();
                return {
                    users,
                    msg: "Usuários encontrados.",
                };
            }
        } catch (error) {
            return {
                error: "Ocorreu um erro ao encontrar o usuário.",
            };
        }
    });
}