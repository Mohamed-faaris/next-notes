"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Navbar from "../Navbar";
import List from "./List";

export default function Sidebar() {
  const data = useQuery({
    queryKey: ["titles"],
    queryFn: () => fetch("/api/notes").then((res) => res.json()),
  });
  return (
    <aside className="h-full w-64 bg-gray-800">
      <Navbar />
      <List />
    </aside>
  );
}
