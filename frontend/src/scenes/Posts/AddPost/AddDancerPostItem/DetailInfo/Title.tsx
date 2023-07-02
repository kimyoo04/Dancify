import { useCallback } from "react";

import { useAppDispatch, useAppSelector} from "@toolkit/hook";
import { postActions } from "@features/post/postSlice";

import debounce from "@util/debounce";

export default function Title() {
  const dispatch = useAppDispatch();
  const postTitle = useAppSelector(state => state.post.postTitle)

  const onUpdate = useCallback(
    debounce((content) => {
      dispatch(postActions.writingTitle(content));
    }, 500),
    []
  );

  return (
    <div className="space-y-1">
      <label
        htmlFor="title"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        제목
      </label>
      <div className="relative flex w-full items-center">
        <input
          id="title"
          name="title"
          type="text"
          className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="4글자 이상"
          defaultValue={postTitle !== "" ? postTitle : ""}
          onChange={(e) => onUpdate(e.target.value)}
        />
      </div>
    </div>
  );
}
