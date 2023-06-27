import { Button } from "@components/ui/button";
import { postActions } from "@features/post/postSlice";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";

import AgreeCheckBox from "./AgreeCheckBox";
import AgreementContent from "./AgreementContent";

export default function Agreements() {
  const dispatch = useAppDispatch();
  const isAgree = useAppSelector((state) => state.post.isAgree);

  return (
    <div className="w-full space-y-5">
      <h1 className="text-xl font-bold">개인정보 수집 및 이용 동의</h1>

      <AgreementContent />

      <div className="flex w-full items-center justify-end gap-10">
        <AgreeCheckBox />

        <Button
          disabled={!isAgree}
          onClick={() => dispatch(postActions.moveNextStep())}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
