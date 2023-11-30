import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from 'zod';

export async function getProject(app: FastifyInstance){
    app.get('/user/:projectId', async (req,res) => {
        const paramsSchema = z.object({
            projectId: z.string().optional()
        });

        // Validar o corpo da solicitação
        var id = 0;
        const params = paramsSchema.parse(req.params);
        if(params.projectId != null){
            id = parseInt(params.projectId);
        }
        try {
            // Verificar se o email já está em uso
            if(id != 0){
                const project = await prisma.project.findFirst({
                    where: {
                        id: id,
                    },
                });
                return {
                    project,
                    success: "Projeto encontrado.",
                };
            } else {
                const projects = await prisma.project.findMany();
                return {
                    projects,
                    success: "Lista de projetos encontrados.",
                };
            }
        } catch (error) {
            return {
                error: "Ocorreu um erro ao encontrar o projeto.",
            };
        }
    });
}