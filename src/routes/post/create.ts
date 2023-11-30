import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from 'zod';

export async function createUser(app: FastifyInstance){
    app.post('/user/', async (req) => {
        const bodySchema = z.object({
            username: z.string(),
            email: z.string(),
            password: z.string(),
            status: z.boolean()
        });

        // Validar o corpo da solicitação
        const userData = bodySchema.parse(req.body);

        try {
            // Verificar se o email já está em uso
            const exUser = await prisma.user.findFirst({
                where: {
                    email: userData.email,
                },
            });

            if (exUser) {
                return {
                    error: "Está e-mail já existe na nosa base de dados.",
                };
            }

            // Criar o novo usuário no banco de dadosnp
            const user = await prisma.user.create({
                data: userData,
            });

            return {
                user,
                message: "Conta registrada com sucesso!",
            };
        } catch (error) {
            return {
                error: "Ocorreu um erro ao registrar o dado.",
            };
        }
    });
}
