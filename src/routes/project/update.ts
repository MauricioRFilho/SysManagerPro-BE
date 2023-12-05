import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from 'zod';

export async function updateProject(app: FastifyInstance){
    app.put('/project/', async (req,res) => {
        const bodySchema = z.object({
            id: z.number(),
            title: z.string().optional(),
            description: z.string().optional(),
            createdBy: z.number().optional(),
            createdDate: z.date().optional(),
            status: z.boolean().optional(),
          });
        // Validar o corpo da solicitação
        const projectData = bodySchema.parse(req.body)
        const id = projectData.id
        try {
            const project = await prisma.project.findUnique({
                where: {
                    id: id,
                },
            });
            
            if(project){
                const updtProject = {
                ...project,
                ...projectData,
                }
                const returnProject = await prisma.project.update({
                    where: {
                        id: id,
                    },
                    data: updtProject
                });
                return {
                    returnProject,
                    success: "Projeto atualizado com sucesso.",
                };
            }else{
                return {
                    project,
                    error: "Projeto não encontrado, verifique o código(id) do projeto.",
                };
            }
        } catch (error) {
            return {
                error: "Ocorreu um erro ao encontrar o usuário.",
            };
        }
    });
}