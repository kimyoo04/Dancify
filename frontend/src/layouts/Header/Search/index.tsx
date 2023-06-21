import { useEffect } from "react";
import SearchBar from "./SearchBar";
import SearchPopUpModal from "./SearchPopUp";
import { searchActions } from "@features/search/searchSlice";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { useRouter } from "next/router";
import Overlay from "./SearchPopUp/Overlay";

export default function Search() {
  const dispatch = useAppDispatch();
  const isFocus = useAppSelector((state) => state.search.isFocus);
  const router = useRouter();
  const pathsArr = router.asPath.split("/");
  const searchCategory = pathsArr.includes("free")
    ? "FREE"
    : pathsArr.includes("video")
    ? "VIDEO"
    : pathsArr.includes("dancer")
    ? "DANCER"
    : "DANCER"; // 어느 것에도 일치하지 않으면 dancer로 설정

  useEffect(() => {
    dispatch(searchActions.chooseCategory({ searchCategory }));
  }, []);

  return (
    <div className="hidden md:block">
      <div className=" relative flex w-80 flex-col gap-5">
        <SearchBar />
        {isFocus && (
          <>
            <Overlay />
            <SearchPopUpModal />
          </>
        )}
      </div>
    </div>
  );
}
