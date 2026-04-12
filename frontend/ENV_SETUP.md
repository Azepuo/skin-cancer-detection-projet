# Environment Configuration

## Development

```bash
# .env (for local development)
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=Dermascan AI
```

## Production

```bash
# .env.production (for production build)
VITE_API_BASE_URL=https://api.dermascan.com/api
VITE_APP_NAME=Dermascan AI
```

## Staging

```bash
# .env.staging (for staging environment)
VITE_API_BASE_URL=https://staging-api.dermascan.com/api
VITE_APP_NAME=Dermascan AI
```

## Variables Description

### VITE_API_BASE_URL
- **Type**: String
- **Required**: Yes
- **Description**: Base URL for all API requests
- **Default**: `http://localhost:3000/api`
- **Examples**:
  - Local: `http://localhost:3000/api`
  - Production: `https://api.dermascan.com/api`
  - Staging: `https://staging-api.dermascan.com/api`

### VITE_APP_NAME
- **Type**: String
- **Required**: No
- **Description**: Application name shown in headers and UI
- **Default**: `Dermascan AI`
- **Examples**:
  - Production: `Dermascan AI`
  - Staging: `Dermascan AI [Staging]`
  - Dev: `Dermascan AI [Dev]`

## Setting Environment Variables

### Locally
1. Create `.env` file in project root
2. Add variables (see `.env.example`)
3. Restart dev server for changes to take effect

### On Vercel
1. Go to Project Settings → Environment Variables
2. Add `VITE_API_BASE_URL` with your API URL
3. Set environment to Production/Preview/Development as needed
4. Redeploy to apply changes

### On Other Platforms
- Follow platform-specific documentation for environment variables
- Ensure `VITE_*` prefixed variables are available to the build process
- Use platform UI or CI/CD variables file

## Security Notes

⚠️ **Never commit `.env` files to Git**
- Use `.env.example` as template
- Add `.env*` to `.gitignore` (already done)
- Share `.env.example` with team, not actual values

⚠️ **API_BASE_URL must be HTTPS in production**
- Use `https://` for production
- Use `http://localhost:` for local development only

⚠️ **Sensitive data**
- Don't expose API keys in frontend code
- All secrets should be in backend
- Frontend can safely use API URLs that are public

## Development vs Production

| Setting | Dev | Prod |
|---------|-----|------|
| API URL | `http://localhost:3000/api` | `https://api.dermascan.com/api` |
| Debug | Dev tools enabled | Minimized, optimized |
| Build | Sourcemaps | No sourcemaps |
| Cache | Disabled | Full caching |

## Building for Different Environments

```bash
# Development (uses .env)
pnpm dev

# Build for production (uses .env or VITE_API_BASE_URL env var)
pnpm build

# Preview production build locally
pnpm preview
```

## Troubleshooting

**Variables not loading?**
- Ensure `.env` file is in project root
- Check variable names start with `VITE_`
- Restart dev server after changing `.env`
- Check DevTools → Application → Environment

**API requests to wrong URL?**
- Verify `VITE_API_BASE_URL` value
- Check if leading/trailing slashes match backend
- Test URL directly in browser DevTools console
- Check DevTools → Network tab for actual request URL

**Build fails with undefined variables?**
- Ensure `.env` file exists during build
- Check variable names (case-sensitive)
- Verify all `VITE_*` variables are set
- Run `pnpm build --verbose` for details
