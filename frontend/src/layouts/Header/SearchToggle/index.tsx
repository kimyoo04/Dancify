import { useAppDispatch } from "@toolkit/hook";
import { searchActions } from "@features/search/searchSlice";
import { SearchIcon } from "lucide-react";

export default function SearchToggle() {
  const dispatch = useAppDispatch();

  return (
    <button
      onClick={() => {
        dispatch(searchActions.openOverlay());
      }}
    >
      {/* Search Bar 아이콘 */}
      <SearchIcon className="h-6 w-6 cursor-pointer" />
    </button>
  );
}
