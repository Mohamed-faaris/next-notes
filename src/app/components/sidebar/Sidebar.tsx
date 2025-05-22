"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Sidebar() {
  const data = useQuery({
    queryKey: ["titles"],
    queryFn: () => fetch("/api/notes").then((res) => res.json()),
  });
  const session = useSession();
  console.log("sidebar", session.status, data.data);
  return (
    <aside className="h-full w-64 bg-gray-800">
      {data.data?.titles?.map((note: { id: string; title: string }) => (
        <div key={note.id} className="p-4 text-white">
          <Link href={`/dashboard/${note.id}`}>
            {note.title}
          </Link>
        </div>
      ))}
    </aside>
  );
}
