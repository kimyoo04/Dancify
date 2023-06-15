import Link from "next/link";
import { useRouter } from "next/router";

import { useAppDispatch } from "@toolkit/hook";
import { searchActions } from "@features/search/searchSlice";

import { SearchIcon } from "lucide-react";
import { TSearchCategoryEnglish } from "@type/search";

export default function Search() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathsArr = router.asPath.split("/");
  const currentPage = pathsArr.includes("free")
    ? "free"
    : pathsArr.includes("video")
    ? "video"
    : pathsArr.includes("dancer")
    ? "dancer"
    : pathsArr.includes("search")
    ? "search"
    : "dancer"; // 어느 것에도 일치하지 않으면 dancer로 설정

  return currentPage !== "search" ? (
    <Link
      href={"/search"}
      onClick={() =>
        // searchCategory state 변경
        dispatch(
          searchActions.chooseCategory({
            searchCategory: currentPage as TSearchCategoryEnglish,
          })
        )
      }
    >
      {/* Search Bar 아이콘 */}
      <SearchIcon className="h-6 w-6 cursor-pointer" />
    </Link>
  ) : null;
}
