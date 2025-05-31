"use client";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import DeleteIcon from "../DeleteIcon";


export default function List() {
  const noteId = useParams().noteId;
  const router = useRouter();
  const queryClient = useQueryClient()
  const data = useQuery({
    queryKey: ["titles"],
    queryFn: async () => {
      const res = await fetch("/api/notes");
      const data = await res.json();
      if (data?.redirect) router.push(data.redirect);
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationKey:["deleteNote"],
    mutationFn: async (noteId:string) => {
      const res = await fetch(`/api/notes/${noteId}`,{method:"DELETE"});
      const data = await res.json()
      if(res.status != 200)
        throw new Error(data || "failed : no message received")
      return data
    }, 
    onSuccess:() => {
      
      queryClient.invalidateQueries({queryKey:["titles"]})
    },
    onError:() => queryClient.invalidateQueries({queryKey:["titles"]})
  })
  const notes = data.data?.titles || [];
  return (
    <>
      {notes.map((note: { id: string; title: string }) => (
        <Link href={`/dashboard/${note.id}`}>
          <div
            className={`group flex w-full items-center justify-between ${note.id === String(noteId) ? "bg-gray-700" : "bg-gray-800"} transition-colors duration-200 hover:bg-gray-600`}
            key={note.id}
          >
            <div className={`p-4 text-white`}>
              {note.title}
            </div>
            <div onClick={()=>deleteMutation.mutate(note.id)}>
            <DeleteIcon  className="group-hover:visible h-6 m-2 invisible" />
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
