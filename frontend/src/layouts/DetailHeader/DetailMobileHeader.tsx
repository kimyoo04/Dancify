import Logo from "@components/Logo";
import Search from "@components/ui/search";

import { useAppSelector } from "@toolkit/hook";
import SignInButton from "@layouts/Header/SignInButton";
import { UserNav } from "@layouts/Header/MobileHeader/UserNav";

export default function DetailMobileHeader() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="w-full border-b bg-background md:hidden">
      <div className="container flex h-16 w-full items-center justify-between gap-4">
        <div className="row-center">
          {/* 로고 */}
          <Logo />
        </div>

        <div className="ml-auto flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Search />
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
