const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');

const authRoutes = require('./routes/authRoutes');
const diaryRoutes = require('./routes/diaryRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS setup
app.use(cors({
  origin: [
    'http://localhost:5173',          // local frontend
    'https://minders-83rn.vercel.app' // deployed frontend
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

// ✅ Create HTTP server for Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: ['http://localhost:5173', 'https://minders-83rn.vercel.app'] }
});

// Waiting queue for chat
let waitingUser = null;

// Generate pseudonymous nickname
function generateNickname() {
  const randomNum = Math.floor(Math.random() * 10000);
  return `User_${randomNum}`;
}

// Socket.IO connection
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.nickname = generateNickname();

  if (waitingUser) {
    socket.partner = waitingUser;
    waitingUser.partner = socket;

    socket.emit('chat-started', { nickname: socket.nickname });
    waitingUser.emit('chat-started', { nickname: waitingUser.nickname });

    waitingUser = null;
  } else {
    waitingUser = socket;
  }

  socket.on('send-message', (msg) => {
    if (socket.partner) {
      socket.partner.emit('receive-message', { text: msg, sender: socket.nickname });
    }
  });

  socket.on('report-partner', () => {
    if (socket.partner) {
      console.log(`User ${socket.id} reported partner ${socket.partner.id}`);
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    if (socket.partner) {
      socket.partner.emit('partner-disconnected');
      socket.partner.partner = null;
    }
    if (waitingUser === socket) waitingUser = null;
  });
});

// ✅ Start server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
