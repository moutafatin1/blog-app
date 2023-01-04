import { ArticleListLayout } from "@/components/Layouts/ArticleListLayout";
import { ArticlesList } from "src/features/article/components/ArticlesList";
import type { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <ArticlesList />
    </>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <ArticleListLayout>{page}</ArticleListLayout>;
};
