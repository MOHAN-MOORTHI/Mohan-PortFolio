
# 🚀 Deployment Guide: Deploying MERN Portfolio to Vercel

Deployment on Vercel is streamlined. Since I've already configured your `vercel.json` and project structure, you just need to follow these steps.

## Prerequisites
1.  **GitHub Account**: Ensure this project is pushed to your GitHub repository (which we've done).
2.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com) using your GitHub account.
3.  **MongoDB Atlas**: You need a cloud database. If you haven't set one up:
    *   Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
    *   Create a FREE cluster.
    *   Create a user (username/password) in "Database Access".
    *   Allow access from anywhere (0.0.0.0/0) in "Network Access".
    *   Get your connection string (Driver: Node.js formatted). It looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/portfolio`

---

## Step 1: Import Project to Vercel
1.  Go to your **Vercel Dashboard** (https://vercel.com/dashboard).
2.  Click **"Add New..."** -> **"Project"**.
3.  You will see a list of your GitHub repositories. Find `Mohan-PortFolio` and click **"Import"**.

## Step 2: Configure Project
Vercel will detect the settings, but double-check them:

1.  **Framework Preset**: Select **Vite** (it should Auto-detect this).
2.  **Root Directory**: Leave it as `./` (root).
3.  **Build Command**: `npm run install-all` (Customize this!)
    *   *Correction*: Vercel usually runs `npm install` for you.
    *   **Better Strategy**: leave `Build Command` as default `viet build` (for client) is mainly for frontend.
    *   **CRITICAL**: Since this is a combined Monorepo (Client + Server), we configured `vercel.json` to handle the routing.
    *   Use the default settings for Build & Output Settings for now.

4.  **Environment Variables**:
    *   Expand the "Environment Variables" section.
    *   Add the following keys (copy from your `.env` file but use your **Cloud MongoDB** URL):
        *   `MONGODB_URI`: `mongodb+srv://your_user:your_password@cluster....` (The cloud one, NOT localhost)
        *   `JWT_SECRET`: `your_super_secret_key` (Make up a long random string)
        *   `NODE_ENV`: `production`

5.  Click **"Deploy"**.

## Step 3: Verify Deployment
1.  Vercel will spend a minute building your site.
2.  Once done, you will see a screenshot of your site. Click it to visit.
3.  **Test the Admin Panel**:
    *   Go to `/admin` or click "Login".
    *   Since it's a new Database, you need to register a new admin user.
    *   *Self-Correction*: I removed the Register UI to keep it private?
        *   **Check**: Go to `/register` path if available, or simpler:
        *   Use Postman/Curl to POST to `https://your-site.vercel.app/api/auth/register` with `{ "username": "admin", "password": "password" }`.
        *   *Alternatively*: If you want a register page, I can quickly add a temporary hidden one for you. Let me know!
4.  **Test Uploads**:
    *   **Note**: File uploads (Images/Resolves) on Vercel are **temporary** (they disappear when the server restarts/redeploys).
    *   *Recommendation*: For a professional production app, use Cloudinary or Firebase for images. For now, it will work for the session but isn't permanent storage.

---

## 🛠 Troubleshooting
- **"404 Not Found" on API routes**: Ensure `vercel.json` is in the root (I verified it is).
- **Database Connection Error**: Check your `MONGODB_URI` in Vercel Environment Variables. Ensure you whitelisted IP `0.0.0.0/0` in MongoDB Atlas.

**Success!** Your portfolio is now live for the world to see! 🌍
