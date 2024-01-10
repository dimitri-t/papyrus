import '@/styles/globals.css';
import 'simplebar-react/dist/simplebar.min.css';
import { getCurrentUser } from '@/lib/session';
import { SiteFooter } from '@/components/footer';
import Navbar from '@/components/nav/navbar';
import { UserAccountNav } from '@/components/nav/user-account-nav';
import { DashboardNav } from '@/components/dashboard-nav';
import { dashboardConfig } from '@/config/dashboard';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background/75 backdrop-blur-lg">
        <div className="container flex h-16 items-center justify-between py-4">
          <Navbar />
          <UserAccountNav user={user} />
        </div>
      </header>

      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>

      <SiteFooter className="border-t" />
    </div>
  );
}
