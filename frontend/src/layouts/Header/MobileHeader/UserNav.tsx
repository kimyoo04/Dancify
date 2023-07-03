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
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import DarkToggle from "@components/ui/darkToggle";
import Link from "next/link";
import { logOut } from "@api/auth/logOut";
import { useAppSelector } from "@toolkit/hook";
import Image from "next/image";
import { useRouter } from "next/router";

export function UserNav() {
  const { nickname, profileImage } = useAppSelector((state) => state.auth);
  const imageUrl = profileImage ? profileImage : "/images/avatar.png";
  const router = useRouter();

  return (
    <DropdownMenu>
      {/* 프로필 토글 버튼 */}
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
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
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {/* 유저 정보 */}
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{nickname}</p>
            </div>

            <DarkToggle />
          </div>
        </DropdownMenuLabel>

        {/* 경계선 */}
        <DropdownMenuSeparator />

        {/* 메뉴 목록 */}
        <DropdownMenuGroup>
          <Link href="/profile">
            <DropdownMenuItem className="row-between w-full">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        {/* 경계선 */}
        <DropdownMenuSeparator />

        {/* 로그아웃 */}
        <DropdownMenuItem
          onClick={async () => {
            const response = await logOut();
            if (response === true) {
              router.push("/");
            }
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
