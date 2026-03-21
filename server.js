require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db.js');
const chatRoutes = require('./routes/chatRoutes.js');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

app.use(cors({
  origin: function (origin, callback) {
    const allowed = [
      'http://localhost:5173',
      'https://futureblink-frontend-for-assignment.vercel.app'
    ];

    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  }
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