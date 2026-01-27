# Website Deployment Instructions

## Quick Deploy to GitHub Pages

1. **Enable GitHub Pages**:
   - Go to repository settings (https://github.com/Jadav-Gajanand-19/gram-manch-website/settings/pages)
   - Under "Source", select "Deploy from a branch"
   - Select branch: `main` and folder: `/ (root)`
   - Click "Save"

2. **Website URL**:
   After enabling, your site will be available at:
   `https://jadav-gajanand-19.github.io/gram-manch-website/`

3. **Add GramManch APK**:
   - Build the APK: `flutter build apk --release`
   - Copy APK from `gram_manch/build/app/outputs/flutter-apk/app-release.apk`
   - Rename to `GramManch.apk` and place in website root
   - Commit and push to enable downloads

## Alternative: Deploy to Netlify

1. Visit https://app.netlify.com
2. Drag and drop the `gram_manch_website` folder
3. Update `script.js` with the Netlify URL for APK downloads

## Alternative: Deploy to Vercel

```bash
cd gram_manch_website
npx vercel
```

Follow the prompts to deploy.
