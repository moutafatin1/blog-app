import { Header } from "@/components/Header";
import { Spinner } from "@/components/Spinner";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";

const ArticlePage = () => {
  const router = useRouter();
  const { articleSlug } = router.query;

  const { data: article, isLoading } = trpc.article.bySlug.useQuery(
    typeof articleSlug === "string" ? articleSlug : ""
  );

  if (isLoading) {
    return <Spinner show={isLoading} />;
  }

  if (!article) {
    return <p>{articleSlug} not found</p>;
  }
  return (
    <div>
      <Header />
      <div className="relative bg-indigo-600 py-24">
        <div className="mx-auto mb-8 flex max-w-7xl  flex-col items-center justify-between gap-y-4 text-center">
          <h1 className="max-w-3xl text-3xl font-bold text-white">
            {article.title}
          </h1>
          <div className="flex items-center gap-x-4">
            <div className="h-12 w-12 rounded-full bg-gray-50"></div>
            <div className="flex flex-col">
              <span className="font-medium text-gray-50">Anna kniya</span>
              <span className="text-gray-200">Jun 27, 2020</span>
            </div>
          </div>
        </div>
        <img
          src={article.imageUrl}
          alt={article.title}
          className="absolute right-1/2 h-[35rem] max-w-7xl translate-x-1/2 rounded-2xl"
        />
      </div>
      <div className="mx-auto mt-[32rem]">
        <p className="prose mx-auto text-lg">{article.body}</p>
      </div>
    </div>
  );
};

export default ArticlePage;
