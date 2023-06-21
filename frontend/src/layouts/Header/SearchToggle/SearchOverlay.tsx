import { useAppDispatch } from "@toolkit/hook";
import { searchActions } from "@features/search/searchSlice";

import { X } from "lucide-react";
import SearchBar from "../Search/SearchBar";
import SearchPopUpModal from "../Search/SearchPopUp";
import Overlay from "../Search/SearchPopUp/Overlay";

export default function SearchOverlay() {
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="fixed left-0 top-0 z-20 h-screen w-screen bg-background">
        <Overlay />

        <div className="fixed top-2.5 w-full px-16">
          <SearchBar />
        </div>

        <div className="fixed top-4 w-full px-16">
          <div className="relative w-full">
            <SearchPopUpModal />
          </div>
        </div>

        <button
          className="fixed right-5 top-4"
          onClick={() => dispatch(searchActions.closeOverlay())}
        >
          <X /> {/* 닫기 버튼 */}
        </button>
      </div>
    </>
  );
}
