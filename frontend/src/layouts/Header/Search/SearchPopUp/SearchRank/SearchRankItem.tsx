import { searchActions } from "@features/search/searchSlice";
import { useAppDispatch } from "@toolkit/hook";

interface ISearchItemProps {
  keyword: string;
  index: number;
}

export default function SearchRankItem({ keyword, index }: ISearchItemProps) {
  const dispatch = useAppDispatch();

  return (
    <li
      key={keyword + index}
      className="group flex cursor-pointer gap-2 border-b py-1.5"
      onClick={() => {
        dispatch(searchActions.clickKeyword({ searchKeyword: keyword }));
      }}
    >
        {/* 인기 검색어 순위 */}
        <span className="group-hover:font-medium group-hover:text-primary">
          {index + 1}.
        </span>

        {/* 인기 검색어 텍스트 */}
        <button className="flex w-full items-start group-hover:font-medium group-hover:text-primary">
          {keyword}
        </button>
    </li>
  );
}
