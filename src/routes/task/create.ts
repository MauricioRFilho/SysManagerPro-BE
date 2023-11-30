import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from 'zod';

export async function createTask(app: FastifyInstance){
    app.post('/task/', async (req) => {
        const bodySchema = z.object({
            title: z.string(),
            description: z.string(),
            createdDate: z.date(),
            userId: z.number(),
            status: z.number(),
            projectId: z.number()
        });
        const taskData = bodySchema.parse(req.body);

        try {
            const user = await prisma.task.create({
                data: taskData,
            });

            return {
                user,
                message: "Tarefa registrada com sucesso!",
            };
        } catch (error) {
            return {
                error: "Ocorreu um erro ao registrar a tarefa.",
            };
        }
    });
}
