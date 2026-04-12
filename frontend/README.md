# Dermascan AI - React + Vite Frontend

A production-ready medical-tech frontend for skin condition analysis using React, Vite, TypeScript, and Tailwind CSS.

## Features

- 🔐 **Authentication**: Secure login/signup with token management
- 🖼️ **Image Analysis**: Upload and analyze skin images with AI
- 📊 **Dashboard**: View analytics and recent analyses
- 📁 **History**: Complete analysis history with export/delete
- 🎨 **Dark Mode**: Full dark mode support
- 📱 **Responsive**: Mobile-first responsive design
- ♿ **Accessible**: Built with Radix UI components
- 🔒 **Secure**: Protected routes and API interceptors

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool & dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **Radix UI** - Accessible components

## Getting Started

### Prerequisites

- Node.js 16+
- npm/pnpm/yarn

### Installation

```bash
# Install dependencies
pnpm install

# Create .env file
cp .env.example .env

# Update VITE_API_BASE_URL in .env to your backend API
```

### Development

```bash
# Start dev server (http://localhost:5173)
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── layout/          # Layout components (Header, Sidebar)
│   └── ProtectedRoute   # Auth guard component
├── pages/               # Page components
│   ├── LoginPage
│   ├── SignupPage
│   ├── DashboardPage
│   ├── AnalysisPage
│   ├── AnalysisResultPage
│   ├── HistoryPage
│   └── SettingsPage
├── store/               # Zustand stores
│   ├── authStore        # Auth state
│   ├── analysisStore    # Analysis results
│   └── uiStore          # UI preferences
├── services/            # API services
│   ├── api              # Axios instance & interceptors
│   ├── authService      # Auth API calls
│   └── analysisService  # Analysis API calls
├── types/               # TypeScript types
├── lib/                 # Utilities
├── styles/              # Global styles
└── App.tsx              # Main app with routing
```

## Environment Variables

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=Dermascan AI
```

## API Integration

The frontend expects the following API endpoints:

### Auth
- `POST /auth/login` - Login
- `POST /auth/signup` - Register
- `POST /auth/logout` - Logout
- `GET /auth/me` - Get current user
- `POST /auth/password-reset-request` - Request password reset
- `POST /auth/password-reset` - Reset password

### Analysis
- `POST /analysis/upload` - Upload image for analysis
- `GET /analysis/:id` - Get analysis result
- `GET /analysis/history` - Get analysis history
- `DELETE /analysis/:id` - Delete analysis
- `GET /analysis/:id/export/pdf` - Export as PDF
- `GET /analysis/statistics` - Get user statistics

## Authentication

The app uses JWT-based authentication with:
- Token stored in Zustand store (persisted to localStorage)
- Axios interceptors for automatic token injection
- Automatic redirect to login on 401 responses
- Protected routes that require authentication

## Styling

- Built with **Tailwind CSS v4**
- **CSS variables** for theming (see `src/styles/variables.css`)
- **Dark mode** via `.dark` class on `<html>`
- Semantic design tokens (primary, secondary, accent, etc.)

## Dark Mode

Dark mode is automatically initialized based on system preference and user choice:
- Stored in localStorage under `darkMode` key
- Applied to `document.documentElement.classList`
- Button in header to toggle

## Error Handling

- API errors are caught and displayed to users
- Form validation on signup/login
- File size/type validation on image upload
- User-friendly error messages

## License

MIT
