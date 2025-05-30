"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

export default function List() {
  const noteId = useParams().noteId;
  const router = useRouter();
  const data = useQuery({
    queryKey: ["titles"],
    queryFn: async () => {
      const res = await fetch("/api/notes");
      const data = await res.json();
      if(data?.redirect) router.push(data.redirect);
      return data;
    },
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
