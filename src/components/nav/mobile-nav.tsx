import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { useLockBody } from '@/hooks/use-lock-body';
import { Icons } from '@/components/icons';

const MobileNav = () => {
  useLockBody();

  return (
    <div
      className={
        'animate-in slide-in-from-bottom-80 fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md md:hidden'
      }
    >
      <div className="bg-popover text-popover-foreground relative z-20 grid gap-6 rounded-md p-4 shadow-md">
        <Link href="/" className="flex items-center space-x-2">
          <Icons.logo />
          <span className="font-bold">{siteConfig.name}</span>
        </Link>
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          <Link
            href="/pricing"
            className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline"
          >
            Pricing
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default MobileNav;
