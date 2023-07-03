import MainWrapper from "../Wrapper/MainWarpper";
import BottomWrapper from "../Wrapper/BottomWrapper";

import { Button } from "@components/ui/button";
import { IPractice } from "@type/practice";
import Information from "./Infomation";
import ScoreBoard from "./ScoreBoard";
import { practiceActions } from "@features/practice/practiceSlice";
import { useAppDispatch } from "@toolkit/hook";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function Result({ data }: { data: IPractice }) {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="h-full w-screen">
      <MainWrapper>


        <div className="col-center w-full gap-6 dark:text-black sm:gap-10 lg:flex-row">
          <ScoreBoard />
          <Information data={data} />
        </div>
      </MainWrapper>

      <BottomWrapper>
        {isLoading ? (
          <Button disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            로딩 중..
          </Button>
        ) : (
          <Button
            disabled={isLoading}
            onClick={() => {
              setIsLoading(true);
              dispatch(practiceActions.moveNextStep());
            }}
          >
            확인
          </Button>
        )}
      </BottomWrapper>
    </div>
  );
}
