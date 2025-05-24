"use client";

import { useMutation, useQuery, type MutationStatus } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { use, useState } from "react";

function Button({
  status,
  onClick,
}: {
  status: MutationStatus;
  onClick: () => void;
}) {
  if (status === "pending") {
    return (
      <button
        className="ml-2 rounded bg-blue-500 px-4 py-2 text-white"
        disabled
      >
        Creating...
      </button>
    );
  }
  if (status === "error") {
    return (
      <button
        className="ml-2 rounded bg-red-500 px-4 py-2 text-white"
        onClick={onClick}
      >
        Retry
      </button>
    );
  }
  return (
    <button
      className="ml-2 rounded bg-blue-500 px-4 py-2 text-white"
      onClick={onClick}
    >
      Create Note
    </button>
  );
}

export default function Dashboard() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const mutation = useMutation({
    mutationKey: ["createNote"],
    mutationFn: async () => {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });
      if (!response.ok) {
        throw new Error("Failed to create note");
      }
      return response.json();
    },
    onSuccess: (data) => {
      setTitle("");
      router.push(`/dashboard/${data.noteId}`);
    },
  });
  const handleClick = async () => {
    if (!title.trim()) {
      return;
    }
    mutation.mutate();
  };
  return (
    <div className="flex h-full flex-col items-center justify-center bg-gray-700">
      <div className="flex w-1/3">
        <input
          type="text"
          className="flex-grow bg-gray-800 p-2 text-white"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button status = {mutation.status} onClick = {handleClick}/>
      </div>
    </div>
  );
}
