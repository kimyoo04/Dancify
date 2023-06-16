import SearchBar from "./SearchBar";
import SearchCategory from "./SearchCategory";
import SearchKeywordsHistory from "./SearchKeywordsHistory";
import SearchRank from "./SearchRank";

export default function SideBar() {
  return (
    <div className="relative flex h-full w-full flex-col gap-5">
      <SearchCategory />
      <SearchBar />
      <SearchKeywordsHistory />
      <SearchRank />
    </div>
  );
}
