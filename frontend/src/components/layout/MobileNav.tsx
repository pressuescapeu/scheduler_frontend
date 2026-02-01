import { Calendar, Search, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const MobileNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      label: 'Schedule',
      icon: Calendar,
      path: '/dashboard',
    },
    {
      label: 'Search',
      icon: Search,
      path: '/courses',
    },
    {
      label: 'Profile',
      icon: User,
      path: '/profile',
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                'flex flex-col items-center justify-center flex-1 h-full space-y-1 transition-colors',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
