import { ArticleListLayout } from "@/components/Layouts/ArticleListLayout";
import { Spinner } from "@/components/element/Spinner";
import { useRouter } from "next/router";
import { ArticleCard } from "src/features/articles/components";
import { useGetArticles } from "src/features/articles/hooks/useGetArticles";
import type { NextPageWithLayout } from "../_app";

const SearchByTagPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { tagName } = router.query;
  const {
    data: articles,
    isLoading,
    error,
  } = useGetArticles({
    tagName: typeof tagName === "string" ? tagName : undefined,
  });
  if (isLoading) return <Spinner show={isLoading} />;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      {articles.map((a) => (
        <ArticleCard key={a.id} article={a} />
      ))}
    </div>
  );
};

export default SearchByTagPage;

SearchByTagPage.getLayout = (page) => (
  <ArticleListLayout>{page}</ArticleListLayout>
);
