import { Spinner } from "@/components/Spinner";
import { trpc } from "@/utils/trpc";
import { ArticleCard } from "./ArticleCard";

export const ArticlesList = () => {
  const { data: articles, isLoading, error } = trpc.article.all.useQuery();

  if (error) return <p>{error.message}</p>;
  return (
    <div className="mx-auto mt-16 grid max-w-7xl gap-4  sm:grid-cols-2 lg:grid-cols-3">
      {isLoading ? (
        <Spinner
          delay={400}
          show={isLoading}
          className="col-span-3 mx-auto text-7xl text-purple-500"
        />
      ) : (
        articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))
      )}
      {}
    </div>
  );
};
