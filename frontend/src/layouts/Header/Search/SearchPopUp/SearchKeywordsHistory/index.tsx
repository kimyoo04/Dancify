import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { searchActions } from "@features/search/searchSlice";

import SearchKeywordsItem from "./SearchKeywordsItem";

export default function SearchKeywordsHistory() {
  const dispatch = useAppDispatch();
  const { keywords } = useAppSelector((state) => state.search);

  useEffect(() => {
    dispatch(searchActions.getAllKeywords());
  }, [dispatch]);

  return (
    <>
      {/* 최근 검색어 영역 */}
      <div className={`z-10 h-52 w-full rounded-b-md`}>
        <ul className="m-0 px-4 py-3">
          {keywords.slice(0, 5).map((keyword, index) => (
            <SearchKeywordsItem
              key={index + keyword}
              keyword={keyword}
              index={index}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
