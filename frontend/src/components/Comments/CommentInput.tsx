import { useRouter } from "next/router";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { commentActions } from "@features/comment/commentSlice";
import { CommentFormValues, commentFormSchema } from "@type/comments";

import { useCreateComment } from "@api/comment/createComment";
import { useUpdateComment } from "@api/comment/updateComment";
import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "@components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import ProfileImage from "@components/ProfileImage";

export default function CommentInput({ content = "" }: { content?: string }) {
  const [isLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { isUpdate, commentId } = useAppSelector((state) => state.comment);
  const { userId, nickname, profileImage } = useAppSelector(
    (state) => state.auth
  );

  // fetch 요청
  const router = useRouter();
  const postId = router.query.id;
  const { mutateAsync: createMutateAsync } = useCreateComment();
  const { mutateAsync: updateMutateAsync } = useUpdateComment(postId as string);

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: { content },
  });

  async function onSubmit(data: CommentFormValues) {
    //  폼 데이터 유효성 검사
    if (!data.content) return;

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
          form.reset({ content: "" });
        } catch (error) {
          console.error("createDoc error ==> ", error);
        }
      }
    }
  }

  return (
    <div className="py-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="col-center">
          {/* 댓글 입력 필드 헤더 */}
          <div className="flex w-full items-center justify-between">
            <div className="row-center gap-2">
              {/* 프로필 이미지  */}
              <ProfileImage imageUrl={profileImage} />

              {/* 작성자 이름 */}
              <span className="border-b">{nickname}</span>
            </div>

            <div className="row-center gap-2">
              {/* 등록 버튼 */}
              <Button
                variant={"default"}
                disabled={isLoading}
                className="text-white"
                type="submit"
              >
                {isUpdate ? "수정" : "등록"}
              </Button>
              {isUpdate && commentId !== "" && (
                <Button
                  disabled={isLoading}
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
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only" htmlFor="Content">
                    Content
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      id="content"
                      rows={2}
                      placeholder="자유롭게 댓글을 작성해 보세요."
                      disabled={isLoading}
                      maxLength={300}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
