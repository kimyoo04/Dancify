// tiptap modules
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";

// tiptap components
import MenuBar from "./MenuBar";
import { FontSize } from "./FontSizeExtension";

// state
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { postActions } from "@features/post/postSlice";
import { useCallback } from "react";
import debounce from "@util/debounce";

const Tiptap = ({ isUpdate }: { isUpdate: boolean }) => {
  const dispatch = useAppDispatch();
  const postContent = useAppSelector((state) => state.post.postContent);

  const onUpdate = useCallback(
    debounce((content) => dispatch(postActions.writingContent(content)), 500),
    []
  );

  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["paragraph"],
      }),
      FontSize,
      Placeholder.configure({
        placeholder: "내용을 입력해주세요.",
      }),
    ],
    content: isUpdate ? postContent : "",
    onUpdate: ({ editor }) => onUpdate(editor.getHTML()),
  });

  return (
    <div>
      {editor && (
        <>
          <div className="mb-2">
            <label
              htmlFor="postContent"
              className="text-sm font-medium"
              onClick={() => editor?.chain().focus()}
            >
              내용
            </label>
          </div>
          <MenuBar editor={editor} />
          <div onClick={() => editor?.chain().focus()}>
            <EditorContent editor={editor} />
          </div>
        </>
      )}
    </div>
  );
};

export default Tiptap;
