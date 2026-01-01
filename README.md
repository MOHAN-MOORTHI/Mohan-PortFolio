# Professional MERN Portfolio

A fully responsive, futuristic portfolio website built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- **Frontend**: React + Vite, Three.js (Background), Framer Motion (Animations), Glassmorphism UI.
- **Backend**: Node.js + Express, MongoDB (Mongoose), JWT Authentication.
- **Admin**: Protected dashboard to manage projects and skills.
- **Responsive**: Mobile-first design.

## Installation

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Mohan-PortFolio
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   # Create a .env file with:
   # PORT=5000
   # MONGODB_URI=your_mongodb_uri
   # JWT_SECRET=your_jwt_secret
   
   # Run server
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../client
   npm install
   npm run dev
   ```

4. **Access**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

## Deployment

- **Frontend**: Deploy to Vercel/Netlify.
- **Backend**: Deploy to Render/Railway.
- **Database**: Use MongoDB Atlas.

## License
MIT
