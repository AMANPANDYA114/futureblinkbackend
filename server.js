require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db.js');
const chatRoutes = require('./routes/chatRoutes.js');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// CORS  
app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,PATCH,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// DB
connectDB();

// Route
app.use('/api', chatRoutes);

// Root
app.get('/', (req, res) => {
  res.send('API running ');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});