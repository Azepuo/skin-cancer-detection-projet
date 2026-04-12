import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useUIStore } from "@/store/uiStore";
import { Button } from "@/components/ui/Button";
import { Menu, LogOut, Moon, Sun, Settings, Stethoscope } from "lucide-react";

export default function Header() {
  const { user, logout } = useAuthStore();
  const { isDarkMode, toggleDarkMode, toggleSidebar } = useUIStore();

  return (
    <header className="border-b border-border bg-card backdrop-blur-sm bg-opacity-95">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="hover:bg-secondary"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Stethoscope className="h-5 w-5 text-primary" />
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-1">
          {/* Dark mode toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleDarkMode}
            title={isDarkMode ? "Light mode" : "Dark mode"}
            className="hover:bg-secondary"
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          {/* User profile and logout */}
          <div className="flex items-center gap-2 ml-4 pl-4 border-l border-border">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user?.name || user?.email}
            </span>
            <Link to="/settings">
              <Button variant="ghost" size="sm" className="hover:bg-secondary">
                <Settings className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                logout();
                window.location.href = "/login";
              }}
              className="hover:bg-destructive/10 text-foreground"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
