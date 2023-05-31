import ButtonWrapper from "@components/Animation/ButtonWrapper";
import ScrollButton from "@components/ScrollButton";

import { SubmitHandler, useForm } from "react-hook-form";
import { IPostForm, IUpdatePostForm } from "@type/posts";
import { useUpdatePostMutation } from "@api/posts/updatePost";
import ErrorMsg from "@components/TextField/ErrorMsg";
import Loading from "@components/Loading";
import { useReadPost } from "@api/posts/readPost";

export default function EditPost({ id }: { id: string }) {
  // 게시글 불러오기
  const { data: oldPost, isLoading: isReadLoading } = useReadPost(id);
  // 게시글 수정하기
  const { mutateAsync } = useUpdatePostMutation();

  // 게시글 수정 폼
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IPostForm>({
    defaultValues: {},
  });

  const onValid: SubmitHandler<IPostForm> = async (data) => {
    if (!data.title || !data.content) {
      const errMsg: { [key: string]: string } = {};

      if (!data.title) errMsg.title = "제목을 입력해 주세요.";
      if (!data.content) errMsg.content = "내용을 입력해 주세요.";
      const setErrors = (errors: Record<string, string>) => {
        Object.entries(errors).forEach(([key, value]) => {
          setError(key as "title" | "content", {
            message: value,
            type: "required",
          });
        });
      };
      setErrors(errMsg);
      return;
    }

    const updateData: IUpdatePostForm = {
      postId: id as string,
      ...data,
    };
    await mutateAsync(updateData);
  };

  return (
    <>
      {isReadLoading && <Loading />}
      {oldPost && (
        <div className="w-full px-4">
          <div className="mx-auto my-8 max-w-screen-md rounded-2xl bg-white p-4 shadow-lg">
            <form onSubmit={handleSubmit(onValid)}>
              {/* 제목 필드 */}
              <div className="col-start mb-4  gap-1">
                <label htmlFor="title" className="font-medium ">
                  제목 *
                </label>
                <input
                  {...register("title", {
                    required: "제목이 필요해요.",

                    minLength: {
                      value: 2,
                      message: "최소 두 글자 이상 입력해 주세요.",
                    },
                    maxLength: {
                      value: 50,
                      message: "최대 50 글자까지 입력할 수 있어요.",
                    },
                  })}
                  id="title"
                  type="text"
                  name="title"
                  autoComplete="off"
                  defaultValue={oldPost.title || ""}
                  placeholder="제목을 입력해주세요."
                  maxLength={51}
                  className="textfield w-full rounded-md"
                />
                <span className="mt-1 text-xs font-medium text-red-500">
                  <ErrorMsg>{errors?.title?.message}</ErrorMsg>
                </span>
              </div>

              {/* 내용 필드 */}
              <div className=" col-start  mb-4 gap-1">
                <label htmlFor="content" className="font-medium ">
                  내용 *
                </label>
                <textarea
                  {...register("content", {
                    required: "내용이 필요해요.",

                    minLength: {
                      value: 4,
                      message: "최소 네 글자 이상 입력해 주세요.",
                    },
                    maxLength: {
                      value: 1000,
                      message: "최대 1000 글자까지 입력할 수 있어요.",
                    },
                  })}
                  id="content"
                  typeof="text"
                  name="content"
                  defaultValue={oldPost.content || ""}
                  placeholder="자유롭게 글을 작성해 보세요."
                  maxLength={1001}
                  className="textfield h-48 w-full rounded-md px-3 py-1 leading-8 placeholder:pt-1"
                />
                <span className="mt-1 text-xs font-medium text-red-500">
                  <ErrorMsg>{errors?.content?.message}</ErrorMsg>
                </span>
              </div>

              {/* 제출 버튼 */}
              <div className="col-center mb-3 mt-4">
                <ButtonWrapper>
                  <button
                    type="submit"
                    className="rounded-lg bg-main_color px-2 py-1 text-font_white"
                  >
                    수정 완료
                  </button>
                </ButtonWrapper>
              </div>
            </form>
          </div>
          {/* 최상단 이동 버튼 */}
          <ScrollButton />
        </div>
      )}
    </>
  );
}
