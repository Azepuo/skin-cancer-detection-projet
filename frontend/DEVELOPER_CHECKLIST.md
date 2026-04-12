# ✅ Developer Checklist - Dermascan AI

## Pre-Launch Checklist

### Setup & Installation
- [ ] Clone/download project
- [ ] Run `pnpm install`
- [ ] Check all dependencies installed (node_modules folder exists)
- [ ] No installation errors in console

### Configuration
- [ ] `.env` file exists in project root
- [ ] `VITE_API_BASE_URL` is set correctly
- [ ] Backend API is running and accessible
- [ ] CORS is enabled on backend

### Development Server
- [ ] Run `pnpm dev`
- [ ] No build errors
- [ ] Server starts on http://localhost:5173
- [ ] Browser opens/page loads

### Navigation & Pages
- [ ] Can navigate to all pages without errors
- [ ] Sidebar navigation works on desktop
- [ ] Mobile hamburger menu appears on small screens
- [ ] All routes load correctly

### Authentication Flow
- [ ] Can see login page at `/login`
- [ ] Can see signup page at `/signup`
- [ ] Form validation works (invalid email shows error)
- [ ] Password mismatch shows error on signup
- [ ] Login/signup link toggles correctly
- [ ] After login, redirects to `/dashboard`
- [ ] Dashboard shows authenticated UI

### Protected Routes
- [ ] Clear auth storage/logout
- [ ] Accessing `/dashboard` redirects to `/login`
- [ ] Accessing `/history` redirects to `/login`
- [ ] Only login/signup are accessible when logged out

### Dashboard
- [ ] Page loads without errors
- [ ] Stats cards display
- [ ] "Start Analysis" button links to `/analysis`
- [ ] "View History" button links to `/history`
- [ ] Dark mode toggle works
- [ ] Header shows user name/email

### Analysis Page
- [ ] Image upload area visible
- [ ] Guidelines display correctly
- [ ] Can click to upload file
- [ ] Image preview shows after upload
- [ ] Clear button works
- [ ] Medical disclaimer visible
- [ ] "Analyze Image" button disabled until file selected

### Dark Mode
- [ ] Toggle button in header
- [ ] Clicking toggle changes theme
- [ ] Dark mode colors apply correctly
- [ ] Theme persists after page refresh
- [ ] All pages look good in dark mode

### API Integration
- [ ] Login API call succeeds (check Network tab)
- [ ] Token stored in localStorage after login
- [ ] Token sent in Authorization header for requests
- [ ] 401 responses trigger logout and redirect
- [ ] Error messages display for failed requests

### Responsive Design
- [ ] Desktop view looks correct
- [ ] Tablet view is responsive
- [ ] Mobile view is usable
- [ ] Sidebar collapses on mobile
- [ ] Tables don't overflow on mobile
- [ ] All text is readable on small screens

### Error Handling
- [ ] Invalid login shows error message
- [ ] Invalid file upload shows error
- [ ] Network errors display user-friendly message
- [ ] No console errors on normal operations
- [ ] Form validation works

### Styling & Colors
- [ ] Primary color (orange) appears consistently
- [ ] Buttons have correct colors
- [ ] Text contrast is good (light/dark text on backgrounds)
- [ ] Borders are visible
- [ ] Spacing looks balanced
- [ ] No broken layouts

### Accessibility
- [ ] Can tab through form inputs
- [ ] Buttons respond to Enter key
- [ ] Focus states are visible
- [ ] Buttons have proper aria-labels where needed
- [ ] Form labels are associated with inputs
- [ ] Color isn't the only indicator (badges have text)

### Production Build
- [ ] Run `pnpm build`
- [ ] No build errors
- [ ] `dist/` folder created
- [ ] HTML/CSS/JS files in dist
- [ ] Build completes in reasonable time

