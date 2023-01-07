import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";

type PreviewCoverImageProps = {
  url: string;
  deleteImage: () => void;
};

export const PreviewCoverImage = ({
  url,
  deleteImage,
}: PreviewCoverImageProps) => {
  if (!url) return null;
  return (
    <div className="relative h-[30rem] w-full rounded-2xl">
      <Image
        src={url}
        alt="Cover Image"
        className="mx-auto rounded-2xl object-cover"
        fill
      />
      <button
        onClick={deleteImage}
        className="absolute right-0 top-0 z-50 m-1 rounded-2xl bg-black/75 p-2 transition hover:opacity-75"
      >
        <AiOutlineClose className="text-2xl text-white " />
      </button>
    </div>
  );
};
