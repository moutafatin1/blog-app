import { publicProcedure, router } from "../trpc";

export const articleRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.article.findMany();
  }),
});
