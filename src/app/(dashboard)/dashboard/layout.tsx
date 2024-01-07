import "@/styles/globals.css";
import "simplebar-react/dist/simplebar.min.css";

import { getCurrentUser } from "@/lib/session";
import { SiteFooter } from "@/components/site-footer";
import Navbar from "@/components/navbar";
import { getUserSubscriptionPlan } from "@/lib/subscription";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  const subscription = await getUserSubscriptionPlan();

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <Navbar user={user} isSubscribed={subscription.isSubscribed} />

      <div className="container grid flex-1 gap-12">
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  );
}
