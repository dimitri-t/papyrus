"use client";

import Link from "next/link";
import { Icons } from "../icons";
import { useState } from "react";
import MobileNav from "./mobile-nav";

const Navbar = () => {
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
      </div>
    </header>
  );
};

export default Navbar;
