import type { ReactNode } from "react";
import { ArticlesList } from "src/features/article/components/ArticlesList";
import { Header } from "../Header";
import { Hero } from "../Hero";
import { Tags } from "../Tags";
import { ViewArticlesBy } from "../ViewArticlesBy";

type ArticleListLayout = {
  children: ReactNode;
};

export const ArticleListLayout = ({children}:ArticleListLayout) => {
  return (
    <div className="p-4">
      <Header />
      <Hero />
      <div className="mx-auto mt-16 flex max-w-7xl items-start gap-4">
        <div className="rounded-2xl border">
          <ViewArticlesBy />
          <div className="mx-auto grid gap-4 rounded-2xl pt-4  sm:grid-cols-2">
            {children}
          </div>
        </div>
        <Tags />
      </div>
    </div>
  );
};
