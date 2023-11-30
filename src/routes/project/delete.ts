import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from 'zod';

export async function deleteProject(app: FastifyInstance){
    app.delete('/project/:projectId', async (req,res) => {
        const paramsSchema = z.object({
            projectId: z.string()
        });

        // Validar o corpo da solicitação
        const params = paramsSchema.parse(req.params);
        var id = parseInt(params.projectId);
        try {
            // Verificar se o email já está em uso
            const existingProject = await prisma.project.findUnique({
                where: {
                    id: id,
                },
            });

            if (existingProject) {
                // Criar o novo usuário no banco de dadosnp
                const projectDeleted = await prisma.project.delete({ where: { id: id } })
                return {
                    projectDeleted,
                    success: "Projeto deletado com sucesso!",
                };
            } else {
                return {
                    error: "Projeto não encontrado, verifique o código do projeto.",
                };
            }
        } catch (error) {
            return {
                error: "Ocorreu um erro ao buscar os dados na base.",
            };
        }
    });
}
