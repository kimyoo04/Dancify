import Logo from "@components/Logo";
import { UserNav } from "./UserNav";

import { useAppSelector } from "@toolkit/hook";
import SignInButton from "@layouts/Header/SignInButton";

export default function MobileHeader() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="w-full border-b bg-background px-4  md:hidden">
      <div className="grid h-[56px] w-full grid-cols-2 items-center justify-between gap-4">
        <div className="mr-auto flex items-center">
          {/* 로고 */}
          <Logo />
        </div>

        <div className="ml-auto flex items-center space-x-4">
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
