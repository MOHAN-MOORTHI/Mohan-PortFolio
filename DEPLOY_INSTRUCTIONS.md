# Vercel Deployment Instructions

## 1. Environment Variables
Your application requires the following environment variables to be set in your Vercel Project Settings:

### Database (Required)
- `MONGO_URI`: Your MongoDB Connection String (e.g., MongoDB Atlas).

### Authentication (Required)
- `JWT_SECRET`: A secure random string for signing tokens.

### Image Uploads (Required for Vercel)
Since Vercel Serverless functions have an ephemeral file system, local uploads will **not** persist. You **must** use Cloudinary.
- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary Cloud Name
- `CLOUDINARY_API_KEY`: Your Cloudinary API Key
- `CLOUDINARY_API_SECRET`: Your Cloudinary API Secret

## 2. Project Setup
- The root of the repository is set up to be the Vercel project root.
- The `build` script in `package.json` is configured to build the React client and move it to the `public` folder, which Vercel serves automatically.
- The `api/index.js` function handles all backend requests via `vercel.json` rewrites.

## 3. How to Deploy
1. Push this code to GitHub.
2. Go to [Vercel](https://vercel.com) and "Add New Project".
3. Import your repository.
4. **Build Command**: You can leave the default or ensure it uses `npm run build`.
5. **Output Directory**: Vercel might auto-detect "public" or you can leave it default.
6. **Environment Variables**: Add the variables listed above.
7. Click **Deploy**.

## Troubleshooting
- If images are broken, check your Cloudinary credentials.
- If API calls fail (404), ensure the `vercel.json` rewrites are active and the `api` folder is present.
- If the build fails locally on Windows, it is likely due to the `cp` command in `package.json`. This script is optimized for Vercel (Linux). For local Windows development, use `npm run dev` in the client folder and `npm start` in the server folder separately.
