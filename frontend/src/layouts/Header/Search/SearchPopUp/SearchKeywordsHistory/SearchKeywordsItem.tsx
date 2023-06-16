import { searchActions } from "@features/search/searchSlice";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import Link from "next/link";

interface ISearchItemProps {
  keyword: string;
  index: number;
}

export default function SearchKeywordsItem({
  keyword,
  index,
}: ISearchItemProps) {
  const dispatch = useAppDispatch();
  const searchCategory = useAppSelector((state) => state.search.searchCategory);

  return (
    <li
      key={keyword + index}
      className="flex items-center justify-between border-b pt-0.5"
    >
      <Link
        href={`/posts/${searchCategory.toLowerCase()}`}
        className="flex w-full items-start hover:font-medium hover:text-primary"
        onClick={() => {
          dispatch(searchActions.clickKeyword({ searchKeyword: keyword }));
        }}
      >
        {keyword}
      </Link>

      {/* 삭제 버튼 */}
      <button onClick={() => dispatch(searchActions.deleteKeyword({ index }))}>
        <i className="ri-close-line text-2xl text-red-600"></i>
      </button>
    </li>
  );
}
