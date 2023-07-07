import StackedBarChart from "./StackedBarChart";
import { useAppSelector } from "@toolkit/hook";

export default function ScoreBoard() {
  const sectionPracticeArr = useAppSelector(
    (state) => state.practice.sectionPracticeArr
  );

  return (
    <div className="h-[500px] w-full rounded-md bg-background p-6 shadow-md dark:bg-white">
      <div className="w-full space-y-1">
        <h2 className="text-xl font-medium tracking-tight text-black">
          구간별 연습 결과
        </h2>
        <p className="text-sm text-muted-foreground">
          구간별 동작 평가와 최초, 최고 점수를 확인할 수 있습니다.
        </p>
      </div>

      <div className="col-center w-full md:flex-row">
        <div className="col-center h-[400px] w-full p-2 md:w-2/3">
          <StackedBarChart />
        </div>

        <ul className="col-center m-0 h-full w-full gap-2 p-2 sm:flex-row md:w-1/3 md:flex-col md:items-start">
          {sectionPracticeArr.length > 0 ? (
            sectionPracticeArr.map((section, index) => {
              return (
                <li
                  key={section.sectionId}
                  className="col-start w-full rounded-md border px-4 py-2"
                >
                  <span className="font-bold">{index + 1} 구간 </span>
                  <span className="text-sm">
                    최초 점수 : {section.firstScore}
                  </span>
                  <span className="text-sm">
                    최고 점수 : {section.bestScore}
                  </span>
                </li>
              );
            })
          ) : (
            <span>결과가 없습니다.</span>
          )}
        </ul>
      </div>
    </div>
  );
}
