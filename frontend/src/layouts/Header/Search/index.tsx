import SearchBar from "./SearchBar";
import SearchPopUpModal from "./SearchPopUp";

export default function Search() {
  return (
    <div className="relative flex w-80 flex-col gap-5">
      <SearchBar />
      <SearchPopUpModal />
    </div>
  );
}
