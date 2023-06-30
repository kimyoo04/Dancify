import Image from "next/image";

export default function PreviewImageUrl({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="w-full">
      <Image
        src={imageUrl}
        alt="previewImage"
        width={500}
        height={500}
        quality={50}
        className="h-full w-full"
      />
    </div>
  );
}
