const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('< ======== Database is connected =============>');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Stop the app if DB connection fails
  }
};

module.exports = connectDB;
