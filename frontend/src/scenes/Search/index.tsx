import SearchBar from "./SearchBar";
import SearchCategory from "./SearchCategory";
import SearchKeywordsHistory from "./SearchKeywordsHistory";
import SearchRank from "./SearchRank";

export default function SideBar() {
  return (
    <div className="relative flex h-full w-full flex-col gap-5">
      <SearchCategory />

      {/* 검색바 */}
      <SearchBar />

      {/* 최근 검색어 */}
      <SearchKeywordsHistory />

      {/* 인기 검색어 */}
      <SearchRank />
    </div>
  );
}
