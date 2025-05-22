"use client";
import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useMemo, useRef } from "react";
import { codeBlock } from "@blocknote/code-block";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

const b = [
  {
    id: "a0560769-7980-4e23-b48c-62bdc59e9e12",
    type: "paragraph",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [
      { type: "text", text: "Welcome to this demo!faaris", styles: {} },
    ],
    children: [],
  },
  {
    id: "9cc99135-69e0-4b58-8659-3c79bc20274d",
    type: "paragraph",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [],
    children: [],
  },
];

async function fetchNoteContent(noteId: string) {
  const res = await fetch(`/api/notes/${noteId}`);
  if (!res.ok) return undefined;
  const data = await res.json();
  try {
    return data[0].content as PartialBlock[];
  } catch {
    return undefined;
  }
}

export default function Editor({noteId}: {noteId: string}) {
  // Fix timer type for browser
  const timer = useRef<number | null>(null);; 
  const {
    data: initialContent,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note",noteId],
    queryFn:() => fetchNoteContent(noteId),
  });

  const editor = useMemo(() => {
    if (isLoading) return undefined;
    const safeInitialContent: PartialBlock[] = []
    console.log("initialContent", initialContent);
    console.log("safeInitialContent",initialContent?.filter((block,index) => {index != initialContent?.length-1}));
    return BlockNoteEditor.create({
      initialContent: //safeInitialContent ||
       [
        { type: "paragraph", content: "Welcome to this demo!" },
      ],
      codeBlock,
    });
  }, [initialContent, isLoading]);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !editor)
    return (
      <div>
        404 Note Not Found <Link href="/dashboard">new note</Link>
      </div>
    );

  function saveToApi(blocks: PartialBlock[]) {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = window.setTimeout(() => {
      fetch(`/api/notes/${noteId}`, {
        method: "POST",
        body: JSON.stringify({
          content: JSON.stringify(blocks),
        }),
      });
    }, 1000);
  }

  // Only render BlockNoteView if editor is defined (guaranteed by above checks)
  return (
    <BlockNoteView
      editor={editor}
      onChange={() => {
        saveToApi(editor.document);
      }}
    />
  );
}
