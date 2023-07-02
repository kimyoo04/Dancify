import { searchActions } from "@features/search/searchSlice";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { X } from "lucide-react";

export default function SearchHeader() {
  const dispatch = useAppDispatch()
  const searchKeyword = useAppSelector((state) => state.search.searchKeyword);


  const handleClick = () => {
    dispatch(searchActions.resetKeyword()); // 검색 키워드 초기화
  };

  return (
    <>
      {/* 검색 키워드가 있을 때만 활성화 */}
      {searchKeyword !== "" && (
      <div className="row-center gap-2 py-5">
        <h2>
          &quot;<b className="text-xl font-bold">{searchKeyword}</b>&quot;
          검색결과입니다.
        </h2>
            {/* 검색 초기화 */}
      <button className="mt-1" onClick={handleClick}>
        <X color="red"/>
      </button>
      </div>
      )}

    </>
  );
}