### Final Checks
- [ ] No console errors or warnings
- [ ] All pages load quickly
- [ ] Images/icons load correctly
- [ ] No broken links
- [ ] Logout works properly
- [ ] Re-login works after logout
- [ ] All features tested in latest browser

---

## Testing Scenarios

### Login Flow
```
1. Go to /login
2. Enter invalid email → See error
3. Enter valid email + wrong password → See error
4. Enter valid credentials → Redirect to dashboard
5. Check localStorage for token
6. Refresh page → Still logged in
```

### Image Upload
```
1. Go to /analysis
2. Try uploading non-image file → See error
3. Try uploading file > 10MB → See error
4. Upload valid image → See preview
5. Click "Analyze Image" → Loading state
6. Wait for result → Redirect to result page (if API ready)
```

### Navigation
```
1. Login to app
2. Click each sidebar item → Page loads
3. Check URL changes correctly
4. Click back browser button → Works
5. Click forward browser button → Works
6. Direct URL navigation works (e.g., /history)
```

### Dark Mode Persistence
```
1. Enable dark mode
2. Refresh page → Dark mode still on
3. Clear localStorage
4. Refresh page → Uses system preference
5. Disable dark mode
6. Refresh page → Light mode active
7. Check localStorage has darkMode key
```

### Error Recovery
```
1. Start with invalid API URL
2. Try to login → See error message
3. Fix API URL in .env
4. Dev server auto-reloads
5. Try to login again → Works
```

---

## Performance Checklist

- [ ] Page loads in under 3 seconds
- [ ] No layout shift after images load
- [ ] No memory leaks (check DevTools Memory tab)
- [ ] Smooth scrolling
- [ ] Dark mode toggle is instant
- [ ] Form submission feels responsive

---

## Browser Compatibility

Test in:
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

---

## Documentation Review

- [ ] README.md is accurate
- [ ] QUICKSTART.md works as described
- [ ] IMPLEMENTATION_GUIDE.md is complete
- [ ] All code files have comments where needed
- [ ] API integration documented

---

## Code Quality

- [ ] No `console.log` statements left (except errors)
- [ ] No `any` TypeScript types
- [ ] Proper error handling (no unhandled promises)
- [ ] Components are properly structured
- [ ] No dead code or unused imports
- [ ] Environment variables properly used

---

## Before Deployment

- [ ] Update `VITE_API_BASE_URL` to production API
- [ ] Set all environment variables on hosting
- [ ] Run `pnpm build` successfully
- [ ] Test production build locally with `pnpm preview`
- [ ] Configure CORS on backend (if needed)
- [ ] Backup current configuration
- [ ] Setup monitoring/error tracking
- [ ] Document deployment process

---

## Post-Deployment

- [ ] Verify site loads in production
- [ ] Test login with production API
- [ ] Check all pages load
- [ ] Monitor error logs
- [ ] Check performance metrics
- [ ] Verify SSL certificate
- [ ] Test on mobile devices
- [ ] Gather user feedback

---

## Support Resources

- **Issue?** Check browser console (DevTools → Console tab)
- **API issue?** Check DevTools Network tab, see actual requests
- **Build issue?** Check full error message, Google the error
- **Performance issue?** Use DevTools Lighthouse audit
- **Questions?** Review IMPLEMENTATION_GUIDE.md

---

## Troubleshooting Guide

| Issue | Solution |
|-------|----------|
| Port 5173 in use | Change port in `vite.config.ts` |
| API 404 errors | Check `VITE_API_BASE_URL` in `.env` |
| Styles not loading | Clear cache (Ctrl+Shift+R), restart dev server |
| Auth not persisting | Check localStorage, verify token format |
| Can't upload image | Check file size/type, check backend endpoint |
| Dark mode not working | Clear localStorage, refresh browser |
| Build fails | Delete `node_modules`, run `pnpm install` again |

---

**Ready to launch? Start with the checklist above!** ✅

For detailed information, see PROJECT_SUMMARY.md and IMPLEMENTATION_GUIDE.md.
