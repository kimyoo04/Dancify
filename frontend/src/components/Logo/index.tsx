import { searchActions } from "@features/search/searchSlice";
import { useAppDispatch } from "@toolkit/hook";
import Link from "next/link";

export default function Logo() {
    const dispatch = useAppDispatch();
    const handleClick = () => {
      dispatch(searchActions.resetKeyword()); // 검색 키워드 초기화
    };

  return (
    <Link href="/" onClick={handleClick}>
      <h1 className="sr-only">Dancify</h1>
      <h1 className="logo mb-1 text-[22px]">▶ancify</h1>
    </Link>
  );
}
