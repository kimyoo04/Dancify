import Image from "next/image";

interface PostImageProps {
  src: string;
}

export default function PostImage({
  src = "/images/avatar.jpg",
}: PostImageProps) {
  return (
    <div className="relative h-96 w-full overflow-hidden">
      <Image src={src} alt={"post_image"} fill style={{ objectFit: "cover" }} />
    </div>
  );
}
