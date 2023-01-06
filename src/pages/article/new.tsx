import { TiptapEditor } from "@/components/editor";
import { getServerAuthSession } from "@/server/common/get-server-auth-session";
import { trpc } from "@/utils/trpc";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const NewArticlePage = () => {
  const [image, setImage] = useState<{
    file?: File | null;
    previewUrl: string;
  }>({
    previewUrl:
      "https://media.sproutsocial.com/uploads/2018/04/Facebook-Cover-Photo-Size.png",
  });
  const [newArticle, setNewArticle] = useState({
    title: "",
    body: "",
  });
  const utils = trpc.useContext();
  const router = useRouter();
  const newArticleMutation = trpc.article.new.useMutation();

  const handlePublish = async () => {
    if (!image.file) return;

    const imageUrl = await handleUploadImage();

    newArticleMutation.mutate(
      { ...newArticle, imageUrl },
      {
        onSuccess: (data) => {
          router.push(`/article/${data.slug}`);
        },
      }
    );
  };

  const handleUploadImage = async () => {
    const formData = new FormData();
    formData.append("file", image.file as Blob);
    formData.append("upload_preset", "blogs3");
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dxv8dzviq/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    return data.secure_url as string;
  };
  return (
    <div className="bg-gray-300">
      <div className="mx-auto   flex h-screen max-w-4xl flex-col gap-y-4 py-4">
        <header className="flex justify-between">
          <h1 className="text-3xl font-bold text-gray-700">Create New Post</h1>
          <Link
            href="/"
            className="rounded-lg bg-red-400 px-6 py-2 font-medium text-white"
          >
            Cancel
          </Link>
        </header>
        <div className="relative flex flex-col gap-y-4  rounded-lg bg-slate-50 p-4">
          <div className="flex">
            <input
              onChange={(e) => {
                const file = e.target.files && e.target.files[0];
                setImage({
                  file,
                  previewUrl: URL.createObjectURL(file as Blob),
                });
              }}
              type="file"
              className=""
            />
            <button
              onClick={handleUploadImage}
              className="bg-teal-500 px-6 py-2 font-bold text-white"
            >
              Upload
            </button>
            <img
              src={image?.previewUrl}
              alt="Cover Image"
              className="absolute right-full -left-1/2 w-96 rounded-xl bg-contain"
            />
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
