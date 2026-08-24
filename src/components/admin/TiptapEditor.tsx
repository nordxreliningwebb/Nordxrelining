"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { Bold, Italic, List, ListOrdered, Link as LinkIcon } from 'lucide-react';
import { useEffect, useCallback } from 'react';

// We could add Link extension here, but for simplicity, StarterKit has a lot of basics. 
// If we strictly need link, we might need @tiptap/extension-link, but let's stick to StarterKit for now or add it if needed.
// Actually, let's just rely on what StarterKit provides (Bold, Italic, lists, headings, blockquote, code, etc.)

interface TiptapEditorProps {
  content: string;
  onChange: (html: string) => void;
  minHeight?: string;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Ange URL för länken', previousUrl);

    if (url === null) {
      return;
    }
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  return (
    <div className="flex flex-wrap gap-2 mb-2 p-1.5 bg-gray-50 rounded-lg border border-gray-200">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive('bold') ? 'bg-gray-200 text-blue-600' : 'text-gray-600'}`}
        type="button"
        title="Fet (Ctrl+B)"
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive('italic') ? 'bg-gray-200 text-blue-600' : 'text-gray-600'}`}
        type="button"
        title="Kursiv (Ctrl+I)"
      >
        <Italic className="w-4 h-4" />
      </button>

      <div className="w-px h-5 bg-gray-300 mx-1 self-center" />

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive('bulletList') ? 'bg-gray-200 text-blue-600' : 'text-gray-600'}`}
        type="button"
        title="Punktlista"
      >
        <List className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive('orderedList') ? 'bg-gray-200 text-blue-600' : 'text-gray-600'}`}
        type="button"
        title="Numrerad lista"
      >
        <ListOrdered className="w-4 h-4" />
      </button>

      <div className="w-px h-5 bg-gray-300 mx-1 self-center" />
      
      <button
        onClick={setLink}
        className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${editor.isActive('link') ? 'bg-gray-200 text-blue-600' : 'text-gray-600'}`}
        type="button"
        title="Länk"
      >
        <LinkIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default function TiptapEditor({ content, onChange, minHeight = "min-h-[150px]" }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // We use separate heading blocks now
      }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: `focus:outline-none ${minHeight} w-full [&_ul]:list-disc [&_ul]:ml-5 [&_ul]:pl-2 [&_li]:mb-1 [&_em]:italic [&_i]:italic [&_a]:text-blue-600 [&_a]:underline [&_a]:cursor-pointer [&_strong]:font-bold`,
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, { emitUpdate: false });
    }
  }, [content, editor]);

  return (
    <div className="border border-gray-200 rounded-xl p-2 bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
      <MenuBar editor={editor} />
      <div className="px-2">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
