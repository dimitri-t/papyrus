"use client";

import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { UserAccountNav } from "./user-account-nav";
import MobileNav from "./mobile-nav";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { User } from "next-auth";

const Navbar = ({
  user,
  isSubscribed,
}: {
  user: User | undefined;
  isSubscribed: boolean;
}) => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-40 space-y-6 bg-background">
      <div className="container flex h-20 items-center justify-between py-6">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="hidden items-center space-x-2 md:flex">
            <Icons.logo />
            <span className="hidden font-bold sm:inline-block">papyrus</span>
          </Link>

          <nav className="hidden gap-6 md:flex">
            <Link
              href="/pricing"
              className="flex items-center text-lg font-medium text-foreground/60 transition-colors hover:text-foreground/80 sm:text-sm"
            >
              Pricing
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center text-lg font-medium text-foreground/60 transition-colors hover:text-foreground/80 sm:text-sm"
            >
              Dashboard
            </Link>
          </nav>
          <button
            className="flex items-center space-x-2 md:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <Icons.close /> : <Icons.logo />}
            <span className="font-bold">Menu</span>
          </button>
          {showMobileMenu && <MobileNav />}
        </div>
        <nav>
          {!user ? (
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "px-4",
              )}
            >
              Login
            </Link>
          ) : (
            <UserAccountNav user={user} isSubscribed={false} />
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
