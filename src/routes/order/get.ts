import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from 'zod';

export async function getUser(app: FastifyInstance){
    app.get('/user/:id', async (req,res) => {
        const paramsSchema = z.object({
            orderId: z.number().optional()
        });

        // Validar o corpo da solicitação
        const params = paramsSchema.parse(req.params);
        if(params.orderId != 0){
           var id = params.orderId;
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
                    msg: "Pedido encontrado.",
                };
            } else {
                const users = await prisma.user.findMany();
                return {
                    users,
                    msg: "Listagem de pedidos.",
                };
            }
        } catch (error) {
            return {
                error: "Ocorreu um erro ao encontrar os pedidos.",
            };
        }
    });
}