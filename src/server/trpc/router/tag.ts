import { publicProcedure, router } from "../trpc";

export const tagRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.tag.findMany();
  }),
});
