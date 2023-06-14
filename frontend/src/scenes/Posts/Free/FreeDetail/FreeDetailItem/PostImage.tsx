import Image from "next/image";

interface PostImageProps {
  src: string;
  width: number;
  height: number;
}

export default function PostImage({
  src = "/images/avatar.jpg",
  width,
  height,
}: PostImageProps) {
  return (
    <div style={{ width, height }}>
      <Image src={src} alt={"post_image"} width={500} height={500} />
    </div>
  );
}
