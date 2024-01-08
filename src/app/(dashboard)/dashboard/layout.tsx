import "@/styles/globals.css";
import "simplebar-react/dist/simplebar.min.css";

import { getCurrentUser } from "@/lib/session";
import { SiteFooter } from "@/components/site-footer";
import Navbar from "@/components/nav/navbar";
import { UserAccountNav } from "@/components/user-account-nav";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  // todo fix isSubscribed

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <Navbar />
          <UserAccountNav user={user} isSubscribed={false} />
        </div>
      </header>

      <div className="container grid flex-1 gap-12">
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  );
}
