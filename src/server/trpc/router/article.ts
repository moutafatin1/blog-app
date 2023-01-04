import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const articleRouter = router({
  all: publicProcedure
    .input(
      z
        .object({
          tagName: z.string().optional(),
        })
        .optional()
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.article.findMany({
        where: {
          tags: {
            some: {
              name: input?.tagName,
            },
          },
        },
        include: {
          tags: {
            where: {
              name: input?.tagName,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),
  bySlug: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.article.findUnique({
      where: {
        slug: input,
      },
    });
  }),
});
