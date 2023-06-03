import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

export default function Header() {
  return (
    <div className="w-full">
      <DesktopHeader />
      <MobileHeader />
    </div>
  );
}
