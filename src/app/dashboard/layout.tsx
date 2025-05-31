import Navbar from "../components/sidebar/Navbar";
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
        <main className="h-full w-full overflow-y-scroll bg-[#1f1f1f] text-white">
          {children}
        </main>
      </div>
    </div>
  );
}
