# Professional MERN Portfolio

A high-performance, futuristic portfolio website built with the **MERN Stack** (MongoDB, Express, React, Node.js). It features 3D visuals, smooth animations, and a secure admin dashboard to manage content dynamically.

---

## 🚀 Features

- **Frontend**:
  - React 18 + Vite (Fast build tool)
  - **Three.js / React Three Fiber**: Interactive 3D starfield background.
  - **Framer Motion**: Smooth entry and scroll animations.
  - **Glassmorphism UI**: Modern, transparent design aesthetic.
  - Fully Responsive (Mobile, Tablet, Desktop).
  - **Resilient Architecture**: Displays fallback content if the backend is unavailable.

- **Backend**:
  - Node.js + Express REST API.
  - **JWT Authentication**: Secure login for Admin Dashboard.
  - MongoDB (Mongoose): Database for Projects, Skills, and Messages.

- **Admin Dashboard**:
  - **New! Setup Admin**: Create your admin account directly on the live site.
  - Manage Projects, Skills, Experience, and Certifications.
  - **Social Links**: Update your social media profiles (GitHub, LinkedIn, WhatsApp, etc.).
  - **File Uploads**: Directly upload images and resumes.
  - View and Delete Contact Form Messages.

---

## 🛠 Tech Stack

- **Client**: React, Vite, Tailwind CSS (Custom), Framer Motion, React Three Fiber, Axios.
- **Server**: Node.js, Express, Mongoose, Dotenv, CORS, Bcryptjs, JSONWebToken.
- **Database**: MongoDB (Local or Atlas).

---

## 💻 Local Installation Guide

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (Installed locally or have a MongoDB Atlas connection string)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/MOHAN-MOORTHI/Mohan-PortFolio.git
cd Mohan-PortFolio
```

### 2. Backend Setup
The backend runs on Port `5000` by default.

1.  Navigate to the server folder:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  **Configure Environment Variables**:
    Create a file named `.env` in the `server` folder and add:
    ```env
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/portfolio
    # Or use your MongoDB Atlas URL: mongodb+srv://<user>:<password>@cluster.mongodb.net/dbname
    JWT_SECRET=your_super_secret_key_change_this
    ```
4.  **(Optional) Seed the Database**:
    This creates an Admin user (`admin` / `admin123`) and sample content.
    ```bash
    node seed.js
    ```
5.  Start the Server:
    ```bash
    npm run dev
    ```
    *Terminal should say: "Server running on port 5000" & "MongoDB Connected"*

### 3. Frontend Setup
The frontend runs on Port `5173` or `5174`.

1.  Open a **new** terminal and navigate to the client folder:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install --force
    # Note: --force is used to resolve some React Three Fiber peer dependency warnings
    ```
3.  Start the Client:
    ```bash
    npm run dev
    ```
4.  Open your browser to the URL shown (usually `http://localhost:5173`).

---

## 🔐 Admin Access
1.  Go to `/admin` (e.g., `https://your-domain.vercel.app/admin`).
2.  **First Time Setup**:
    - Click **"First time setup? Setup Admin"**.
    - Create your username and password.
    - This creates your secure admin account in the database.
3.  **Login**: Use your credentials to access the dashboard.
4.  **Manage Content**:
    - **Projects**: Add your latest work.
    - **Skills**: Update your tech stack.
    - **Experience**: Add your work history.
    - **Certifications**: Showcase your achievements.
    - **About Me**: Update your bio and resume link.

---

## ☁️ Deployment Guide (Vercel)

This project is configured as a **Monorepo** with a streamlined `vercel.json` configuration, allowing you to deploy both Frontend and Backend as a single Vercel project!

### Quick Deployment
1.  Push your code to **GitHub**.
2.  Go to **Vercel Dashboard** -> **Add New Project**.
3.  Import the `Mohan-PortFolio` repository.
4.  **Configuration**:
    - **Framework Preset**: Vite (Auto-detected).
    - **Root Directory**: Leave as `./` (Root).
    - **Build Command**: Leave default or `npm run install-all`.
5.  **Environment Variables**:
    - `MONGODB_URI`: Your MongoDB Atlas Connection String.
    - `JWT_SECRET`: Your customized Secret Key.
    - `NODE_ENV`: `production`.
6.  Click **Deploy**.

Vercel will automatically handle:
- Hosting the React frontend.
- Hosting the Express backend as Serverless Functions via the `/api` rewrite rules defined in `vercel.json`.

**Success!** Your portfolio is live with a single URL!

---

## 📂 Project Structure

```
Mohan-PortFolio/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/     # UI Components (Hero, Projects, Stars, etc.)
│   │   ├── components/admin # Admin Dashboard Components
│   │   ├── context/        # Auth Context
│   │   ├── pages/          # Home, Login, Dashboard
│   │   ├── main.jsx        # Entry point
│   │   └── App.jsx         # Routing
│   └── vite.config.js
│
├── server/                 # Backend (Node + Express)
│   ├── models/             # Mongoose Models (User, Project, Skill)
│   ├── routes/             # API Routes
│   ├── index.js            # Server entry point
│   └── seed.js             # Database Seeder
│
└── README.md
```

## License
MIT
