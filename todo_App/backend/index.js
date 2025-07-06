const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const { errorHandler } = require('./middlewares/errorHandler');
const rateLimit = require('express-rate-limit');

dotenv.config();
connectDB();

const app = express();

// Allow specific origins for CORS
const allowedOrigins = [
  'http://localhost:5173',
  'https://todo-app-jeul.vercel.app'
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true
};

const limiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 100 });
app.use(limiter);
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
// ✅ Test Route
app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'API is working ..' });
});
app.use(errorHandler);

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app; // ✅ Required for Vercel

