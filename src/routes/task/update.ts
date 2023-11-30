import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from 'zod';

export async function updateTask(app: FastifyInstance){
    app.put('/task/', async (req) => {
        const bodySchema = z.object({
            id: z.number(),
            title: z.string().optional(),
            description: z.string().optional(),
            createdDate: z.date().optional(),
            userId: z.number().optional(),
            status: z.number().optional(),
            projectId: z.number().optional()
        });
        const taskData = bodySchema.parse(req.body);

        try {
            const task = await prisma.task.findUnique({
                where: {
                    id: taskData.id
                } 
            });
            if(task){
                var updtTask = {
                    ...task,
                    ...taskData
                }
                const updateTaks = await prisma.task.update({
                    where:{
                      id: task.id
                    },
                    data: updtTask 
                })

                return{
                    updateTaks,
                    success: "Tarefa atualizada com sucesso."
                }

            } else {
                return {
                    taskData,
                    error: "Tarefa não encontrada!",
                };
            }


        } catch (error) {
            return {
                error: "Ocorreu um erro ao registrar a tarefa.",
            };
        }
    });
}
