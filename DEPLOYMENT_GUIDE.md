# Journal App Deployment Guide

This guide provides instructions for deploying the Express.js backend and the Flutter frontend.

## 1. Prerequisites

1.  **MongoDB Atlas Account**: For a cloud-hosted database.
2.  **Render Account**: For deploying the Express backend.
3.  **Firebase Account**: For deploying the Flutter Web frontend.
4.  **OpenWeatherMap API Key**: For the weather feature.

## 2. Backend Deployment (Express.js on Render)

The backend is located in the `journal_app/backend` directory.

### Step 2.1: Configure Environment Variables

Before deployment, update the `.env` file with your credentials.

**File:** `journal_app/backend/.env`
\`\`\`env
# 1. Replace with your MongoDB Atlas connection string
MONGODB_URI="<YOUR_MONGODB_ATLAS_URI>"

# 2. Replace with your OpenWeatherMap API Key
OPENWEATHER_API_KEY="<YOUR_OPENWEATHER_API_KEY>"

# 3. Choose a strong, secret key for security (MUST match frontend)
JWT_SECRET="<YOUR_STRONG_SECRET_KEY>"
\`\`\`

### Step 2.2: Deploy to Render

1.  **Push to GitHub**: Commit your entire `journal_app` project to a new GitHub repository.
2.  **Create New Web Service**: In your Render dashboard, click "New" -> "Web Service".
3.  **Connect Repository**: Connect the GitHub repository you created.
4.  **Configuration**:
    *   **Root Directory**: `journal_app/backend`
    *   **Build Command**: `npm install`
    *   **Start Command**: `node server.js`
5.  **Environment Variables**: Add your `MONGODB_URI`, `OPENWEATHER_API_KEY`, and `JWT_SECRET` as environment variables in the Render settings.
6.  **Deploy**: Click "Create Web Service". Render will build and deploy your backend.

**Note:** Once deployed, Render will provide a public URL (e.g., `https://my-journal-api.onrender.com`). You will need this for the frontend configuration.

## 3. Frontend Deployment (Flutter Web on Firebase Hosting)

The frontend is located in the `journal_app/frontend` directory.

### Step 3.1: Update Frontend API URL

Update the `_backendUrl` and `_secretKey` in the Flutter provider file to point to your deployed backend.

**File:** `journal_app/frontend/lib/providers/journal_provider.dart`
\`\`\`dart
// lib/providers/journal_provider.dart

// IMPORTANT: Replace with your deployed backend URL
const String _backendUrl = '<YOUR_RENDER_URL>/api/journals'; 
// Example: const String _backendUrl = 'https://my-journal-api.onrender.com/api/journals';

// IMPORTANT: Must match JWT_SECRET in backend .env
const String _secretKey = '<YOUR_STRONG_SECRET_KEY>'; 
\`\`\`

### Step 3.2: Build Flutter Web App

1.  **Install Flutter**: If not installed, follow the official Flutter guide.
2.  **Enable Web**: Run `flutter config --enable-web`
3.  **Build**: Navigate to the frontend directory and build the web app:
    ```bash
    cd journal_app/frontend
    flutter build web
    ```
    This creates the static files in `build/web`.

### Step 3.3: Deploy to Firebase Hosting

1.  **Install Firebase CLI**: `npm install -g firebase-tools`
2.  **Login**: `firebase login`
3.  **Initialize**: Navigate to the frontend directory and initialize Firebase:
    ```bash
    cd journal_app/frontend
    firebase init
    ```
    *   Select **Hosting** features.
    *   Select your Firebase project.
    *   **Public directory**: `build/web`
    *   **Configure as a single-page app**: Yes
4.  **Deploy**:
    ```bash
    firebase deploy --only hosting
    ```
    Firebase will provide a public URL (e.g., `https://your-project-id.web.app`).

## 4. Final Result

Once both are deployed, you will have:
1.  **Backend URL**: The API endpoint for your data (e.g., Render URL).
2.  **Frontend URL**: The live journal application (e.g., Firebase URL).

You can now use the frontend URL to access your journal app, which will communicate securely with your backend.
