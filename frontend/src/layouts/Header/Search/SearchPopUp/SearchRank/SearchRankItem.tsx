import { searchActions } from "@features/search/searchSlice";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import Link from "next/link";

interface ISearchItemProps {
  keyword: string;
  index: number;
}

export default function SearchRankItem({ keyword, index }: ISearchItemProps) {
  const dispatch = useAppDispatch();
  const searchCategory = useAppSelector((state) => state.search.searchCategory);

  return (
    <li
      key={keyword + index}
      className="flex items-center justify-between border-b"
    >
      <Link
        href={`/posts/${searchCategory.toLowerCase()}`}
        className="row-center group w-full gap-2 py-1.5"
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
      </Link>
    </li>
  );
}
