"use client"
import type { InlineContent, PartialBlock } from "@blocknote/core";
import { useQuery } from "@tanstack/react-query";
import Editor from "./Editor";

async function fetchNoteContent(noteId: string) {
  const res = await fetch(`/api/notes/${noteId}`);
  if (!res.ok) return undefined;
  const data = await res.json();
  try {
    return data;
  } catch {
    return undefined;
  }
}



export default function EditorLoader({ noteId }: { noteId: string }) {
  const {
    data: initialContent,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteContent(noteId),
  });
    if (isLoading) {
        return <div>Loading...</div>;
    } else if (isError) {
        console.error("Error loading note:", error);
        return <div>Error loading note</div>;
    }
    else if (initialContent) {
        return (
          <div className="m-10">
            <Editor noteId={noteId} initialContent={initialContent} />
          </div>
        );
    }
    return (
        <div>
           <h1>No content</h1>
        </div>
    );
}
