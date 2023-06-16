import { useAppSelector } from "@toolkit/hook";
import SearchRankHeader from "./SearchRankHeader";
import SearchRankItem from "./SearchRankItem";
import { useReadSearchRank } from "@api/search/readSearchRank";
import Loading from "@components/Loading";

export default function SearchRank() {
  const searchCategory = useAppSelector((state) => state.search.searchCategory);
  const { data, isLoading, error } = useReadSearchRank();

  return (
    <>
      {/* 로딩 시 로딩 화면 표시 */}
      {isLoading && <Loading />}

      {/* 에러 발생 시 에러 메시지 표시 */}
      {error && <p className="text-alert_danger">문제가 발생했습니다.</p>}

      {/* 인기 검색어 영역 */}
      <section className="h-64 w-full rounded-md border shadow-md">
        {/* 헤더 회색 영역 */}
        <SearchRankHeader />

        {/* 인기 검색어 리스트 */}
        <ol className="m-0 px-4 py-3">
          {data && (
            <>
              {/* 댄서게시판 인기 검색어 5개 */}
              {searchCategory === "DANCER" && (
                <>
                  {data.DANCER.length > 0 ? (
                    data.DANCER.map((keyword, index) => (
                      <SearchRankItem
                        key={index + keyword}
                        keyword={keyword}
                        index={index}
                      />
                    ))
                  ) : (
                    <span className="text-alert_danger">
                      데이터가 없습니다.
                    </span>
                  )}
                </>
              )}
              {/* 자랑게시판 인기 검색어 5개 */}
              {searchCategory === "VIDEO" && (
                <>
                  {data.VIDEO.length > 0 ? (
                    data.VIDEO.map((keyword, index) => (
                      <SearchRankItem
                        key={index + keyword}
                        keyword={keyword}
                        index={index}
                      />
                    ))
                  ) : (
                    <span className="text-alert_danger">
                      데이터가 없습니다.
                    </span>
                  )}
                </>
              )}
              {/* 자유게시판 인기 검색어 5개 */}
              {searchCategory === "FREE" && (
                <>
                  {data.FREE.length > 0 ? (
                    data.FREE.map((keyword, index) => (
                      <SearchRankItem
                        key={index + keyword}
                        keyword={keyword}
                        index={index}
                      />
                    ))
                  ) : (
                    <span className="text-alert_danger">
                      데이터가 없습니다.
                    </span>
                  )}
                </>
              )}
            </>
          )}
        </ol>
      </section>
    </>
  );
}
