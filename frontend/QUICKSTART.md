# 🚀 Dermascan AI - Quick Start

## 30 Seconds Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Update API URL (if needed)
# Edit .env file and update VITE_API_BASE_URL

# 3. Start development server
pnpm dev

# 4. Open browser
# http://localhost:5173
```

## Project Built ✅

Your complete React + Vite medical-tech frontend includes:

### 🔒 Authentication
- Login/Signup pages with validation
- JWT token management
- Protected routes
- Auto-logout on token expiration

### 📊 Dashboard
- Stats overview
- Quick actions
- Recent analysis list

### 🖼️ Image Analysis
- Image upload with preview
- File validation (size, type)
- Analysis results display
- PDF export & print

### 📁 Analysis History
- Table view of all analyses
- Download, view, delete actions
- Severity badges
- Confidence scores

### ⚙️ Settings
- Account information
- Dark mode toggle
- Privacy settings
- Logout

### 🎨 Design
- Professional medical UI
- Light + dark modes
- Fully responsive (mobile to desktop)
- Accessible components
- Professional color scheme

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Build | Vite |
| Frontend | React 18 + TypeScript |
| Styling | Tailwind CSS |
| State | Zustand |
| API | Axios |
| Routing | React Router |
| UI Components | Radix UI |

## File Structure

```
src/
├── pages/          # 7 main pages (Login, Signup, Dashboard, Analysis, History, Settings, Results)
├── components/     # UI components + Layout (Header, Sidebar)
├── store/          # 3 Zustand stores (auth, analysis, ui)
├── services/       # API services (auth, analysis)
├── types/          # TypeScript interfaces
├── styles/         # Tailwind + CSS variables
└── App.tsx         # Routing configuration
```

## Key Features

✅ **Production Ready**
- Full TypeScript support
- Comprehensive error handling
- Proper state management
- API interceptors

✅ **Secure**
- Protected routes
- JWT authentication
- CORS-ready
- Secure token handling

✅ **Responsive**
- Mobile-first design
- Tablet optimized
- Desktop polished
- All viewports covered

✅ **Accessible**
- Keyboard navigation
- Screen reader support
- WCAG compliant
- Semantic HTML

## Environment Variables

```env
VITE_API_BASE_URL=http://localhost:3000/api    # Your backend API
VITE_APP_NAME=Dermascan AI                     # App name
```

## Commands

```bash
pnpm dev          # Start dev server (http://localhost:5173)
pnpm build        # Production build → dist/
pnpm preview      # Preview production build
pnpm lint         # Check code
```

## API Integration

Your backend should provide these endpoints:

**Auth:**
- POST `/auth/login` → `{ token, user }`
- POST `/auth/signup` → `{ token, user }`
- GET `/auth/me` → `{ user }`

**Analysis:**
- POST `/analysis/upload` → `{ id, imageUrl, analysis, status }`
- GET `/analysis/:id` → Analysis result
- GET `/analysis/history` → History array
- GET `/analysis/statistics` → Stats

## Next Steps

1. **Connect Backend**
   - Update `VITE_API_BASE_URL` in `.env`
   - Verify API endpoints match expected format

2. **Customize Design**
   - Edit `src/styles/variables.css` to change colors
   - Update `src/components/layout/Sidebar.tsx` for different nav

3. **Add Features**
   - Create new pages in `src/pages/`
   - Add routes in `src/App.tsx`
   - Create services in `src/services/`

4. **Deploy**
   - Run `pnpm build`
   - Deploy `dist/` folder
   - Set `VITE_API_BASE_URL` on hosting platform

## Testing Checklist

- [ ] Login works with valid credentials
- [ ] Signup validation works (password match, length)
- [ ] Protected routes redirect to login when logged out
- [ ] Image upload accepts only images
- [ ] File size validation works
- [ ] Analysis results display correctly
- [ ] Dark mode toggle works
- [ ] Sidebar mobile menu works
- [ ] Logout clears auth state
- [ ] Dark mode persists on refresh

## Troubleshooting

**API calls failing?**
- Check `VITE_API_BASE_URL` matches your backend
- Check backend is running
- Check CORS settings on backend
- Check DevTools Network tab for errors

**Auth not persisting?**
- Check localStorage has `auth-store` key
- Verify token is valid
- Check browser console for errors

**Styles look broken?**
- Clear browser cache
- Run `pnpm dev` again
- Check CSS variables in `src/styles/variables.css`

## Documentation

- **Full Guide**: See `IMPLEMENTATION_GUIDE.md`
- **README**: See `README.md`
- **Code Comments**: Check component files for inline docs

---

**Ready to go!** 🎉

Start with `pnpm dev` and begin testing. Questions? Check the implementation guide or inspect components in the `src/` folder.
