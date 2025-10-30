// Backend/server.js

const express = require('express');
const cors = require('cors');
const path = require('path');
// Load environment variables from .env file
require('dotenv').config({ path: path.resolve(__dirname, '.env') }); 

const formRoutes = require('./src/routes/formRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  'http://localhost:5173',          // for local development
  'https://dynamic-app-dashboard.vercel.app', // your deployed frontend
         // optional custom domain
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
})); // Enables cross-origin requests from the frontend
app.use(express.json());

// API Routes
app.use('/api', formRoutes);

// Simple health check route
app.get('/', (req, res) => {
    res.send(`Backend API is running on port ${PORT}`);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`Access the server at: http://localhost:${PORT}`);
});