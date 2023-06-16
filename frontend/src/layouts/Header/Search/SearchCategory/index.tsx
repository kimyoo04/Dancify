import { searchActions } from "@features/search/searchSlice";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { TSearchCategoryEnglish, TSearchCategoryKorean } from "@type/search";

export default function SearchCategory() {
  const dispatch = useAppDispatch();
  const { searchCategory } = useAppSelector((state) => state.search);

  const categories: {
    korean: TSearchCategoryKorean;
    english: TSearchCategoryEnglish;
  }[] = [
    { korean: "댄서게시판", english: "DANCER" },
    { korean: "자랑게시판", english: "VIDEO" },
    { korean: "자유게시판", english: "FREE" },
  ];

  return (
    <section className="row-center w-full gap-8">
      {categories.map((category) => {
        return (
          <button
            key={category.korean}
            className={`rounded-full px-3 py-1  ${
              searchCategory === category.english ? "bg-primary" : ""
            }`}
            onClick={() => {
              dispatch(
                searchActions.chooseCategory({
                  searchCategory: category.english,
                })
              );
            }}
          >
            <span
              className={`text-lg font-medium ${
                searchCategory === category.english ? "text-white" : ""
              }`}
            >
              {category.korean}
            </span>
          </button>
        );
      })}
    </section>
  );
}
