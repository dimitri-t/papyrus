"use client";

import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { marketingConfig } from "@/config/marketing";
import { cn } from "@/lib/utils";
import { useSelectedLayoutSegment } from "next/navigation";
import { Icons } from "@/components/icons";
import { MobileNav } from "@/components/mobile-nav";
import { siteConfig } from "@/config/site";
import { useState } from "react";
import { MainNavItem } from "@/types";

interface MainNavProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
}

const Navbar = ({ items, children }: MainNavProps) => {
  const segment = useSelectedLayoutSegment();
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  return (
    <header className="container z-40 bg-background">
      <div className="flex h-20 items-center justify-between py-6">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="hidden items-center space-x-2 md:flex">
            <Icons.logo />
            <span className="hidden font-bold sm:inline-block">
              {siteConfig.name}
            </span>
          </Link>
          {items?.length ? (
            <nav className="hidden gap-6 md:flex">
              {items?.map((item, index) => (
                <Link
                  key={index}
                  href={item.disabled ? "#" : item.href}
                  className={cn(
                    "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                    item.href.startsWith(`/${segment}`)
                      ? "text-foreground"
                      : "text-foreground/60",
                    item.disabled && "cursor-not-allowed opacity-80",
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          ) : null}
          <button
            className="flex items-center space-x-2 md:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <Icons.close /> : <Icons.logo />}
            <span className="font-bold">Menu</span>
          </button>
          {showMobileMenu && items && <MobileNav items={items} />}
        </div>
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
  );
};

export default Navbar;
