import Image from "next/image";

interface PostImageProps {
  src: string | null;
}

export default function PostImage({ src }: PostImageProps) {
  return (
    <>
      {src !== "" && src !== null && (
        <div className="relative h-96 w-full overflow-hidden md:h-[500px] lg:h-[700px]">
          <Image
            src={src}
            alt={"post_image"}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
    </>
  );
}
