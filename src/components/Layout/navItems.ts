import { LuLayoutDashboard } from 'react-icons/lu';

/** Regular nav loop — profile is a separate row pinned to the sidebar footer, not part of this list */
export const navItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    Icon: LuLayoutDashboard,
  },
] as const;

export type AppView = 'dashboard' | 'profile';
