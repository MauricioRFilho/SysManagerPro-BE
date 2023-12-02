import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from 'zod';

export async function updateUser(app: FastifyInstance){
    app.put('/order/', async (req,res) => {
        const bodySchema = z.object({
            id: z.number(),
            orderNumber: z.string().optional(),
            dateCreated: z.date().optional(),
            userId: z.string().optional(),
            status: z.boolean().optional(),
            amount: z.number().optional(),
            items: z.number().optional()
          });
        // Validar o corpo da solicitação
        const orderData = bodySchema.parse(req.body)
        const id = orderData.id
        try {
            const order = await prisma.order.findUnique({
                where: {
                    id: id,
                },
            });
            
            if(order){
                const updtOrder = {
                ...order,
                ...orderData,
                }
                const returnOrder = await prisma.user.update({
                    where: {
                        id: id,
                    },
                    data: updtOrder
                });
                return {
                    returnOrder,
                    msg: "Pedido atualizado com sucesso.",
                };
            }else{
                return {
                    order,
                    error: "Pedido não encontrado.",
                };
            }
        } catch (error) {
            return {
                error: "Ocorreu um erro ao encontrar o pedido.",
            };
        }
    });
}