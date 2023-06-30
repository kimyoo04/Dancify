// tiptap modules
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";

// tiptap components
import MenuBar from "@components/tiptap/MenuBar";
import { FontSize } from "@components/tiptap/FontSizeExtension";

import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { feedbackActions } from "@features/feedback/feedbackSlice";
import { useCallback } from "react";
import debounce from "@util/debounce";

const DanceableTipTap = ({isUpdate}: {isUpdate:boolean}) => {
  const dispatch = useAppDispatch();
  const { sectionIndex, sections } = useAppSelector(state => state.feedback)

  const onUpdate = useCallback(
    debounce((content) => {
      dispatch(feedbackActions.writingDanceableMessage(content));
    }, 500),
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
    content: isUpdate ? sections[sectionIndex].danceablemessage : "",
    onUpdate: ({ editor }) => onUpdate(editor.getHTML()),
  });

  return (
    <div>
      {editor && (
        <>
          <MenuBar editor={editor} />
          <div onClick={() => editor?.chain().focus()}>
            <EditorContent editor={editor} />
          </div>
        </>
      )}
    </div>
  );
};

export default DanceableTipTap;
