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
    <div className="flex min-h-screen flex-col">
      <Navbar user={user} isSubscribed={subscription.isSubscribed} />

      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
