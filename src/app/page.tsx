"use client";
import Link from "next/link";
import Editor from "./components/Editor";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const session = useSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      {JSON.stringify(session)}
    </main>
  );
}
