# Deployment Guide - Othello Cyber Edition

## Prerequisites

- Vercel account (or other hosting provider)
- Base app account
- Your app deployed to a public URL

## Step 1: Deploy to Vercel

### Option A: Deploy via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Option B: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select your GitHub repository (or upload the project)
4. Configure project:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Add Environment Variables:
   ```
   NEXT_PUBLIC_APP_URL=https://othello-omega.vercel.app
   ```
6. Click "Deploy"

### Important: Disable Deployment Protection

1. Go to your project settings in Vercel
2. Navigate to "Settings" → "Deployment Protection"
3. Toggle "Vercel Authentication" to **OFF**
4. Click "Save"

This is required for the Farcaster account association tool to access your manifest.

## Step 2: Generate Account Association

1. Go to [base.dev/preview?tab=account](https://base.dev/preview?tab=account)
2. Paste your app URL: `othello-omega.vercel.app`
3. Click "Submit"
4. Click "Verify" and follow the instructions
5. Copy the generated `accountAssociation` object

## Step 3: Update Farcaster Manifest

1. Open `public/.well-known/farcaster.json`
2. Replace the empty `accountAssociation` object with your generated credentials:

```json
{
  "accountAssociation": {
    "header": "YOUR_GENERATED_HEADER",
    "payload": "YOUR_GENERATED_PAYLOAD",
    "signature": "YOUR_GENERATED_SIGNATURE"
  },
  "frame": {
    "version": "1",
    "name": "Othello - Cyber Edition",
    "iconUrl": "https://othello-omega.vercel.app/icon.png",
    "homeUrl": "https://othello-omega.vercel.app/",
    "imageUrl": "https://othello-omega.vercel.app/hero-image.png",
    "buttonTitle": "Play Othello",
    "splashImageUrl": "https://othello-omega.vercel.app/hero-image.png",
    "splashBackgroundColor": "#0a0e1a",
    "webhookUrl": "https://othello-omega.vercel.app/api/webhook"
  }
}
```

3. Update all URLs with your actual domain
4. Commit and push changes
5. Vercel will automatically redeploy

## Step 4: Verify Your App

1. Go to [base.dev/preview](https://base.dev/preview)
2. Enter your app URL
3. Verify the following:
   - ✅ Embed displays correctly
   - ✅ Icon shows properly
   - ✅ Launch button works
   - ✅ Account association is valid
   - ✅ Metadata is complete

## Step 5: Test in Base App

1. Open the Base app (mobile)
2. Create a new cast
3. Paste your app URL
4. The app should show an embed preview
5. Tap to launch and test functionality

## Step 6: Publish

To publish your mini app:

1. Create a cast in the Base app with your app's URL
2. The embed will show automatically
3. Users can launch your app directly from the cast

## Optional: Submit for Featured Placement

If you want your app to be featured:

1. Verify your mini app at [base.dev](https://base.dev/)
2. Fill out the [submission form](https://docs.google.com/forms/d/e/1FAIpQLSeZiB3fmMS7oxBKrWsoaew2LFxGpktnAtPAmJaNZv5TOCXIZg/viewform)
3. Ensure your app meets all [featured guidelines](https://docs.base.org/mini-apps/featured-guidelines/overview)

## Troubleshooting

### Build Errors

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Account Association Issues

- Ensure Deployment Protection is disabled
- Manifest must be accessible at `/.well-known/farcaster.json`
- URLs must be HTTPS (no localhost)
- Use the exact domain from your deployment

### App Not Loading

- Check browser console for errors
- Verify all environment variables are set
- Ensure public assets are accessible
- Test on mobile device

### Performance Issues

- Optimize images (icon and hero should be compressed)
- Enable Vercel Edge Caching
- Minimize bundle size

## Monitoring

Monitor your app's performance:

```bash
# Check build output
vercel logs

# Monitor analytics
# Go to Vercel Dashboard → Analytics
```

## Updates

To deploy updates:

1. Make changes locally
2. Test with `npm run dev`
3. Build and test with `npm run build && npm start`
4. Commit and push to trigger automatic deployment

Or manually:

```bash
vercel --prod
```

## Environment Variables

Required:
- `NEXT_PUBLIC_APP_URL` - Your app's public URL

Optional for future features:
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` - For wallet connections

## Support Links

- [Base Mini Apps Docs](https://docs.base.org/mini-apps/)
- [Farcaster Frame Docs](https://docs.farcaster.xyz/reference/frames/spec)
- [Vercel Docs](https://vercel.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
