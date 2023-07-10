import { useAppSelector } from "@toolkit/hook";
import { useReadSearchRank } from "@api/search/readSearchRank";

import SearchRankItem from "./SearchRankItem";
import Loading from "@components/Loading";

export default function SearchRank() {
  const searchCategory = useAppSelector((state) => state.search.searchCategory);
  const { data, isLoading, error } = useReadSearchRank();

  return (
    <>
      {/* 인기 검색어 영역 */}
      <div className="z-10 h-52 w-full rounded-b-md">
        {/* 로딩 UI */}
        {isLoading ? (
          <div className="col-center h-full w-full">
            <Loading />
          </div>
        ) : null}

        {/* 에러 발생 메시지 */}
        {error ? (
          <p className="text-alert_danger">문제가 발생했습니다.</p>
        ) : null}

        {/* 인기 검색어 리스트 */}
        <ol className="m-0 px-4 py-3 list-none">
          {data && (
            <>
              {/* 댄서 게시판 인기 검색어 5개 */}
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
              {/* 자랑 게시판 인기 검색어 5개 */}
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
              {/* 자유 게시판 인기 검색어 5개 */}
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
      </div>
    </>
  );
}
