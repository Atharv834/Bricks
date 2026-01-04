# Deployment Guide for GitHub Pages

## Overview
This guide provides instructions for deploying the CyberSec Bug Bounty Hub application to GitHub Pages.

## Prerequisites
- GitHub repository with Pages enabled
- Node.js and npm installed
- Git configured with appropriate credentials

## Automated Deployment

The application is configured for automated deployment to GitHub Pages. The `package.json` includes the necessary configuration:

```json
{
  "homepage": "https://Atharv834.github.io/Bricks",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

### Deploy Command

To deploy the application to GitHub Pages, run:

```bash
npm run deploy
```

This command will:
1. Build the production-optimized bundle (via `predeploy` script)
2. Deploy the `build` directory to the `gh-pages` branch
3. Make the site available at: https://Atharv834.github.io/Bricks

## Manual Deployment

If automated deployment is not working, you can manually deploy:

### Option 1: Using GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./build
      
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```

### Option 2: Manual Branch Push

```bash
# Build the application
npm run build

# Navigate to build directory
cd build

# Initialize git (if needed)
git init
git add -A
git commit -m 'Deploy to GitHub Pages'

# Force push to gh-pages branch
git push -f git@github.com:Atharv834/Bricks.git main:gh-pages

cd ..
```

## GitHub Pages Configuration

Ensure your repository settings are configured correctly:

1. Go to repository **Settings** → **Pages**
2. Set **Source** to: `gh-pages` branch
3. Set **Folder** to: `/ (root)`
4. Click **Save**

The site will be available at: `https://Atharv834.github.io/Bricks`

## Build Verification

Before deploying, verify the build:

```bash
# Run production build
npm run build

# Check build output
ls -la build/

# Verify bundle sizes
du -sh build/static/js/*.js
du -sh build/static/css/*.css
```

Expected output:
- JavaScript bundle: ~82 KB (gzipped)
- CSS bundle: ~6 KB (gzipped)

## Post-Deployment Verification

After deployment, verify the following:

### 1. Site Accessibility
- Visit: https://Atharv834.github.io/Bricks
- Check that the page loads correctly
- Verify all assets load (CSS, JS, images)

### 2. Security Headers
Open browser DevTools → Network tab and verify headers:
- ✅ Content-Security-Policy present
- ✅ X-Frame-Options: DENY
- ✅ X-Content-Type-Options: nosniff
- ✅ Referrer-Policy present

### 3. Functionality Testing
- ✅ Search functionality works
- ✅ Filters apply correctly
- ✅ Sorting operates as expected
- ✅ Modal opens and displays data
- ✅ Theme toggle switches between dark/light
- ✅ Keyboard navigation functional
- ✅ No console errors

### 4. Performance Verification
- Open Lighthouse in Chrome DevTools
- Run audit for Performance, Accessibility, Best Practices, SEO
- Verify all scores are in acceptable ranges

## Troubleshooting

### Issue: 404 Errors on Refresh
**Solution**: GitHub Pages serves static files only. The routing is handled client-side. Ensure `BrowserRouter` uses `basename="/Bricks"` or use `HashRouter`.

### Issue: Assets Not Loading
**Solution**: Verify the `homepage` field in `package.json` matches your GitHub Pages URL.

### Issue: CSP Errors
**Solution**: If CSP blocks resources, check that all resources are loaded from allowed sources in the CSP meta tag.

### Issue: gh-pages Command Fails
**Solutions**:
1. Ensure `gh-pages` is installed: `npm install --save-dev gh-pages`
2. Check git credentials are configured
3. Try clearing the gh-pages cache: `rm -rf node_modules/.cache/gh-pages`
4. Use GitHub Actions workflow instead

## Security Considerations for Deployment

### 1. HTTPS Only
GitHub Pages automatically serves sites over HTTPS. Ensure:
- No mixed content warnings
- All external resources use HTTPS
- No hardcoded HTTP URLs

### 2. CSP Configuration
The application includes a strict Content Security Policy. If adding external resources:
- Update CSP meta tag in `public/index.html`
- Test thoroughly after changes
- Use nonces or hashes for inline scripts when possible

### 3. Sensitive Data
Before deploying:
- ✅ No API keys or secrets in code
- ✅ No sensitive information in comments
- ✅ No debug information exposed
- ✅ Error messages don't reveal internals

### 4. Dependencies
Keep dependencies updated:
```bash
npm audit
npm audit fix
npm outdated
```

## Monitoring Post-Deployment

### Analytics (Optional)
To add analytics, update `public/index.html` with your tracking code.

### Error Tracking (Optional)
Consider integrating error tracking services:
- Sentry
- LogRocket
- Rollbar

### Uptime Monitoring
Monitor site availability with services like:
- UptimeRobot
- Pingdom
- StatusCake

## Rollback Procedure

If issues occur after deployment:

```bash
# Revert to previous commit
git revert HEAD

# Rebuild and redeploy
npm run deploy
```

Or manually:
```bash
# Checkout previous version
git checkout gh-pages
git reset --hard HEAD~1
git push -f origin gh-pages
```

## Support

For deployment issues:
1. Check [GitHub Pages documentation](https://docs.github.com/en/pages)
2. Review [gh-pages package docs](https://github.com/tschaub/gh-pages)
3. Check GitHub Actions logs if using CI/CD
4. Verify repository permissions and settings

---

**Last Updated**: January 4, 2026  
**Application Version**: 1.0.0  
**Build Status**: ✅ Production Ready
