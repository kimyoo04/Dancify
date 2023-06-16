import { useState } from "react";

import SearchPopUpHeader from "./SearchPopUpHeader";
import SearchKeywordsHistory from "./SearchKeywordsHistory";
import SearchRank from "./SearchRank";

export default function SearchPopUpModal() {
  const [searchPopUp, setSearchPopUp] = useState("최근검색어");

  return (
    <div className="absolute top-12 w-full rounded-md border bg-background shadow-md">
      {/* 팝업 종류 선택 영역 */}
      <SearchPopUpHeader
        searchPopUp={searchPopUp}
        setSearchPopUp={setSearchPopUp}
      />

      {/* 팝업 종류 영역 */}
      {searchPopUp === "최근검색어" && <SearchKeywordsHistory />}
      {searchPopUp === "인기검색어" && <SearchRank />}
    </div>
  );
}
