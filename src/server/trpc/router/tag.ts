import { protectedProcedure, router } from "../trpc";

export const tagRouter = router({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.tag.findMany();
  }),
});
