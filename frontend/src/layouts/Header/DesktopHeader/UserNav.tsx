import { LogOut, User } from "lucide-react";

import { Avatar } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import Link from "next/link";
import { logOut } from "@api/auth/logOut";
import { useAppSelector } from "@toolkit/hook";
import Image from "next/image";
import { useRouter } from "next/router";

export function UserNav() {
  const { nickname, profileImage, isDancer } = useAppSelector(
    (state) => state.auth
  );
  const imageUrl = profileImage ? profileImage : "/images/avatar.png";
  const router = useRouter();

  return (
    <DropdownMenu>
      {/* 프로필 토글 버튼 */}
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          {/* 유저 프로필 이미지 */}
          <Avatar className="h-8 w-8">
            <Image
              src={imageUrl}
              alt="profile_image"
              className="object-cover"
              quality={10}
              fill
            />
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      {/* 드롭다운 메뉴 */}
      <DropdownMenuContent className="min-w-44" align="end" forceMount>
        {/* 유저 정보 */}
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center justify-between space-x-2">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{nickname}</p>
            </div>

            <span>{isDancer ? "Dancer" : "Danceable"}</span>
          </div>
        </DropdownMenuLabel>

        {/* 경계선 */}
        <DropdownMenuSeparator />

        {/* 메뉴 목록 */}
        <DropdownMenuGroup>
          <Link href="/profile">
            <DropdownMenuItem className="cursor-pointer hover:text-foreground">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        {/* 경계선 */}
        <DropdownMenuSeparator />

        {/* 로그아웃 버튼 */}
        <DropdownMenuItem
          className="cursor-pointer hover:text-foreground"
          onClick={async () => {
            const response = await logOut();
            if (response === true) {
              router.push("/");
            }
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
