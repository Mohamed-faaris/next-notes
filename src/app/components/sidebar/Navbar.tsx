import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="font-Tsukimi flex h-16 items-center bg-gray-900 px-4 text-white">
      <Link href={"/dashboard"}>NextNotes</Link>
    </nav>
  );
}
