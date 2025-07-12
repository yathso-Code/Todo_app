const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { errorHandler } = require('./middlewares/errorHandler');
const rateLimit = require('express-rate-limit');

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://todo-app-fawn-mu-20.vercel.app'
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
// ADMIN -=======
app.use('/api/admin', adminRoutes);


// ✅ Test Route
app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'API is working ..' });
});


app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`< ======== Server running on port ${PORT} +===============>`));
