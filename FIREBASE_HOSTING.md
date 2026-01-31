# Firebase Hosting Deployment Guide

## Prerequisites
- Firebase CLI installed (`npm install -g firebase-tools`)
- Firebase project created at [Firebase Console](https://console.firebase.google.com)

## Initial Setup

### 1. Install Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Login to Firebase
```bash
firebase login
```

### 3. Initialize Firebase Hosting
```bash
cd gram_manch_website
firebase init hosting
```

**Select these options**:
- ✅ Use an existing project (select your Firebase project)
- Public directory: `.` (current directory)
- Configure as single-page app: `Yes`
- Set up automatic builds with GitHub: `No` (optional)
- Overwrite index.html: `No`

### 4. Configure Firebase in index.html

Replace the Firebase config in `index.html` with your project's config:

```javascript
const firebaseConfig = {
    apiKey: "YOUR-API-KEY",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123",
    measurementId: "G-XXXXXXXXXX"
};
```

Find your config at: **Firebase Console → Project Settings → Your apps → Web app**

## Deployment

### Deploy to Firebase Hosting
```bash
firebase deploy --only hosting
```

### View Your Site
After deployment, your site will be available at:
- **Live URL**: `https://your-project.firebaseapp.com`
- **Custom domain**: Configure in Firebase Console → Hosting

## Firebase Console Setup

### 1. Enable Firestore Database
```
Firebase Console → Firestore Database → Create Database
```

**Security Rules** (for contact form):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Contact form submissions (write-only)
    match /contact_submissions/{document} {
      allow write: if true;
      allow read: if false;  // Only admins can read
    }
  }
}
```

### 2. Enable Analytics
```
Firebase Console → Analytics → Enable Google Analytics
```

### 3. Test Analytics
Check real-time events at: **Analytics → Events → DebugView**

## Features Included

### ✅ Responsive Design
- Mobile (480px)
- Tablet (768px)
- Desktop (1024px+)

### ✅ Firebase Analytics
- Page views tracking
- Download button clicks
- Contact form submissions

### ✅ Contact Form
- Name, Email, Subject, Message fields
- Firestore integration
- Success/error messages
- Form validation

### ✅ APK Download
- Direct download from website
- Progress indication
- Toast notifications

### ✅ SEO Ready
- Meta tags
- Semantic HTML
- Fast load times

## Custom Domain Setup

### 1. Add Custom Domain
```
Firebase Console → Hosting → Add custom domain
```

### 2. Update DNS Records
Add these DNS records at your domain provider:

**Type**: A
**Name**: @
**Value**: (Firebase will provide IPs)

**Type**: TXT
**Name**: @
**Value**: (Firebase verification code)

## Continuous Deployment

### Option 1: Manual Deployment
```bash
firebase deploy --only hosting
```

### Option 2: GitHub Actions
Create `.github/workflows/firebase-hosting.yml`:

```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: your-project-id
```

## Monitoring & Analytics

### View Analytics
```
Firebase Console → Analytics → Dashboard
```

**Key Metrics**:
- Page views
- User engagement
- Download clicks
- Form submissions

### View Contact Submissions
```
Firebase Console → Firestore Database → contact_submissions
```

## Performance Optimization

### Already Implemented:
- ✅ Asset caching (31536000 seconds = 1 year)
- ✅ Gzip compression (automatic)
- ✅ CDN distribution (automatic)
- ✅ SSL certificate (automatic)

### Additional Optimizations:
```
Firebase Console → Hosting → Performance
```

## Troubleshooting

### Issue: Firebase not initialized
**Solution**: Add your Firebase config in `index.html`

### Issue: Contact form not working
**Solution**: Enable Firestore and update security rules

### Issue: Custom domain not working
**Solution**: Wait 24-48 hours for DNS propagation

### Issue: APK download not working
**Solution**: Ensure `GramManch.apk` is in the same directory

## Commands Reference

```bash
# Deploy
firebase deploy --only hosting

# Preview before deploy
firebase hosting:channel:deploy preview

# View deployment history
firebase hosting:releases:list

# Rollback to previous version
firebase hosting:rollback

# Open Firebase Console
firebase open hosting

# Check Firebase CLI version
firebase --version
```

## Costs

Firebase Hosting is **FREE** for:
- 10 GB storage
- 360 MB/day transfer
- Multiple custom domains

Upgrade to Blaze (pay-as-you-go) for higher limits.

## Support

- Firebase Docs: https://firebase.google.com/docs/hosting
- Status: https://status.firebase.google.com
- Community: https://firebase.google.com/support

---

**Your website is now production-ready!** 🚀
