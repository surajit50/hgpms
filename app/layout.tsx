import { SubscriptionStatus } from "@/components/layout/subscription-status";
import { GPNavigation } from "@/components/layout/sidebar";
//goblecss
import "./globals.css";
import { clearFeatureCacheForGP } from "@/lib/features";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Clear feature cache if session changes
  if (session?.user?.gpId) {
    await clearFeatureCacheForGP(session.user.gpId);
  }

  return (
    <html lang="en">
      <body className="flex min-h-screen">
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-auto p-6 bg-muted/30">
            {children}
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
