// modules
import { useForm } from "react-hook-form";
import { IPostTitleForm } from "@type/postEditor";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { useCallback, useState } from "react";
import { postActions } from "@features/post/postSlice";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import debounce from "@util/debounce";

const TitleForm = ({isUpdate}: {isUpdate:boolean}) => {
  const dispatch = useAppDispatch();
  const [isLoading] = useState<boolean>(false);
  const postTitle = useAppSelector((state) => state.post.postTitle); // 수정 데이터

  const onUpdate = useCallback(
    debounce((content) => {
      dispatch(postActions.writingTitle(content));
    }, 500),
    []
  );

  const form = useForm<IPostTitleForm>({defaultValues: {
    title: postTitle
    }});
  const onSubmit = async (data: IPostTitleForm) => {
    if (data.title === "") {
      const errMsg: { [key: string]: string } = {};

      if (!data.title) errMsg.title = "제목을 입력해 주세요.";
      const setErrors = (errors: Record<string, string>) => {
        Object.entries(errors).forEach(([key, value]) => {
          // 폼 구성 요소 이름 및 에러 메시지 전달
          form.setError(key as "title", {
            message: value,
            type: "required",
          });
        });
      };
      // 데이터가 유효하지 않을 경우의 에러 메시지 설정
      setErrors(errMsg);
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
    return;
  };

  return (
    <Form {...form}>
      <div className="grid gap-6">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="title">제목</FormLabel>
                  <FormControl>
                    <Input
                      id="title"
                      placeholder="최소 2글자 이상"
                      type="text"
                      autoCapitalize="none"
                      autoComplete="false"
                      autoCorrect="off"
                      defaultValue={
                        postTitle !== "" && isUpdate ? postTitle : ""
                      }
                      disabled={isLoading}
                      {...field}
                      onChange={(data) => onUpdate(data.target.value)}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
        </form>
      </div>
    </Form>
  );
};

export default TitleForm;
