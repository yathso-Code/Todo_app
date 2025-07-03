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

const limiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 100 });
app.use(limiter);
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`< ======== Server running on port ${PORT} +===============>`));
