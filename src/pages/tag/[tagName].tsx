import { ArticleListLayout } from "@/components/Layouts/ArticleListLayout";
import { Spinner } from "@/components/Spinner";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import { ArticleCard } from "src/features/article/components";
import type { NextPageWithLayout } from "../_app";

const SearchByTagPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { tagName } = router.query;
  const {
    data: articles,
    isLoading,
    error,
  } = trpc.article.all.useQuery({
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
