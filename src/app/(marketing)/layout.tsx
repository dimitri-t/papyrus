import "@/styles/globals.css";
import "simplebar-react/dist/simplebar.min.css";

import { SiteFooter } from "@/components/site-footer";
import Navbar from "@/components/nav/navbar";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40">
        <div className="flex h-20 items-center justify-between py-6">
          <Navbar />
          <nav>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "px-4",
              )}
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
