import { Avatar } from "@components/ui/avatar";
import Image from "next/image";

export default function ProfileImage({ imageUrl }: { imageUrl: string | null }) {
  return (
    <Avatar className="h-8 w-8">
      {imageUrl ?<Image
        src={imageUrl}
        alt="profile_image"
        className="object-cover"
        quality={10}
        fill
      /> : <Image
        src="/images/avatar.png"
        alt="profile_image"
        className="object-cover"
        quality={10}
        fill
      />}
    </Avatar>
  );
}
