import DesktopHeader from "@layouts/Header/DesktopHeader";
import { useAppSelector } from "@toolkit/hook";
import DetailMobileHeader from "./DetailMobileHeader";

export default function DetailHeader() {
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  return (
    <div className="w-full">
      {!isLoading && (
        <div className="fixed top-0 w-full">
          <DesktopHeader />
          <DetailMobileHeader />
        </div>
      )}
    </div>
  );
}
