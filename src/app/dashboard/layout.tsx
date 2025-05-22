import Navbar from "../components/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

export default function dashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex h-full">
        <Sidebar />
        <main className="h-full w-full">{children}</main>
      </div>
    </div>
  );
}
