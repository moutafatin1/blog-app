import { trpc } from "@/utils/trpc";
import { ArticleCard } from "./ArticleCard";

export const ArticlesList = () => {
  const { data: articles, isLoading, error } = trpc.article.all.useQuery();

  if (isLoading) return <p>Loading....</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <div className="mx-auto mt-16 grid max-w-7xl gap-4  sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};
