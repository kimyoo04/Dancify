import { Heart, LogOut, ShoppingBagIcon, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
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

// !nickname, email, profile_img, jwt를 통해 받기

export function UserNav() {
  return (
    <DropdownMenu>
      {/* 프로필 토글 버튼 */}
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            {/* 유저 프로필 이미지 */}
            <AvatarImage src="/images/avatar.jpg" alt="profile_image" />
            {/* 기본 프로필 이미지 */}
            <AvatarFallback>
              <AvatarImage src="/images/avatar.jpg" alt="profile_image" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      {/* 드롭다운 메뉴 */}
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {/* 유저 정보 */}
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">shadcn</p>
            <p className="text-xs leading-none text-muted-foreground">
              m@example.com
            </p>
          </div>
        </DropdownMenuLabel>

        {/* 경계선 */}
        <DropdownMenuSeparator />

        {/* 메뉴 목록 */}
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Heart className="mr-2 h-4 w-4" />
            <span>likes</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ShoppingBagIcon className="mr-2 h-4 w-4" />
            <span>storage</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        {/* 경계선 */}
        <DropdownMenuSeparator />

        {/* 로그아웃 */}
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
