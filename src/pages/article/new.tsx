import { TiptapEditor } from "@/components/editor";
import Button from "@/components/element/Button";
import { PreviewCoverImage } from "@/features/articles/components/PreviewCoverImage";
import { UploadCoverImage } from "@/features/articles/components/UploadCoverImage";
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
    imageUrl: "",
  });
  const utils = trpc.useContext();
  const router = useRouter();
  const newArticleMutation = trpc.article.new.useMutation();

  const setCoverImageUrl = (url: string) => {
    setNewArticle((old) => ({ ...old, imageUrl: url }));
  };
  const handlePublish = async () => {
    newArticleMutation.mutate(
      { ...newArticle },
      {
        onSuccess: (data) => {
          router.push(`/article/${data.slug}`);
        },
      }
    );
  };

  return (
    <div className="bg-gray-300">
      <div className="mx-auto flex min-h-screen  max-w-4xl flex-col gap-y-4 py-4">
        <header className="flex justify-between">
          <h1 className="text-3xl font-bold text-gray-700">Create New Post</h1>
          <div className="flex items-center gap-x-4">
            <Button
              onClick={handlePublish}
              className="rounded-lg bg-indigo-500 px-6 py-2 font-medium text-white"
              isLoading={newArticleMutation.isLoading}
            >
              {newArticleMutation.isLoading ? "Publishing" : "Publish"}
            </Button>
            <Link
              href="/"
              className="rounded-lg bg-red-400 px-6 py-2 font-medium text-white"
            >
              Cancel
            </Link>
          </div>
        </header>
        <div className="flex flex-col gap-2">
          <UploadCoverImage setCoverImageUrl={setCoverImageUrl} />
          <PreviewCoverImage
            url={newArticle.imageUrl}
            deleteImage={() =>
              setNewArticle((old) => ({ ...old, imageUrl: "" }))
            }
          />
        </div>
        <div className="relative flex flex-col gap-y-4   rounded-lg bg-slate-50 p-4">
          <div className="flex">
            {/* <button
              onClick={() => {
                uploadImageMutation.mutate(image.file as Blob, {
                  onSuccess(data, variables, context) {
                    setNewArticle((old) => ({
                      ...old,
                      imageUrl: data.secure_url,
                    }));
                    console.log(data.secure_url);
                  },
                });
              }}
              className="bg-teal-500 px-6 py-2 font-bold text-white"
            >
              {uploadImageMutation.isLoading ? "Uploading" : "Upload"}
            </button> */}
          </div>
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
