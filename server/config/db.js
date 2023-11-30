const mongoose = require("mongoose");
// mongodb+srv://test:test123@test.wbkraoh.mongodb.net/?retryWrites=true&w=majority
console.log("Current working directory:", process.cwd());
const connectDB = async () => {
  await mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB Connected");
};

module.exports = connectDB;
