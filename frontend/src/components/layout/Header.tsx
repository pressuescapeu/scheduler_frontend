import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Settings } from 'lucide-react';
import { useLogout } from '@/hooks/api/useAuth';
import { authStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const user = authStore((state) => state.user);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <button onClick={() => navigate('/dashboard')} className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <span className="text-xl font-bold">Course Scheduler</span>
          </button>
        </div>

        {/* Spacer */}
        <div className="flex flex-1 items-center justify-end">
          {/* User Menu (Desktop only) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="User menu">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                {user ? `${user.first_name} ${user.last_name}` : 'My Account'}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
