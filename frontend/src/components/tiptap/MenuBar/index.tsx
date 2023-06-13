// modules
import { Editor } from "@tiptap/react";

// tiptap components
import FontSizeDropDown from "../DropDown/FontSize";

interface IEditor {
  editor: Editor | null;
}

export default function MenuBar({ editor }: IEditor) {
  if (!editor) {
    return null;
  }

  return (
    <div>
      <div className="row-between mb-2 flex h-10 w-full items-center justify-between rounded-md border border-input bg-muted px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:justify-center md:gap-4">
        <FontSizeDropDown editor={editor} />
        <button
          onClick={() => editor.chain().toggleBold().focus().run()}
          className={
            editor.isActive("bold") ? "mb-0.5 font-bold text-primary" : ""
          }
        >
          <i className="ri-bold"></i>
        </button>
        <button
          onClick={() => editor.chain().setTextAlign("left").focus().run()}
          className={
            editor.isActive({ textAlign: "left" })
              ? "mb-0.5 font-bold text-primary"
              : ""
          }
        >
          <i className="ri-align-left"></i>
        </button>
        <button
          onClick={() => editor.chain().setTextAlign("center").focus().run()}
          className={
            editor.isActive({ textAlign: "center" })
              ? "mb-0.5 font-bold text-primary"
              : ""
          }
        >
          <i className="ri-align-center"></i>
        </button>
        <button
          onClick={() => editor.chain().setTextAlign("right").focus().run()}
          className={
            editor.isActive({ textAlign: "right" })
              ? "mb-0.5 font-bold text-primary"
              : ""
          }
        >
          <i className="ri-align-right"></i>
        </button>
        <button
          onClick={() => editor.chain().setTextAlign("justify").focus().run()}
          className={
            editor.isActive({ textAlign: "justify" })
              ? "mb-0.5 font-bold text-primary"
              : ""
          }
        >
          <i className="ri-align-justify"></i>
        </button>

        <button
          onClick={() => editor.chain().toggleBulletList().focus().run()}
          className={
            editor.isActive("bulletList") ? "mb-0.5 font-bold text-primary" : ""
          }
        >
          <i className="ri-list-unordered"></i>
        </button>
        <button
          onClick={() => editor.chain().toggleOrderedList().focus().run()}
          className={
            editor.isActive("orderedList")
              ? "mb-0.5 font-bold text-primary"
              : ""
          }
        >
          <i className="ri-list-ordered"></i>
        </button>
        <button onClick={() => editor.chain().undo().focus().run()}>
          <i className="ri-arrow-go-back-line"></i>
        </button>
        <button onClick={() => editor.chain().redo().focus().run()}>
          <i className="ri-arrow-go-forward-line"></i>
        </button>
      </div>
    </div>
  );
}
