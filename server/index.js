const express = require("express");
const connectDB = require("./config/dbConnect");
require("dotenv").config();

const signupRoute = require("./routes/signup");
const signinRoute = require("./routes/signin");
const verifyUser = require("./routes/verifyUser");

const app = express();
const PORT = process.env.PORT;
connectDB();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World! Welcome to Express.js!");
});

app.use("/signup", signupRoute);
app.use("/signin", signinRoute);
app.use("/verify", verifyUser);

// Handle undefined routes (404)
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
