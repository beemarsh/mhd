# MHD Progressive Web App

A beautiful, modern Progressive Web App (PWA) built with React that can be installed on your mobile device's home screen.

## 🚀 Features

- **Progressive Web App** - Install on your phone's home screen
- **Responsive Design** - Works perfectly on all devices
- **Offline Support** - Works even without internet connection
- **Modern UI** - Beautiful gradient design with smooth animations
- **Real-time Clock** - Live time display
- **Install Prompt** - Easy installation process

## 📱 Installation

### For Android/Chrome:
1. Open the app in Chrome browser
2. Tap the "Install App" button that appears
3. Or use the browser menu → "Add to Home Screen"

### For iOS/Safari:
1. Open the app in Safari browser
2. Tap the Share button (square with arrow)
3. Select "Add to Home Screen"
4. Tap "Add"

## 🛠️ Development

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Setup
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

### Development Server
The app will run on `http://localhost:3000`

## 📁 Project Structure

```
mhd/
├── public/
│   ├── index.html          # Main HTML file with PWA meta tags
│   ├── manifest.json       # PWA manifest configuration
│   ├── sw.js              # Service worker for offline support
│   ├── favicon.ico        # App icon (16x16, 32x32, 64x64)
│   ├── logo192.png        # App icon (192x192)
│   └── logo512.png        # App icon (512x512)
├── src/
│   ├── App.js             # Main React component
│   ├── App.css            # App styles
│   ├── index.js           # React entry point
│   ├── index.css          # Global styles
│   └── reportWebVitals.js # Performance monitoring
└── package.json           # Dependencies and scripts
```

## 🎨 Customization

### Icons
Replace the placeholder icon files in the `public/` folder:
- `favicon.ico` - 16x16, 32x32, or 64x64 ICO format
- `logo192.png` - 192x192 PNG format
- `logo512.png` - 512x512 PNG format

### Colors and Styling
Modify `src/App.css` to change the app's appearance:
- Main gradient: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- Card background: `rgba(255, 255, 255, 0.95)`
- Button colors: `#667eea` to `#764ba2`

### App Name
Update the app name in:
- `public/manifest.json` - `name` and `short_name`
- `public/index.html` - `<title>` and meta tags
- `src/App.js` - Main heading

## 🔧 PWA Features

### Service Worker
The app includes a service worker (`public/sw.js`) that:
- Caches app resources for offline use
- Provides fast loading times
- Enables offline functionality

### Manifest
The PWA manifest (`public/manifest.json`) configures:
- App name and description
- Icons for different sizes
- Display mode (standalone)
- Theme colors
- Orientation settings

### Install Prompt
The app automatically shows an install prompt when:
- User hasn't installed the app
- Browser supports PWA installation
- App meets PWA criteria

## 🌐 Browser Support

- Chrome (Android) - Full PWA support
- Safari (iOS) - Add to Home Screen support
- Firefox - Full PWA support
- Edge - Full PWA support

## 📊 Performance

The app includes:
- Web Vitals monitoring
- Optimized bundle size
- Efficient caching strategy
- Responsive images and assets

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Netlify** - Drag and drop the `build/` folder
- **Vercel** - Connect your GitHub repository
- **Firebase Hosting** - Use Firebase CLI
- **GitHub Pages** - Enable in repository settings

### HTTPS Required
PWA features require HTTPS in production. Most hosting providers provide this automatically.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Happy coding! 🎉**