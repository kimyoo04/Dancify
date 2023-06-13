// tiptap modules
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";

// tiptap components
import MenuBar from "./MenuBar";
import { FontSize } from "./FontSizeExtension";

// state
import { useAppDispatch } from "@toolkit/hook";
import { postActions } from "@features/post/postSlice";

const Tiptap = () => {
  const dispatch = useAppDispatch();

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
    onUpdate: ({ editor }) => {
      // 문서 내용을 수정했을 때 실시간으로 dispatch 해서 저장
      dispatch(postActions.writingContent(editor.getHTML()));
    },
  });

  return (
    <div>
      <div className="mb-2"><label
        htmlFor="postContent"
        className="text-sm font-medium"
        onClick={() => editor?.chain().focus()}
      >
        내용
      </label></div>
      <MenuBar editor={editor} />
      <div onClick={() => editor?.chain().focus()}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Tiptap;
