import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute, PublicRoute } from '@/components/ProtectedRoute'
import { useAuthStore } from '@/store/authStore'
import { authService } from '@/services/authService'

// Public pages
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import SignupPage from '@/pages/SignupPage'

// Protected pages
import DashboardPage from '@/pages/DashboardPage'
import AnalysisPage from '@/pages/AnalysisPage'
import AnalysisResultPage from '@/pages/AnalysisResultPage'
import HistoryPage from '@/pages/HistoryPage'
import SettingsPage from '@/pages/SettingsPage'

export default function App() {
  const { token, login, logout, _hasHydrated } = useAuthStore()

  // Initial auth check
  useEffect(() => {
    const verifyAuth = async () => {
      if (token && _hasHydrated) {
        try {
          const user = await authService.me()
          if (user) {
            login(token, user)
          }
        } catch (error) {
          console.error('Initial auth check failed:', error)
          logout()
        }
      }
    }

    verifyAuth()
  }, [token, _hasHydrated, login, logout])

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          }
        />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analysis"
          element={
            <ProtectedRoute>
              <AnalysisPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analysis/:id"
          element={
            <ProtectedRoute>
              <AnalysisResultPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />

        {/* Redirects */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}
