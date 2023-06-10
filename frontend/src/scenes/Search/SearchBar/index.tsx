import { useForm } from "react-hook-form";
import { ISearchField } from "@type/search";

import { useAppDispatch } from "@toolkit/hook";
import { searchActions } from "@features/search/searchSlice";

import { motion } from "framer-motion";
import { Input } from "@components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@components/ui/form";

export default function SearchBar() {
  const dispatch = useAppDispatch();

  const form = useForm<ISearchField>({
    defaultValues: {},
  });

  const onValid = (data: ISearchField) => {
    console.log(data);
    // validation
    if (!data.searchKeyword) return;

    console.log("asdasdsd");
    // category에 따라 검색어를 추가해서 요청보내기 (trim()으로 공백 제거)
    dispatch(
      searchActions.searchKeyword({ searchKeyword: data.searchKeyword.trim() })
    );

    // 인풋창 초기화
    form.reset({ searchKeyword: "" });
  };

  return (
    <section className="w-full">
      <Form {...form}>
        <form
          className="group relative w-full rounded-md"
          onSubmit={form.handleSubmit(onValid)}
        >
          <FormField
            control={form.control}
            name="searchKeyword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="absolute h-10 w-full bg-background pl-9"
                    id="search"
                    name="search"
                    placeholder={
                      form.formState.errors.searchKeyword
                        ? form.formState.errors?.searchKeyword?.message
                        : "검색어를 입력해주세요."
                    }
                    autoComplete="off"
                  />
                </FormControl>
                <FormLabel>
                  {/* 돋보기 아이콘 */}
                  <button
                    type="submit"
                    className="col-center absolute bottom-3 left-5 text-2xl font-medium "
                  >
                    <motion.i
                      whileTap={{ scale: 0.8 }}
                      className="ri-search-line absolute font-bold text-primary transition-all"
                    ></motion.i>
                  </button>

                  {/* 검색 버튼 */}
                  <button
                    type="submit"
                    className="col-center absolute -bottom-2 right-0 h-10 rounded-r-md bg-primary px-3 text-white"
                  >
                    <motion.span
                      whileTap={{ scale: 0.8 }}
                      className="text-md text-font_black font-medium"
                    >
                      검색
                    </motion.span>
                  </button>
                </FormLabel>
              </FormItem>
            )}
          />
          <div className="dummy h-8 w-full"> </div>
        </form>
      </Form>
    </section>
  );
}
