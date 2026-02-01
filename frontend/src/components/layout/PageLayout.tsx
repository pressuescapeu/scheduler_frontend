import type { ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="relative min-h-screen">
      {/* Header - sticky at top */}
      <Header />

      {/* Main layout container */}
      <div className="flex h-[calc(100vh-3.5rem)]">
        {/* Sidebar - desktop only */}
        <Sidebar />

        {/* Main content area */}
        <main className="flex-1 overflow-auto md:ml-80 pb-16 md:pb-0">
          <div className="p-6 md:p-8">{children}</div>
        </main>
      </div>

      {/* Mobile navigation - mobile only */}
      <MobileNav />
    </div>
  );
};
