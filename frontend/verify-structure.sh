#!/bin/bash

# Dermascan AI - Project Verification Script
# Run this to verify all files are in place

echo "🔍 Dermascan AI Project Structure Verification"
echo "================================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1"
    else
        echo -e "${RED}✗${NC} $1 (MISSING)"
    fi
}

check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $1/"
    else
        echo -e "${RED}✗${NC} $1/ (MISSING)"
    fi
}

echo "📁 Configuration Files"
check_file "vite.config.ts"
check_file "tsconfig.json"
check_file "tsconfig.node.json"
check_file "tailwind.config.ts"
check_file "postcss.config.js"
check_file "package.json"
check_file ".env"
check_file ".env.example"
check_file ".gitignore"
check_file "index.html"

echo ""
echo "📚 Documentation Files"
check_file "README.md"
check_file "QUICKSTART.md"
check_file "IMPLEMENTATION_GUIDE.md"
check_file "ENV_SETUP.md"
check_file "PROJECT_SUMMARY.md"

echo ""
echo "📁 Source Directories"
check_dir "src"
check_dir "src/pages"
check_dir "src/components"
check_dir "src/store"
check_dir "src/services"
check_dir "src/types"
check_dir "src/lib"
check_dir "src/styles"

echo ""
echo "📄 Main Source Files"
check_file "src/main.tsx"
check_file "src/App.tsx"

echo ""
echo "📄 Page Components (7)"
check_file "src/pages/LoginPage.tsx"
check_file "src/pages/SignupPage.tsx"
check_file "src/pages/DashboardPage.tsx"
check_file "src/pages/AnalysisPage.tsx"
check_file "src/pages/AnalysisResultPage.tsx"
check_file "src/pages/HistoryPage.tsx"
check_file "src/pages/SettingsPage.tsx"

echo ""
echo "🎨 UI Components (8)"
check_file "src/components/ui/Button.tsx"
check_file "src/components/ui/Input.tsx"
check_file "src/components/ui/Card.tsx"
check_file "src/components/ui/Textarea.tsx"
check_file "src/components/ui/Label.tsx"
check_file "src/components/ui/Alert.tsx"
check_file "src/components/ui/Badge.tsx"
check_file "src/components/ui/index.ts"

echo ""
echo "🏗️ Layout Components (3)"
check_file "src/components/layout/Layout.tsx"
check_file "src/components/layout/Header.tsx"
check_file "src/components/layout/Sidebar.tsx"
check_file "src/components/ProtectedRoute.tsx"

echo ""
echo "📊 State Stores (3)"
check_file "src/store/authStore.ts"
check_file "src/store/analysisStore.ts"
check_file "src/store/uiStore.ts"
check_file "src/store/index.ts"

echo ""
echo "🔌 Services (3)"
check_file "src/services/api.ts"
check_file "src/services/authService.ts"
check_file "src/services/analysisService.ts"
check_file "src/services/index.ts"

echo ""
echo "📦 Types & Utils"
check_file "src/types/index.ts"
check_file "src/lib/utils.ts"

echo ""
echo "🎨 Styles"
check_file "src/styles/index.css"
check_file "src/styles/variables.css"

echo ""
echo "================================================"
echo "✅ Project structure verification complete!"
echo ""
echo "Next steps:"
echo "1. pnpm install         # Install dependencies"
echo "2. Update .env          # Set API_BASE_URL"
echo "3. pnpm dev             # Start dev server"
echo "4. Open localhost:5173  # View in browser"
echo ""
echo "📚 Documentation: See README.md and QUICKSTART.md"
echo "================================================"
