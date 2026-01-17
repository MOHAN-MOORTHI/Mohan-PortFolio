# Vercel Deployment Guide

This project is configured for a **Monolith Deployment** on Vercel (Frontend React + Backend Express).

## 1. Project Configuration (Already Done)
- **`vercel.json`**: Configures rewrites to route API requests to the backend and all other requests to the React app.
- **`api/index.js`**: Serves as the Serverless Function entry point for the backend.
- **Root `package.json`**: Contains the `build` script that compiles the React app and prepares it for Vercel.

## 2. Deployment Steps

### A. Push to GitHub
Ensure all your latest changes are committed and pushed to your GitHub repository.

### B. Import to Vercel
1.  Log in to [Vercel](https://vercel.com/).
2.  Click **"Add New..."** -> **"Project"**.
3.  Import the `Mohan-PortFolio` repository.

### C. Configure Project Settings
In the "Configure Project" screen:
1.  **Framework Preset**: Select **"Other"** (or leave default, Vercel usually auto-detects, but "Other" is safer for custom Node/Express setups).
2.  **Root Directory**: Leave as `./` (default).
3.  **Build Command**: `npm run build` (This matches our root package.json script).
4.  **Output Directory**: `public` (Our build command moves client files here).
5.  **Install Command**: `npm install` (Standard).

### D. Environment Variables (CRITICAL)
You **MUST** add the following environment variables in the Vercel Dashboard for the backend to work:

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | Your MongoDB Atlas connection string. |
| `JWT_SECRET` | A long, random string for security. |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary Cloud Name. |
| `CLOUDINARY_API_KEY` | Your Cloudinary API Key. |
| `CLOUDINARY_API_SECRET` | Your Cloudinary API Secret. |
| `EMAIL_USER` | Email address for sending contact form messages. |
| `EMAIL_PASS` | App Password for the email account. |
| `NODE_ENV` | Set to `production`. |

### E. Deploy
Click **"Deploy"**. Vercel will:
1.  Install dependencies (including backend ones).
2.  Run `npm run build` (Compile React Client -> Move to `public`).
3.  Deploy the `api/index.js` as a serverless function.
4.  Serve the static files from `public`.

## Troubleshooting

-   **500 Error on API**: Check your MongoDB Connection string in Vercel. Make sure MongoDB Atlas Network Access allows `0.0.0.0/0` (Anywhere).
-   **404 on Assets**: Ensure the Build Command ran successfully and `public` folder was populated.

## Local Testing (Serverless)
To test the serverless configuration locally, you can use `vercel dev`:
1.  Install Vercel CLI: `npm i -g vercel`
2.  Run: `vercel dev`
