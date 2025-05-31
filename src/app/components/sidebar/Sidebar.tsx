"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Navbar from "./Navbar";
import List from "./List";
import SignOut from "./SignOut";

export default function Sidebar() {
  return (
    <aside className="h-full w-64 bg-gray-800 flex flex-col">
      <Navbar />
      <List />
      <SignOut />
    </aside>
  );
}
