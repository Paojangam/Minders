const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const diaryRoutes = require('./routes/diaryRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// ✅ CORS setup — allow both local and Vercel frontend
app.use(cors({
  origin: [
    'http://localhost:5173', // local dev frontend
    'https://minders-83rn.vercel.app' // deployed Vercel frontend
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/diary', diaryRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Minders API!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
