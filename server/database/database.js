const mongoose = require('mongoose')
const connectToDatabase = async (url) => {
  try {
    let connection = await mongoose.connect(url);
    if (connection) {
      console.log("Connected to database successfully");
    } else {
      console.log("failed to connect with database");
    }
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};
module.exports = connectToDatabase;
