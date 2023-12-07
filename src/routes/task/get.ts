import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from 'zod';

export async function getTask(app: FastifyInstance){
    app.get('/task/:taskId', async (req,res) => {
        const paramsSchema = z.object({
            taskId: z.string().optional()
        });

        // Validar o corpo da solicitação
        var id = 0;
        const params = paramsSchema.parse(req.params);
        if(params.taskId != null){
            id = parseInt(params.taskId);
        }
        try {
            // Verificar se o email já está em uso
            if(id != 0){
                const task = await prisma.task.findUnique({
                    where: {
                        id: id,
                    },
                });
                return {
                    task,
                    success: "Tarefa encontrado.",
                };
            } else {
                const tasks = await prisma.task.findMany();
                return {
                    tasks,
                    success: "Lista de Tarefas encontrados.",
                };
            }
        } catch (error) {
            return {
                error: "Ocorreu um erro ao relizar a busca.",
            };
        }
    });
}