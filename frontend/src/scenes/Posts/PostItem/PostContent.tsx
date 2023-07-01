import { EditorContent, useEditor } from "@tiptap/react";
import { TContent } from "@type/posts";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { FontSize } from "@components/tiptap/FontSizeExtension";
import { postActions } from "@features/post/postSlice";
import { useAppDispatch } from "@toolkit/hook";

interface IContentProps {
  content: TContent;
  className?: string;
  textClassName?: string;
}

export default function PostContent({
  content,
  className = "",
}: IContentProps) {
  const dispatch = useAppDispatch();

  const editor = useEditor(
    {
      editorProps: {},
      extensions: [
        StarterKit,
        TextAlign.configure({
          types: ["paragraph"],
        }),
        FontSize,
      ],
      content: content,
      editable: false,
      //! refetch 시 반영 안되는 문제 해결
      onBlur: ({ editor }) => {
        dispatch(postActions.writingContent(editor.getHTML()));
      },
    },
    [content]
  );

  return (
    <div className={`${className}`}>
      <EditorContent editor={editor} />
    </div>
  );
}
