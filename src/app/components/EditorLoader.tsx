"use client"
import type { PartialBlock } from "@blocknote/core";
import { useQuery } from "@tanstack/react-query";
import Editor from "./Editor";

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

export default function EditorLoader({ noteId }: { noteId: string }) {
  const {
    data: initialContent,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteContent(noteId),
  });
    if (isLoading) {
        return <div>Loading...</div>;
    } else if (isError) {
        return <div>Error loading note</div>;
    }
    else if (initialContent) {
        return (
          <div>
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
