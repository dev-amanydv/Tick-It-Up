const mongoose = require('mongoose');

// Connect to MongoDB with error handling
mongoose
  .connect("mongodb+srv://admin:%40Aman_81@cluster0.yx2l0.mongodb.net/Taskify", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

// Admin schema
const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

// User schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

// Todo schema
const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  isCompleted: {
    type: Boolean,
    default: false, 
  },
});

// Models
const Admin = mongoose.model("Admin", adminSchema);
const User = mongoose.model("User", userSchema);
const Todos = mongoose.model("Todos", todoSchema);

module.exports = {
  Admin,
  User,
  Todos,
};