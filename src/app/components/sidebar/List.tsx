import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

export default function List() {
  const data = useQuery({
    queryKey: ["titles"],
    queryFn: () => fetch("/api/notes").then((res) => res.json()),
  });
  const notes = data.data?.titles || [];
  return (
    <>
      {notes.map((note: { id: string; title: string }) => (
        <div key={note.id} className="p-4 text-white">
          <Link href={`/dashboard/${note.id}`}>{note.title}</Link>
        </div>
      ))}
    </>
  );
}
