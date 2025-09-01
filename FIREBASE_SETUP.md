# Firebase Authentication Setup Guide

This guide will help you set up Firebase Authentication for your MHD app.

## Prerequisites

1. A Google account
2. Node.js and npm installed
3. Your React app (already set up)

## Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter a project name (e.g., "mhd-app")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project, click on "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable the following sign-in providers:
   - **Email/Password**: Click on it and toggle "Enable"
   - **Google**: Click on it, toggle "Enable", and add your project's support email

## Step 3: Get Firebase Configuration

1. In your Firebase project, click on the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (`</>`) to add a web app
5. Enter an app nickname (e.g., "mhd-web-app")
6. Click "Register app"
7. Copy the Firebase configuration object

## Step 4: Configure Environment Variables

1. In your project root, create a `.env` file (copy from `.env.example`)
2. Replace the placeholder values with your actual Firebase config:

```env
REACT_APP_FIREBASE_API_KEY=your_actual_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_actual_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_actual_sender_id
REACT_APP_FIREBASE_APP_ID=your_actual_app_id
```

## Step 5: Configure Authorized Domains

1. In Firebase Console, go to Authentication > Settings
2. Scroll down to "Authorized domains"
3. Add your development domain: `localhost`
4. Add your production domain when you deploy

## Step 6: Test the Setup

1. Start your development server: `npm start`
2. Navigate to `http://localhost:3000`
3. Try creating an account with email/password
4. Try signing in with Google
5. Check the Firebase Console > Authentication > Users to see if users are being created

## Features Implemented

### Authentication
- ✅ Email/Password login and registration
- ✅ Google OAuth login
- ✅ Logout functionality
- ✅ Real-time authentication state management

### Dashboard Features
- ✅ User profile display
- ✅ Email verification status
- ✅ Send email verification
- ✅ Change password functionality
- ✅ Responsive design

### Security
- ✅ Password validation (minimum 6 characters)
- ✅ Email verification workflow
- ✅ Secure logout
- ✅ Error handling for all auth operations

## Troubleshooting

### Common Issues

1. **"Firebase: Error (auth/popup-blocked)"**
   - Solution: Allow popups in your browser for localhost

2. **"Firebase: Error (auth/unauthorized-domain)"**
   - Solution: Add your domain to authorized domains in Firebase Console

3. **"Firebase: Error (auth/invalid-api-key)"**
   - Solution: Check your `.env` file has the correct API key

4. **Google Sign-in not working**
   - Solution: Make sure Google sign-in is enabled in Firebase Console
   - Check that your OAuth consent screen is configured

### Development Tips

- Always use environment variables for Firebase config
- Never commit your `.env` file to version control
- Test both email/password and Google authentication
- Check the browser console for any Firebase errors

## Next Steps

1. Set up Firebase Hosting for deployment
2. Configure custom email templates in Firebase Console
3. Add password reset functionality
4. Implement user profile management
5. Add role-based access control if needed

## Support

If you encounter any issues:
1. Check the Firebase Console for error logs
2. Review the browser console for client-side errors
3. Ensure all environment variables are correctly set
4. Verify that all required Firebase services are enabled
