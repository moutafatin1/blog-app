import type { Article, Tag, User } from "@prisma/client";
import Link from "next/link";
import { BsBookmarkPlus, BsHandThumbsUp } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";

type ArticleCardProps = {
  article: Article & {
    user: User;
    tags: Tag[];
  };
};

export const ArticleCard = ({ article }: ArticleCardProps) => {
  console.log("🚀 ~ file: ArticleCard.tsx:13 ~ ArticleCard ~ article", article);
  return (
    <article className="flex flex-col gap-4  border p-4">
      <div className="flex gap-4">
        <div className="space-y-4">
          <div className="flex items-center gap-x-4">
            <img
              src={article.user.image ?? undefined}
              alt={article.user.name ?? undefined}
              className="h-12 w-12 rounded-full"
            />
            <div className="flex flex-col">
              <span className="font-medium text-gray-800">
                {article.user.name}
              </span>
              <span className="text-gray-500">
                {article.createdAt.toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{article.title}</h3>
            <p className="text-gray-600  line-clamp-3">{article.body}</p>
          </div>
        </div>
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-1/3 rounded-2xl"
        />
      </div>
      <div className="flex items-center gap-2">
        {article.tags.map((tag) => (
          <Link
            href={`/tag/${tag.name}`}
            key={tag.name}
            className="rounded-full border px-3 py-1 text-sm font-medium capitalize text-gray-500 transition hover:bg-gray-200 hover:text-slate-600"
          >
            #{tag.name}
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <button className="group flex items-center gap-x-2 text-gray-500">
            <BsHandThumbsUp className="text-2xl group-hover:text-pink-500" />3
            Reactions
          </button>
          <button className="group flex items-center gap-x-2 text-gray-500">
            <FaRegComment className="text-2xl group-hover:text-emerald-500" />6
            Comments
          </button>
        </div>
        <button className="text-gray-700 hover:text-indigo-500">
          <BsBookmarkPlus className="text-2xl" />
        </button>
      </div>
    </article>
  );
};
