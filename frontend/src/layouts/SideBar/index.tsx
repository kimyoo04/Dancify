import SideBarToggle from "./SideBarToggle";
import { useAppDispatch } from "@toolkit/hook";
import { sidebarActions } from "@features/sideBar/sideBarSlice";

export default function SideBar() {
  const dispatch = useAppDispatch();

  return (
    <SideBarToggle toggle={() => dispatch(sidebarActions.toggleSidebar())} />
  );
}
