const mongoose = require("mongoose");
// mongodb+srv://test:test123@test.wbkraoh.mongodb.net/?retryWrites=true&w=majority
const connectDB = async () => {
  await mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB Connected");
};

module.exports = connectDB;
