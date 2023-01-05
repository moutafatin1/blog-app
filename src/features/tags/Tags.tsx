import { trpc } from "@/utils/trpc";
import Link from "next/link";
import { Spinner } from "../../components/element/Spinner";

export const Tags = () => {
  const { data: tags, isLoading, error } = trpc.tag.all.useQuery();
  if (isLoading) {
    return <Spinner show={isLoading} />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <div className="mx-auto min-w-[16rem] rounded-2xl bg-gray-100 p-4">
      <h2 className=" text-2xl font-bold text-gray-700">Popular Tags</h2>
      <div className="mt-4 flex flex-wrap  gap-2">
        {tags.map((tag) => (
          <Link
            href={`/tag/${tag.name}`}
            key={tag.id}
            className="rounded-full bg-gray-400 px-3 py-1 text-sm font-medium text-white"
          >
            {tag.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
