import Button from "@/components/element/Button";
import { handleUploadImage } from "@/utils/image";
import { useMutation } from "@tanstack/react-query";
import type { ChangeEvent } from "react";
import { useRef } from "react";

type UploadCoverImageProps = {
  setCoverImageUrl: (url: string) => void;
};

export const UploadCoverImage = ({
  setCoverImageUrl,
}: UploadCoverImageProps) => {
  const uploadImageMutation = useMutation({
    mutationFn: (file: Blob) => {
      return handleUploadImage(file);
    },
  });
  const ref = useRef<HTMLInputElement>(null);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && (e.target.files[0] as Blob);
    if (!file) return;
    uploadImageMutation.mutate(file, {
      onSuccess: ({ secure_url }) => {
        setCoverImageUrl(secure_url);
      },
    });
  };
  return (
    <div>
      <Button
        onClick={() => ref.current?.click()}
        className="rounded-full border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white"
        variant="outline"
        isLoading={uploadImageMutation.isLoading}
      >
        {uploadImageMutation.isLoading ? "Uploading" : "Add cover image"}
      </Button>
      <input
        ref={ref}
        onChange={handleChange}
        type="file"
        className="hidden  w-full cursor-pointer rounded-full border border-indigo-500 bg-transparent px-6 py-2 font-bold text-transparent text-indigo-500 transition hover:bg-indigo-500 hover:text-white"
      />
    </div>
  );
};
