import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from 'zod';

export async function deleteUser(app: FastifyInstance){
    app.delete('/user/:userId', async (req,res) => {
        const paramsSchema = z.object({
            userId: z.string()
        });

        // Validar o corpo da solicitação
        const params = paramsSchema.parse(req.params);
        var id = parseInt(params.userId);
        try {
            // Verificar se o email já está em uso
            const exUser = await prisma.user.findFirst({
                where: {
                    id: id,
                },
            });

            if (exUser) {
                // Criar o novo usuário no banco de dadosnp
                const user = await prisma.user.delete({ where: { id: id } })
                return {
                    user,
                    message: "Conta deletada com sucesso!",
                };
            } else {
                return {
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
