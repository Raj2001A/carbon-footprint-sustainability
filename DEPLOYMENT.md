# Deployment Guide

## Production Build

### Prerequisites
- Node.js v18+
- npm v9+
- Angular CLI 18.x

### Build Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run production build**
   ```bash
   npm run build
   ```

3. **Build output location**
   - Browser bundle: `dist/carbon-footprint-tracker/browser/`
   - Server bundle: `dist/carbon-footprint-tracker/server/`

## Deployment Options

### Option 1: Static Hosting (Netlify, Vercel, GitHub Pages)

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the `dist/carbon-footprint-tracker/browser/` folder

### Option 2: Node.js Server (Heroku, AWS, DigitalOcean)

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the server:
   ```bash
   node dist/carbon-footprint-tracker/server/server.mjs
   ```

3. The app will be available at `http://localhost:4200`

## Environment Configuration

### Production Environment Variables
- `NODE_ENV=production`
- `PORT=4200` (or your preferred port)

## Performance Checklist

- ✅ Build completes without errors
- ✅ All tests pass
- ✅ No console errors or warnings
- ✅ Bundle sizes within budget
- ✅ SSR prerendering enabled
- ✅ Lazy loading configured
- ✅ localStorage persistence working
- ✅ Chart.js rendering correctly

## Monitoring

Monitor the following in production:
- Application error logs
- Performance metrics
- User interactions
- Data persistence (localStorage)

## Rollback Plan

If issues occur:
1. Revert to previous commit
2. Rebuild and redeploy
3. Check error logs for root cause

