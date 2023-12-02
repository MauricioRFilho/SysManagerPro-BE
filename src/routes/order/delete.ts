import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from 'zod';

export async function deleteUser(app: FastifyInstance){
    app.delete('/order/:id', async (req,res) => {
        const paramsSchema = z.object({
            id: z.number()
        });

        // Validar o corpo da solicitação
        const params = paramsSchema.parse(req.params);
        var id = params.id;
        try {
            // Verificar se o email já está em uso
            const exOrder = await prisma.order.findFirst({
                where: {
                    id: id,
                },
            });

            if (exOrder) {
                // Criar o novo usuário no banco de dadosnp
                const order = await prisma.order.delete({ where: { id: exOrder.id } })
                return {
                    order,
                    message: "Pedido deletado com sucesso!",
                };
            } else {
                return {
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
