import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from 'zod';

export async function createProject(app: FastifyInstance){
    app.post('/project/', async (req) => {
        const bodySchema = z.object({
            title: z.string(),
            description: z.string(),
            createdBy: z.number(),
            createdDate: z.date(),
            status: z.boolean()
        });

        // Validar o corpo da solicitação
        const projectData = bodySchema.parse(req.body);

        try {
            const project = await prisma.project.create({
                data: projectData,
            });

            return {
                project,
                success: "Projeto criado com sucesso!",
            };
        } catch (error) {
            return {
                error: "Ocorreu um erro ao registrar.",
            };
        }
    });
}
