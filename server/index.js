const express = require("express");
const connectDB = require("./config/dbConnect");
require("dotenv").config();
const updatePassword = require("./routes/updatePassword");
const signupRoute = require("./routes/signup");
const signinRoute = require("./routes/signin");
const verifyUserRoute = require("./routes/verifyUser");
const forgotPassword = require("./routes/forgotPassword");
const app = express();
const PORT = process.env.PORT;
connectDB();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World! Welcome to Express.js!");
});

app.use("/signup", signupRoute);
app.use("/signin", signinRoute);
app.use("/verify", verifyUserRoute);
app.use("/forgot-password", forgotPassword);
app.use("/update-password", updatePassword);
// Handle undefined routes (404)
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
