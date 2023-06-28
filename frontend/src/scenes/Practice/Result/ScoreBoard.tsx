import { IPractice } from "@type/practice";
import StackedBarChart from "./StackedBarChart";
import { useAppSelector } from "@toolkit/hook";

export default function ScoreBoard({ data }: { data: IPractice }) {
  const sectionPracticeArr = useAppSelector(
    (state) => state.practice.sectionPracticeArr
  );

  return (
    <div className="h-[500px] w-full rounded-md bg-background p-6 shadow-md dark:bg-white">
      <div className="col-center h-full w-full md:flex-row">
        <div className="col-center h-full w-full border p-2 md:w-2/3">
          <StackedBarChart />
        </div>

        <ul className="row-center m-0 h-full w-full border p-2 md:w-1/3 md:flex-col">
          {sectionPracticeArr.length > 0 ? (
            sectionPracticeArr.map((section, index) => {
              return (
                <li
                  key={section.sectionId}
                  className="col-start h-1/3 w-full bg-blue-300"
                >
                  <span>{index + 1} 구간</span>
                  <span className="text-sm">
                    반복 횟수 : {section.playCounts}
                  </span>
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
