import Navbar from "../components/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

export default function dashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex h-full">
        <Sidebar />
        <main className="h-full w-full bg-[#1f1f1f] text-white overflow-y-scroll">{children}</main>
      </div>
    </div>
  );
}
