import { EditorContent, useEditor } from "@tiptap/react";
import { TContent } from "@type/posts";
import StarterKit from "@tiptap/starter-kit";

interface IContentProps {
  content: TContent;
  className?: string;
  textClassName?: string;
}

export default function PostContent({
  content,
  className = "",
  textClassName = "",
}: IContentProps) {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: textClassName,
      },
    },
    extensions: [StarterKit],
    content: content,
    editable: false,
  });

  return (
    <div className={`${className}`}>
      <EditorContent editor={editor} />
    </div>
  );
}
