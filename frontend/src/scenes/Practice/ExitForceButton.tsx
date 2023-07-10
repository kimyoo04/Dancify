import ButtonWrapper from "@components/Animation/ButtonWrapper";
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
import { X } from "lucide-react";
import { useRouter } from "next/router";

export default function ExitEndButton() {
  const router = useRouter();

  return (
    <AlertDialog>
        <AlertDialogTrigger>
          <ButtonWrapper>
            <X/>
          </ButtonWrapper>
        </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>정말로 그만하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            강제로 연습을 그만두시면 기록이 남지 않습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => router.replace("/")}
          >
            그만하기
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
