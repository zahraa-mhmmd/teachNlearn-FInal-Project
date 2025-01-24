const mongoose = require('mongoose');
require('colors');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(
      `Educational Study Buddy database connected at: ${conn.connection.host}`.cyan.bold
    );
  } catch (error) {
    console.error(`Database connection error: ${error.message}`.red);
    process.exit(1); 
  }
};

module.exports = connectDB;
