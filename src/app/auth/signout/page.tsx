"use client"

import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function SignOutPage() {
  useEffect(() => {
    signOut({ redirect: true, callbackUrl: "/" });
  }, []);

  return(
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1 className="text-4xl font-bold">Signing out...</h1>
      <p className="mt-4">You will be redirected shortly.</p>
    </main>
  );
}