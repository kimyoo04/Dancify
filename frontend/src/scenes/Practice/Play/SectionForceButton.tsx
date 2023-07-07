import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@components/ui/alert-dialog";
import { Button } from "@components/ui/button";

export default function ForceEndButton({
  handleForceEndSection,
}: {
  handleForceEndSection: () => Promise<void>;
}) {
  return (
    <AlertDialog>
      <Button>
        <AlertDialogTrigger>넘어가기</AlertDialogTrigger>
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>정말로 건너뛰시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            강제로 구간을 넘기면 해당 구간이 0점으로 처리되며, 평균 점수가 하락합니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await handleForceEndSection();
            }}
          >
            넘어가기
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
