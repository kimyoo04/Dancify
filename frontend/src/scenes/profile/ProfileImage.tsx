import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Plus } from "lucide-react";

export default function ProfileImage() {
  return (
    <div className="row-center gap-2">
      <Avatar className="relative overflow-visible">
        {/* 프로필 이미지 */}
        <AvatarImage
          src="https://github.com/shadcn.png"
          className="rounded-full"
          alt="profile-image"
        />
        <AvatarFallback>CN</AvatarFallback>

        {/* 수정 버튼 */}
        <button className="absolute -bottom-2 -right-2 rounded-full bg-primary p-1">
          <Plus size={18} />
        </button>
      </Avatar>
    </div>
  );
}
