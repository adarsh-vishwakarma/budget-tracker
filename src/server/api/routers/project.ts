import { z } from "zod";
import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";

export const projectRouter = createTRPCRouter({
    createProject: privateProcedure.input(
        z.object({
            name: z.string(),
            githubUrl: z.string(),
            githubToken: z.string().optional()
        })
    ).mutation(async({ctx, input}) => {
       const project = await ctx.db.project.create({
        data: {
            name: input.name,
            githubUrl: input.githubUrl,
            userToProjects: {
                create: {
                    userId: ctx.user.userId!,
                }
            }
        }
       })
       return project
    }),
    getProjects: privateProcedure.query(async({ctx}) => {
        return await ctx.db.project.findMany({
            where: {
                userToProjects: {
                    some: {
                        userId: ctx.user.userId!
                    }
                },
                deletedAt: null
            }
        })
    })
})