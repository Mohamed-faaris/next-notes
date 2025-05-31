"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SignOutIcon from "../icons/SignOutIcon";

export default function SignOut() {
  const session = useSession();
  const router = useRouter();
  return (
    <div className="flex h-16 items-center justify-between bg-gray-900 px-4 text-white">
      <div>
        <p>{session.data?.user?.name}</p>
        <p className="text-xs text-gray-300">{session.data?.user?.email}</p>
      </div>

      <div
        className="h-10 w-10 overflow-clip cursor-pointer"
        onClick={async () => {
          router.push("/auth/signout");
        }}
      >
        <SignOutIcon className="mb-[2] h-15 w-15 fill-white" />
      </div>
    </div>
  );
}
