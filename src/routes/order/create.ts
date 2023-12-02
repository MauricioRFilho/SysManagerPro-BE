import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from 'zod';

export async function createOrder(app: FastifyInstance){
    app.post('/order/', async (req) => {
        const bodySchema = z.object({
            orderNumber: z.string(),
            amount: z.number(),
            dateCreated: z.date(),
            items: z.number(),
            status: z.boolean(),
            userId: z.number()
        });

        // Validar o corpo da solicitação
        const orderData = bodySchema.parse(req.body);

        try {
            // Verificar se o email já está em uso
            const existingOrder = await prisma.user.findFirst({
                where: {
                    email: orderData.orderNumber,
                },
            });

            if (existingOrder) {
                return {
                    error: "Busque o pedido pelo número do pedido.",
                };
            }

            // Criar o novo usuário no banco de dadosnp
            const order = await prisma.order.create({
                data: orderData,
            });

            return {
                order,
                message: "Pedido criado com sucesso, já disponivel na listagem de pedidos.",
            };
        } catch (error) {
            return {
                error: "Ocorreu um erro ao registrar o pedido.",
            };
        }
    });
}
