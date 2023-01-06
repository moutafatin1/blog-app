import { TiptapEditor } from "@/components/editor";
import { getServerAuthSession } from "@/server/common/get-server-auth-session";
import { trpc } from "@/utils/trpc";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const NewArticlePage = () => {
  const [newArticle, setNewArticle] = useState({
    title: "",
    body: "",
  });
  const utils = trpc.useContext();
  const router = useRouter();
  const newArticleMutation = trpc.article.new.useMutation();

  const handlePublish = () => {
    newArticleMutation.mutate(newArticle, {
      onSuccess: (data) => {
        router.push(`/article/${data.slug}`);
      },
    });
  };
  return (
    <div className="bg-gray-300">
      <div className="mx-auto  flex h-screen max-w-4xl flex-col gap-y-4 py-4">
        <header className="flex justify-between">
          <h1 className="text-3xl font-bold text-gray-700">Create New Post</h1>
          <Link
            href="/"
            className="rounded-lg bg-red-400 px-6 py-2 font-medium text-white"
          >
            Cancel
          </Link>
        </header>
        <div className="flex flex-col gap-y-4 rounded-lg bg-slate-50 p-4">
          <button className="mr-auto rounded-lg border border-indigo-500 px-6 py-2 text-indigo-500">
            Add a cover image
          </button>
          <input
            type="text"
            value={newArticle.title}
            name="title"
            onChange={(e) =>
              setNewArticle((old) => ({
                ...old,
                [e.target.name]: e.target.value,
              }))
            }
            placeholder="New post title here"
            className="w-full rounded-lg border-none bg-slate-50 text-4xl focus:ring-0"
          />
          <input
            type="text"
            className="rounded-lg border-none bg-slate-50 focus:ring-0"
            placeholder="add tags"
          />
        </div>
        <TiptapEditor
          setBody={(body) => setNewArticle((old) => ({ ...old, body }))}
        />
        <div className="flex items-center gap-x-4">
          <button
            onClick={handlePublish}
            className="rounded-lg bg-indigo-500 px-6 py-2 font-medium text-white"
          >
            Publish
          </button>
          <button className="rounded-lg border border-indigo-500 px-6 py-2 font-medium text-indigo-500">
            Save draft
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewArticlePage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
