"use client";
import Link from "next/link";
import Editor from "./components/Editor";
import { useSession } from "next-auth/react";
import { JsonBlock } from "./components/JsonBlock";

export default function HomePage() {
  const session = useSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1 className="text-4xl font-bold">Welcome to Blocknote</h1>
      <JsonBlock data={{session:session.status,data:session.data} } />
      <div className="flex flex-col items-center gap-4 mt-8">
        <Link href="/dashboard" className={`hover:underline ${session.status === "authenticated" ? "text-green-400" : "text-red-400"}`}>
          Go to 
          dashboard
        </Link>
        <Link href="/auth/signin" className={`text-green-400`}>sign in</Link>
        <Link href="/auth/signup" className={`text-green-400`}>sign up</Link>
        <Link href="/auth/signout" className={`${session.status !== "authenticated" ? "text-red-400" : "text-green-400"}`}>
          Sign out
        </Link>

        <link href="/auth/login"></link>
      </div>
    </main>
  );
}
