import { ArticleListLayout } from "@/components/Layouts/ArticleListLayout";
import { Spinner } from "@/components/element/Spinner";
import { ArticleCard } from "src/features/articles/components";
import { useGetArticles } from "src/features/articles/hooks/useGetArticles";
import type { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  const { data: articles, isLoading, error } = useGetArticles();
  if (isLoading) return <Spinner show={isLoading} />;
  if (error) return <p>{error.message}</p>;
  return (
    <>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <ArticleListLayout>{page}</ArticleListLayout>;
};
