import slugify from "slugify";
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

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
          user: true,
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
  new: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        body: z.string(),
        imageUrl: z.string()
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.article.create({
        data: {
          userId: ctx.session.user.id,
          body: input.body,
          title: input.title,
          description: input.body.slice(0, 300),
          slug: slugify(input.title, {
            lower: true,
            strict: true,
            remove: /[*+~.()'"!:@]/g,
          }),
          imageUrl: input.imageUrl,
        },
      });
    }),
});
