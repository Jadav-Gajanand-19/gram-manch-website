# GramManch Landing Website

A beautiful, responsive landing page for the GramManch app with the same warm beige/pink theme.

## 🌟 Features

- **Warm Design**: Matches the app's beige background (#F5EFE9) and pink accent (#E91E63)
- **Responsive**: Works on all devices - desktop, tablet, and mobile
- **APK Download**: One-click download button for Android app
- **Smooth Animations**: Scroll-reveal effects for feature cards
- **Modern Layout**: Hero section, features grid, stats, and footer

## 🚀 Quick Start

### 1. Open the website

Simply open `index.html` in your browser:
- Double-click the file, or
- Right-click → Open with → Your browser

### 2. Add the APK file

After building the Android APK:
```powershell
# Build the APK
cd "../gram_manch"
flutter build apk --release

# Copy to website folder
copy "build\app\outputs\flutter-apk\app-release.apk" "../gram_manch_website/GramManch.apk"
```

### 3. Test the download

- Click the "Download App" button in the header or
- Scroll to the download section and click "Download for Android"

## 📁 Files

- `index.html` - Main landing page
- `styles.css` - All styling (warm theme colors)
- `script.js` - Download functionality and animations
- `GramManch.apk` - Android app (after building)

## 🎨 Design System

### Colors
```css
--primary: #E91E63         /* Vibrant Pink */
--primary-light: #F8BBD0   /* Light Pink */
--background: #F5EFE9      /* Warm Beige */
--surface: #FFFBF7         /* Cream White */
--text-primary: #2C2C2C    /* Dark Text */
```

### Card Colors
- Pink: #FCE4EC
- Green: #E8F5E9
- Blue: #E3F2FD
- Orange: #FFF3E0
- Purple: #F3E5F5
- Teal: #E0F2F1

## 📱 Sections

1. **Header** - Logo and download button (sticky)
2. **Hero** - Large title, features badges, phone mockup
3. **Features** - 6 feature cards with icons
4. **Stats** - 3 key metrics
5. **Download** - Main CTA section
6. **Footer** - Links and copyright

## 🌐 Deployment

### Local Server
```powershell
# Using Python
python -m http.server 8080

# Using PHP
php -S localhost:8080
```

Then open: `http://localhost:8080`

### GitHub Pages
1. Create a new repository
2. Upload all files
3. Go to Settings → Pages
4. Select main branch
5. Your site will be at `https://username.github.io/repo-name`

### Netlify
1. Drag and drop the folder to Netlify
2. Done! Get instant URL

## 📄 License

MIT License - Built for women empowerment hackathon

---

**Note**: Make sure to place the `GramManch.apk` file in the same directory as `index.html` for the download to work.
