import type { ReactQueryOptions, RouterInputs } from "@/utils/trpc";
import { trpc } from "@/utils/trpc";

type ArticleInput = RouterInputs["article"]["all"];
type AllArticleOptions = ReactQueryOptions["article"]["all"];

export const useGetArticles = (options?: AllArticleOptions & ArticleInput) => {
  return trpc.article.all.useQuery(options);
};
