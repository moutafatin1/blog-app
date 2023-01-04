import type { Article } from "@prisma/client";
import Link from "next/link";

type ArticleCardProps = {
  article: Article;
};

export const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <article className="rounded-xl border ">
      <img
        src={article.imageUrl}
        alt={article.title}
        className="h-64 w-full rounded-t-xl bg-contain"
      />
      <div className="p-4">
        <Link
          href={`/article/${article.slug}`}
          className="text-xl font-bold text-gray-800"
        >
          {article.title}
        </Link>
        <p className="text-gray-600">{article.description}</p>
        <div className="flex items-center gap-x-4">
          <div className="h-10 w-10 rounded-full bg-gray-300"></div>
          <div className="flex flex-col">
            <span>Atan Ake</span>
            <span>May 13, 2022</span>
          </div>
        </div>
      </div>
    </article>
  );
};
