# High-End MERN Portfolio

A fully dynamic, full-stack portfolio application featuring a 3D antigravity hero section, comprehensive admin dashboard, and modern responsive design.

## Tech Stack

- **Frontend**: React 19, Tailwind CSS v4, Three.js (React Three Fiber), Framer Motion
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Features**: 
    - 3D Physics-based Hero Section
    - Password-protected Admin Dashboard
    - Dynamic Content Management (Projects, Skills, Experience, Certifications, etc.)
    - Image Uploads & Management
    - Contact Form with Email Notifications
    - Public/Private API Routes

## Setup Instructions

### 1. Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas URI)

### 2. Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   - The `.env` file is already created. Ensure `MONGO_URI`, `EMAIL_USER`, and `EMAIL_PASS` are correct.
   - **Note**: For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833), not your regular password.

4. Start the server:
   ```bash
   npm start
   ```
   Server will run on `http://localhost:5000`.
   *Note: Ensure the `uploads` directory exists within `server/`. It should have been created automatically.*

### 3. Frontend Setup
1. Open a new terminal and navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   Open the link shown (usually `http://localhost:5173`) in your browser.

## Admin Access

### Creating the First Admin User
Since there is no public registration page for security reasons, you can create an admin user via API request:

**Using cURL:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
   -H "Content-Type: application/json" \
   -d '{"username": "admin", "password": "yourpassword"}'
```

**Using Postman/Thunder Client:**
- **URL**: `http://localhost:5000/api/auth/register`
- **Method**: `POST`
- **Body (JSON)**:
  ```json
  {
    "username": "admin",
    "password": "yourpassword"
  }
  ```

Once created, navigate to `/login` in your browser to access the dashboard.

## Features Guide

- **Hero Section**: Edit title, subtitle, and CTA text.
- **About Me**: Update bio, profile image, and **Social Links**.
- **Skills**: Add skills with icons (upload or URL), grouped automatically by category.
- **Experience**: Manage your work history timeline.
- **Projects**: upload project images, set categories (Web, App, AI, etc.) which automatically generate filters on the home page.
- **Certifications**: Add awards/certs with optional external links.
- **Contact**: View messages sent from the home page. Email notifications are sent to the configured `EMAIL_USER`.

## Deployment Guide (Render/Heroku/Railway)

This project is configured to be deployed as a **monolith** (Frontend + Backend in one).

1.  **Build the Frontend**:
    The server is set up to serve temporary static files from `client/dist`.
    Ensure your build script builds the client before starting the server.

    Update `server/package.json`:
    ```json
    "scripts": {
      "start": "node index.js",
      "build": "npm install && cd ../client && npm install && npm run build"
    }
    ```

2.  **Environment Variables**:
    Set the following in your host's dashboard:
    - `MONGO_URI`: Your production MongoDB connection string (Atlas).
    - `JWT_SECRET`: A strong secret key.
    - `EMAIL_USER` / `EMAIL_PASS`: For contact form emails.
    - `NODE_ENV`: `production`

3.  **Deploy**:
    Connect your repository to the hosting provider and trigger a deploy. The `build` script will handle installing dependencies and building the React app.

