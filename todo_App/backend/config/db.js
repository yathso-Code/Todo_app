const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://yatharthshukla004:sangeetdilipyesh%402002@cluster0.aake8nm.mongodb.net/todoList?retryWrites=true&w=majority&appName=Cluster0");
    console.log('< ======== Database is connected =============>');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Stop the app if DB connection fails
  }
};

module.exports = connectDB;
