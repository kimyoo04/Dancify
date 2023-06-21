import { useState } from "react";

import SearchPopUpHeader from "./SearchPopUpHeader";
import SearchKeywordsHistory from "./SearchKeywordsHistory";
import SearchRank from "./SearchRank";

import { fadeIn } from "@util/variants";
import { motion } from "framer-motion";

export default function SearchPopUpModal() {
  const [searchPopUp, setSearchPopUp] = useState("최근검색어");

  return (
    <>
      <motion.section
        variants={fadeIn("down", "easeInOut", 0, 0.2, 10)}
        initial="hidden"
        animate="show"
        className="absolute top-[46px] w-full rounded-md border bg-background shadow-md"
      >
        {/* 팝업 종류 선택 영역 */}
        <SearchPopUpHeader
          searchPopUp={searchPopUp}
          setSearchPopUp={setSearchPopUp}
        />

        {/* 팝업 종류 영역 */}
        {searchPopUp === "최근검색어" && <SearchKeywordsHistory />}
        {searchPopUp === "인기검색어" && <SearchRank />}
      </motion.section>
    </>
  );
}
