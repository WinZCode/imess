# iMessage Clone - Deployment Guide

## 🚀 Deploy to Netlify

### Option 1: Deploy via Netlify CLI (Recommended)

1. **Login to Netlify:**
   ```bash
   netlify login
   ```

2. **Deploy the app:**
   ```bash
   netlify deploy --prod
   ```

3. Follow the prompts:
   - Create & configure a new site? **Yes**
   - Team: Select your team
   - Site name: Choose a unique name (e.g., `my-imessage-clone`)
   - Build command: `npm run build`
   - Directory to deploy: `.next`

### Option 2: Deploy via Netlify Dashboard

1. Go to [netlify.com](https://netlify.com) and sign in
2. Click "Add new site" → "Import an existing project"
3. Connect to your Git repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Click "Deploy site"

## 📱 Add to iPhone Home Screen

Once deployed, you can add the app to your iPhone home screen:

1. Open the deployed URL in Safari on your iPhone
2. Tap the **Share** button (square with arrow pointing up)
3. Scroll down and tap **"Add to Home Screen"**
4. The app will appear as "Messages" with the custom icon
5. Tap the icon to launch the app in full-screen mode

## ✨ Features

- 💬 Real-time messaging interface
- 📱 iOS-style design with dark theme
- 🎨 Beautiful gradient avatars
- 📲 PWA support for iPhone installation
- ⚡ Fast and responsive

## 🛠️ Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🌐 Live URL

After deployment, your app will be available at:
`https://[your-site-name].netlify.app`
