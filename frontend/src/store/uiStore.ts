import { create } from 'zustand'

interface UIStore {
  isDarkMode: boolean
  toggleDarkMode: () => void
  sidebarOpen: boolean
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
}

export const useUIStore = create<UIStore>((set) => {
  // Check system preference on init
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const storedMode = localStorage.getItem('darkMode')
  const isDark = storedMode ? JSON.parse(storedMode) : prefersDark

  return {
    isDarkMode: isDark,
    
    toggleDarkMode: () => 
      set((state) => {
        const newMode = !state.isDarkMode
        localStorage.setItem('darkMode', JSON.stringify(newMode))
        document.documentElement.classList.toggle('dark', newMode)
        return { isDarkMode: newMode }
      }),
    
    sidebarOpen: true,
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    setSidebarOpen: (open) => set({ sidebarOpen: open }),
  }
})

// Initialize dark mode on app start
if (localStorage.getItem('darkMode')) {
  const isDark = JSON.parse(localStorage.getItem('darkMode') || 'false')
  if (isDark) {
    document.documentElement.classList.add('dark')
  }
}
