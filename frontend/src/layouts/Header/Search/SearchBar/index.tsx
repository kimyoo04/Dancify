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
    // validation
    if (!data.searchKeyword) {
      form.setFocus("searchKeyword");
      return;
    }

    // category에 따라 검색어를 추가해서 요청보내기 (trim()으로 공백 제거)
    dispatch(
      searchActions.searchKeyword({ searchKeyword: data.searchKeyword.trim() })
    );

    // 인풋창 초기화
    form.reset({ searchKeyword: "" });
  };

  return (
    <section className="z-10 h-9 w-full">
      <Form {...form}>
        <form
          className="group relative h-9 w-full rounded-md"
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
                    className="absolute h-9 w-full bg-background pl-9"
                    id="search"
                    name="search"
                    placeholder={
                      form.formState.errors.searchKeyword
                        ? form.formState.errors?.searchKeyword?.message
                        : "검색어를 입력해주세요."
                    }
                    autoComplete="off"
                    onFocus={() => dispatch(searchActions.onFocus())}
                    onClick={() => dispatch(searchActions.onFocus())}
                  />
                </FormControl>
                <FormLabel>
                  {/* 돋보기 아이콘 */}
                  <button
                    type="submit"
                    className="col-center absolute bottom-[19px] left-[19px] text-2xl font-medium "
                  >
                    <i className="ri-search-line absolute font-bold text-primary transition-all"></i>
                  </button>

                  {/* 검색 버튼 */}
                  <button
                    type="submit"
                    className="col-center absolute right-0 h-9 rounded-r-md bg-primary px-3 text-white"
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
          <div className="dummy h-9 w-full"> </div>
        </form>
      </Form>
    </section>
  );
}
