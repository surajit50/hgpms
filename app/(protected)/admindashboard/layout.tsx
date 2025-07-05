import { GPNavigation } from "@/components/layout/sidebar";


interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

export default function AdminDashboardLayout({ children }: AdminDashboardLayoutProps) {
  return (
    
    <div className="flex min-h-screen bg-background">
      <GPNavigation />
      <div className="flex flex-col flex-1">
        <main className="flex-1 p-2 md:p-6 overflow-hidden">
          <div className="container mx-auto space-y-6">{children}</div>
        </main>
      </div>
    </div>
     
  );
} 