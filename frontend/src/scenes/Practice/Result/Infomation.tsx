import { Separator } from "@components/ui/separator";
import { useAppSelector } from "@toolkit/hook";
import { IPractice } from "@type/practice";
import calculateAverage from "@util/calCulateAverage";

export default function Information({ data }: { data: IPractice }) {
  const sectionPracticeArr = useAppSelector(
    (state) => state.practice.sectionPracticeArr
  );

  const AvgBestScore = calculateAverage(
    sectionPracticeArr.map((section) => section.bestScore)
  );

  return (
    <div className="h-[500px] w-full flex-shrink-0 rounded-md bg-background p-6 shadow-md dark:bg-white lg:w-[360px] xl:w-[440px]">
      <div className="flex h-full flex-col justify-between">
        <h1 className="col-start w-full text-xl font-medium text-black">
          총 연습 결과
        </h1>

        {/* 제목과 댄서 이름 */}
        <div className="col-end">
          <h2 className="text-right text-xl">{data.dancerPost.title}</h2>
          <span className="text-right text-muted-foreground">
            {data.dancerPost.nickname}
          </span>
        </div>

        {/* 구간별 반복 횟수 */}
        <div>
          <h2 className="text-right text-xl">총 구간 별 연습 횟수</h2>
          <div className="col-end flex-wrap">
            {sectionPracticeArr.map((section, index) => (
              <div key={section.sectionId}>
                <span className="text-sm">{index + 1}구간 - </span>
                <span className="text-sm">{section.playCounts}회</span>
              </div>
            ))}
          </div>
        </div>

        {/* 완료 문구와 전체 평균 점수 */}
        <div className="col-end w-full">
          <p>고생하셨습니다!</p>
          <Separator className="my-3" />
          <p className="text-xl">최종 점수 : {AvgBestScore}점</p>
        </div>
      </div>
    </div>
  );
}
