import { Link, useLocation } from 'react-router-dom'
import { useUIStore } from '@/store/uiStore'
import { cn } from '@/lib/utils'
import { Activity, Home, Settings, BarChart3, Stethoscope } from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Analysis', href: '/analysis', icon: Activity },
  { name: 'History', href: '/history', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function Sidebar() {
  const location = useLocation()
  const { sidebarOpen, setSidebarOpen } = useUIStore()

  return (
    <aside className={cn(
      "border-r border-border bg-card flex flex-col transition-all duration-300 overflow-hidden",
      sidebarOpen ? "w-64" : "w-20"
    )}>
      <div className={cn(
        "p-6 border-b border-border flex items-center",
        sidebarOpen ? "justify-start" : "justify-center"
      )}>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Stethoscope className="h-5 w-5 text-primary" />
          </div>
          {sidebarOpen && (
            <div>
              <h2 className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Dermascan
              </h2>
              <p className="text-xs text-muted-foreground whitespace-nowrap">AI Analysis</p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-1 py-6">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.href

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200',
                sidebarOpen ? 'justify-start' : 'justify-center',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                  : 'text-foreground hover:bg-secondary/80 hover:text-foreground'
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {sidebarOpen && <span className="text-sm font-medium">{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      {sidebarOpen && (
        <div className="p-4 border-t border-border space-y-3">
          <div className="bg-accent/10 rounded-lg p-3">
            <p className="text-xs font-semibold text-accent mb-1">Medical Grade</p>
            <p className="text-xs text-muted-foreground">AI-powered skin analysis</p>
          </div>
          <p className="text-xs text-muted-foreground text-center">v1.0 Beta</p>
        </div>
      )}
    </aside>
  )
}
