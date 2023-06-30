import { EditorContent, useEditor } from "@tiptap/react";
import { TContent } from "@type/posts";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { FontSize } from "@components/tiptap/FontSizeExtension";

interface IContentProps {
  content: TContent;
  className?: string;
  textClassName?: string;
}

export default function FeedbackContent({ content, className = "" }: IContentProps) {
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
    }
  );

  return (
    <div className={`${className}`}>
      <EditorContent editor={editor} />
    </div>
  );
}
