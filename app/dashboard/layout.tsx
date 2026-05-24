import { Sidebar } from "@/components/dashboard/Sidebar";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen p-6 lg:p-6">
      <div className="mx-auto max-w-7xl flex gap-6">
        <Sidebar />
        <div className="flex-1 min-w-0">
          <div className="flex lg:hidden items-center justify-between mb-4">
            <a href="/" className="font-serif text-lg">
              Baby Mo <span className="text-terracotta-500">Studio</span>
            </a>
            <ThemeToggle />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
