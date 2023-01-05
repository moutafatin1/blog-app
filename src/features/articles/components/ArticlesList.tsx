import { Spinner } from "@/components/element/Spinner";
import { trpc } from "@/utils/trpc";
import { ArticleCard } from "./ArticleCard";

export const ArticlesList = () => {
  const { data: articles, isLoading, error } = trpc.article.all.useQuery();

  if (error) return <p>{error.message}</p>;
  return (
    <>
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
    </>
  );
};
