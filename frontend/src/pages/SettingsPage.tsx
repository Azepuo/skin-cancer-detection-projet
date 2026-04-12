import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useAuthStore } from '@/store/authStore'
import { useUIStore } from '@/store/uiStore'
import { User, Palette, Lock, LogOut, Shield, Bell } from 'lucide-react'

export default function SettingsPage() {
  const { user, logout } = useAuthStore()
  const { isDarkMode, toggleDarkMode } = useUIStore()
  const [notifications, setNotifications] = useState(true)

  return (
    <Layout>
      <div className="p-6 max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground text-lg">Manage your account and preferences</p>
        </div>

        {/* Account Settings */}
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your profile information</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="pb-4 border-b border-border/50">
              <label className="text-sm font-semibold text-foreground">Full Name</label>
              <p className="text-muted-foreground mt-1">{user?.name}</p>
            </div>

            <div className="pb-4 border-b border-border/50">
              <label className="text-sm font-semibold text-foreground">Email Address</label>
              <p className="text-muted-foreground mt-1">{user?.email}</p>
            </div>

            <div className="pb-4 border-b border-border/50">
              <label className="text-sm font-semibold text-foreground">Account Role</label>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold capitalize">
                  {user?.role}
                </span>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground">Account Created</label>
              <p className="text-muted-foreground mt-1">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                }) : 'N/A'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Palette className="h-5 w-5 text-accent" />
              </div>
              <div>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize the visual theme</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 rounded-lg border border-border/30 bg-secondary/30">
              <div>
                <label className="text-sm font-semibold text-foreground">Theme</label>
                <p className="text-sm text-muted-foreground mt-1">
                  Currently using {isDarkMode ? 'Dark' : 'Light'} theme
                </p>
              </div>
              <Button
                variant="outline"
                onClick={toggleDarkMode}
                className={isDarkMode ? 'bg-primary text-primary-foreground border-0' : ''}
              >
                {isDarkMode ? 'Light' : 'Dark'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <CardTitle>Privacy & Security</CardTitle>
                <CardDescription>Manage data and security settings</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="pb-4 border-b border-border/50">
              <div className="flex items-start justify-between">
                <div>
                  <label className="text-sm font-semibold text-foreground">Data Encryption</label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your analysis data is encrypted using industry-standard protocols
                  </p>
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400">
                  Secure
                </span>
              </div>
            </div>

            <div className="pb-4 border-b border-border/50">
              <div className="flex items-start justify-between">
                <div>
                  <label className="text-sm font-semibold text-foreground">Session Management</label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Currently logged in. You can logout or end other sessions
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start justify-between">
                <div>
                  <label className="text-sm font-semibold text-foreground">Two-Factor Authentication</label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Button variant="outline" size="sm" disabled className="opacity-50">
                  Coming Soon
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Manage notification preferences</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 rounded-lg border border-border/30 bg-secondary/30">
              <div>
                <label className="text-sm font-semibold text-foreground">Email Notifications</label>
                <p className="text-sm text-muted-foreground mt-1">
                  Receive updates about your analyses and account
                </p>
              </div>
              <Button
                variant={notifications ? 'default' : 'outline'}
                size="sm"
                onClick={() => setNotifications(!notifications)}
              >
                {notifications ? 'Enabled' : 'Disabled'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Logout */}
        <Card className="border-destructive/20 bg-destructive/5">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive/10">
                <LogOut className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <CardTitle className="text-destructive">Logout</CardTitle>
                <CardDescription>Sign out of your account</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              You will be logged out from this device. You can log back in at any time.
            </p>
            <Button
              variant="destructive"
              onClick={() => {
                logout()
                window.location.href = '/login'
              }}
              className="w-full sm:w-auto"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </CardContent>
        </Card>

        {/* Footer info */}
        <div className="text-center text-xs text-muted-foreground pt-4 border-t border-border/50">
          <p>Dermascan AI v1.0 • Medical-grade Skin Analysis</p>
          <p className="mt-1">© 2024 Dermascan. All rights reserved.</p>
        </div>
      </div>
    </Layout>
  )
}
