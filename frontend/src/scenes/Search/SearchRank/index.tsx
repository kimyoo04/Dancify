import SearchRankHeader from "./SearchRankHeader";
import SearchRankItem from "./SearchRankItem";

export default function SearchRank() {
  const dummy = ["word1", "word2", "word3", "word4", "word5"];

  return (
    <>
      {/* 인기 검색어 영역 */}
      <section className="h-60 w-full overflow-scroll rounded-md border bg-background sm:shadow-md md:shadow-none ">
        {/* 헤더 회색 영역 */}
        <SearchRankHeader />

        {/* 인기 검색어 리스트 */}
        <ol className="px-4">
          {/* 5개만 검색어 노출 */}
          {dummy.map((keyword, index) => (
            <SearchRankItem
              key={index + keyword}
              keyword={keyword}
              index={index}
            />
          ))}
        </ol>
      </section>
    </>
  );
}
