import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from 'zod';

export async function deleteTask(app: FastifyInstance){
    app.delete('/task/:taskId', async (req,res) => {
        const paramsSchema = z.object({
            taskId: z.string()
        });

        // Validar o corpo da solicitação
        const params = paramsSchema.parse(req.params);
        var id = parseInt(params.taskId);
        try {
            // Verificar se o email já está em uso
            const existingTask = await prisma.task.findUnique({
                where: {
                    id: id,
                },
            });

            if (existingTask) {
                // Criar o novo usuário no banco de dadosnp
                const task = await prisma.task.delete({ where: { id: id } })
                return {
                    task,
                    success: "Tarefa removida com sucesso!",
                };
            } else {
                return {
                    error: "Tarefa não encontrado, verifique a código da tarefa digitado.",
                };
            }
        } catch (error) {
            return {
                error: "Ocorreu um erro ao encontrar o usuário.",
            };
        }
    });
}
