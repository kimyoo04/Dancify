import { useAppSelector } from "@toolkit/hook";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

export default function Header() {
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  return (
    <header className="w-full">
      {!isLoading && (
        <div className="fixed top-0 w-full">
          <DesktopHeader />
          <MobileHeader />
        </div>
      )}
    </header>
  );
}
