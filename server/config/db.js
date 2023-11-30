const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect('mongodb+srv://test:test123@test.wbkraoh.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB Connected");
};

module.exports = connectDB;
