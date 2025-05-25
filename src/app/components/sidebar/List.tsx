"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function List() {
  const noteId = useParams().noteId;
  const data = useQuery({
    queryKey: ["titles"],
    queryFn: () => fetch("/api/notes").then((res) => res.json()),
  });
  const notes = data.data?.titles || [];
  return (
    <>
      {notes.map((note: { id: string; title: string }) => (
        <div
          key={note.id}
          className={`p-4 text-white ${note.id === String(noteId) ? "bg-gray-700" : "bg-gray-800"}`}
        >
          <Link href={`/dashboard/${note.id}`}>{note.title}</Link>
        </div>
      ))}
    </>
  );
}
