import { useAppSelector } from "@toolkit/hook";

export default function SearchNotFound() {
  const searchKeyword = useAppSelector((state) => state.search.searchKeyword);

  return (
    <div className="col-center gap-8">
      {/* //! 0개의 검색결과를 얻었을 때 활성화 됨 */}
      {searchKeyword !== "" && (
        <h2 className="text-xl">검색결과가 없습니다.</h2>
      )}
    </div>
  );
}
