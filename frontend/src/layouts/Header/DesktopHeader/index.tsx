import Logo from "@components/Logo";
import { UserNav } from "./UserNav";

import { useAppSelector } from "@toolkit/hook";
import SignInButton from "@layouts/Header/SignInButton";
import SideBar from "@layouts/SideBar";
import Search from "../Search";
import DarkToggle from "@components/ui/darkToggle";

export default function DesktopHeader() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isOpen = useAppSelector((state) => state.sideBar.isOpen);
  const paddingleft = isOpen ? "md:pl-[200px]" : "md:pl-[72px]";

  return (
    <div className="hidden w-full border-b bg-background px-4 md:block">
      <div className="grid h-[56px] w-full grid-cols-3 items-center justify-between gap-4">
        <div className="mr-auto flex items-center">
          {/* 사이드바 토글 버튼 */}
          <SideBar />

          {/* 로고 */}
          <Logo />
        </div>

        <div className={`col-center ${paddingleft}`}>
          <Search />
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <DarkToggle />

          {isAuthenticated ? (
            <>
              <UserNav />
            </>
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </div>
  );
}
