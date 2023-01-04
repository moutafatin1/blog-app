import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const articleRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.article.findMany();
  }),
  bySlug: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.article.findUnique({
      where: {
        slug: input,
      },
    });
  }),
});
