import { useAppDispatch } from "@toolkit/hook";
import { searchActions } from "@features/search/searchSlice";

export default function Overlay() {
  const dispatch = useAppDispatch();

  return (
    <>
      {/* 오버레이 */}
      <div
        className="fixed left-0 top-0 h-screen w-screen"
        onClick={() => {
          dispatch(searchActions.onBlur());
          dispatch(searchActions.closeOverlay());
        }}
      ></div>
    </>
  );
}
