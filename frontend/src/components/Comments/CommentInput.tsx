import { useCreateComment } from "@api/comment/createComment";
import { useUpdateComment } from "@api/comment/updateComment";
import { Button } from "@components/ui/button";
import { Textarea } from "@components/ui/textarea";
import { commentActions } from "@features/comment/commentSlice";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { ICreateCommentForm } from "@type/comments";
import { useRouter } from "next/router";

import { Controller, SubmitHandler, useForm } from "react-hook-form";

export default function CommentInput({ content = "" }: { content?: string }) {
  const dispatch = useAppDispatch();
  const { isUpdate, commentId } = useAppSelector((state) => state.comment);
  const { userId, nickname } = useAppSelector((state) => state.auth);

  const router = useRouter();
  const postId = router.query.id;
  const { mutateAsync: createMutateAsync } = useCreateComment();
  const { mutateAsync: updateMutateAsync } = useUpdateComment(postId as string);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setError,
    reset,
  } = useForm<ICreateCommentForm>({
    defaultValues: { content },
  });

  const onValid: SubmitHandler<ICreateCommentForm> = async (data) => {
    //  폼 데이터 유효성 검사
    if (!data.content) {
      const errMsg: { [key: string]: string } = {};
      if (!data.content) errMsg.content = "내용을 입력해 주세요.";
      const setErrors = (errors: Record<string, string>) => {
        Object.entries(errors).forEach(([key, value]) => {
          setError(key as "content", {
            message: value,
            type: "required",
          });
        });
      };
      setErrors(errMsg);
      return;
    }

    if (userId !== "" && typeof postId === "string") {
      if (isUpdate) {
        try {
          updateMutateAsync({ commentId, content: data.content });
          dispatch(commentActions.resetComment());
        } catch (error) {
          console.error("updateDoc error ==> ", error);
        }
      } else {
        try {
          createMutateAsync({ postId, content: data.content });
          reset({ content: "" });
        } catch (error) {
          console.error("createDoc error ==> ", error);
        }
      }
    }
  };

  return (
    <div className="px-1 py-2 pt-4">
      <form onSubmit={handleSubmit(onValid)} className="col-center">
        {/* 댓글 입력 필드 헤더 */}
        <div className="flex w-full items-center justify-between  pb-3">
          {/* 작성자 이름 */}
          <span className="border-b">{nickname}</span>

          <div className="row-center gap-2">
            {/* 등록 버튼 */}
            <Button variant={"default"} className="text-white" type="submit">
              {isUpdate ? "수정" : "등록"}
            </Button>
            {isUpdate && commentId !== "" && (
              <Button
                variant={"outline"}
                onClick={() => dispatch(commentActions.resetComment())}
              >
                취소
              </Button>
            )}
          </div>
        </div>

        <div className="flex w-full flex-col">
          {/* 댓글 입력 컨트롤러 */}
          <Controller
            {...register("content", {
              required: "댓글을 작성해 주세요.",
              minLength: {
                value: 3,
                message: "최소 세 글자 이상 입력해 주세요.",
              },
              maxLength: {
                value: 200,
                message: "최대 200 글자까지 입력할 수 있어요.",
              },
            })}
            name="content"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                id="content"
                name="content"
                rows={2}
                placeholder="자유롭게 댓글을 작성해 보세요."
                maxLength={501}
              />
            )}
          />

          <span className="text-xs font-medium text-red-500">
            {errors?.content?.message}
          </span>
        </div>
      </form>
    </div>
  );
}
