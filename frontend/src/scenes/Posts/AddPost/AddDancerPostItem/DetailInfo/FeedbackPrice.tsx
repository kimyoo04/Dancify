import { postActions } from "@features/post/postSlice";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { Dispatch, SetStateAction } from "react";

export default function FeedbackPrice({
  feedbackPriceText,
  setFeedbackPriceText,
}: {
  feedbackPriceText: string;
  setFeedbackPriceText: Dispatch<SetStateAction<string>>;
  }) {
  const dispatch = useAppDispatch();
  const feedbackPrice = useAppSelector((state) => state.post.feedbackPrice);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;

    // 숫자가 아닌 문자 제거 1,000,000 이상 입력 불가
    const numericValue = rawValue.replace(/[^0-9]/g, "").slice(0, 6);

    // 세 자리 수마다 쉼표 추가 및 화면 출력
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setFeedbackPriceText(formattedValue);

    // 숫자가 아닌 문자 제거한 값이 기존 값과 다를 경우에만 dispatch
    if (feedbackPrice !== Number(numericValue))
      dispatch(postActions.setFeedbackPrice(Number(numericValue)));
  };

  return (
    <div className="space-y-1">
      <label
        htmlFor="feedbackPrice"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        피드백 가격
      </label>
      <div className="relative flex w-full items-center">
        <input
          id="feedbackPrice"
          name="feedbackPrice"
          type="text"
          className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="10만원 이하"
          value={feedbackPriceText}
          onChange={handleChange}
        />
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <span className="text-gray-500 sm:text-sm">원</span>
        </span>
      </div>
    </div>
  );
}