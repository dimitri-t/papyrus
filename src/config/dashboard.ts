import { DashboardConfig } from '@/types';

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: 'Pricing',
      href: '/pricing',
    },
  ],
  sidebarNav: [
    {
      title: 'PDFs',
      href: '/dashboard',
      icon: 'page',
    },
    {
      title: 'Billing',
      href: '/dashboard/billing',
      icon: 'billing',
    },
  ],
};
