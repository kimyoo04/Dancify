import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateMutation } from "@api/posts/createPost";

import ButtonWrapper from "@components/Animation/ButtonWrapper";
import ScrollButton from "@components/ScrollButton";
import { IPostForm } from "@type/posts";
import ErrorMsg from "@components/TextField/ErrorMsg";

// 게시물 Create 페이지
export default function AddPost() {
  const { mutateAsync } = useCreateMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<IPostForm>({
    // 초기값으로 빈 문자열 지정
    defaultValues: { title: "", content: "" },
  });

  //  handleSubmit에서 호출할 onValid 함수 선언
  const onValid: SubmitHandler<IPostForm> = (data) => {
    // 폼 데이터 유효성 검사
    if (!data.title || !data.content) {
      const errMsg: { [key: string]: string } = {};

      if (!data.title) errMsg.title = "제목을 입력해 주세요.";
      if (!data.content) errMsg.content = "내용을 입력해 주세요.";
      const setErrors = (errors: Record<string, string>) => {
        Object.entries(errors).forEach(([key, value]) => {
          // 폼 구성 요소 이름 및 에러 메시지 전달
          setError(key as "title" | "content", {
            message: value,
            type: "required",
          });
        });
      };
      // 데이터가 유효하지 않을 경우의 에러 메시지 설정
      setErrors(errMsg);
      return;
    }
    // 서버에 데이터 전송 후 폼 데이터 reset
    mutateAsync(data);
    reset({ title: "", content: "" });
  };

  return (
    <div className="w-full px-4">
      <div className="mx-auto my-8 max-w-screen-lg"></div>
      <div className="rounded-2xl bg-white p-4 shadow-lg">
        <form onSubmit={handleSubmit(onValid)}>
          {/* 제목 필드 */}
          <div className="mb-4">
            <label htmlFor="title" className="mb-1 font-medium ">
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
              placeholder="제목을 입력해 주세요."
              maxLength={51}
              className="textfield w-full rounded-md pl-4"
            />
            <span className="mt-1 text-xs font-medium text-red-500">
              <ErrorMsg>{errors?.title?.message}</ErrorMsg>
            </span>
          </div>

          {/* 내용 필드 */}
          <div className="mb-4">
            <label htmlFor="content" className="mb-1 font-medium ">
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
              placeholder="자유롭게 글을 작성해 보세요."
              maxLength={1001}
              className="textfield h-48 w-full rounded-md px-3 py-1 leading-8 placeholder:pt-1"
            />
            <span className="mt-1 text-xs font-medium text-red-500">
              <ErrorMsg>{errors?.content?.message}</ErrorMsg>
            </span>
          </div>

          {/* 제출 버튼 */}
          <div className="col-center mt-4">
            <ButtonWrapper>
              <button
                type="submit"
                className="rounded-lg  bg-main_color px-2 py-1 text-font_white"
              >
                작성 완료
              </button>
            </ButtonWrapper>
          </div>
        </form>
      </div>
      {/* 최상단 이동 버튼 */}
      <ScrollButton />
    </div>
  );
}
