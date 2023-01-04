import { router } from "../trpc";
import { articleRouter } from "./article";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { tagRouter } from "./tag";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  article: articleRouter,
  tag: tagRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
