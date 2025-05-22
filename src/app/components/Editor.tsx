"use client";
import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useMemo, useRef } from "react";
import { codeBlock } from "@blocknote/code-block";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { not } from "drizzle-orm";

async function fetchNoteContent(noteId: string) {
  const res = await fetch(`/api/notes/${noteId}`);
  if (!res.ok) return undefined;
  const data = await res.json();
  try {
    return JSON.parse(data[0].content) as PartialBlock[];
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
    queryKey: ["note-",noteId],
    queryFn:() => fetchNoteContent(noteId),
  });

  const editor = useMemo(() => {
    if (isLoading) return undefined;
    // Fallback to some default content if API returns nothing
    return BlockNoteEditor.create({
      initialContent: initialContent || [
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
      fetch("/api/notes/test", {
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
