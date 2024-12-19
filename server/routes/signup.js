const Router = require("express").Router();
const sendVerificationMail = require("../utils/sendVerificationMail");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const Token = require("../models/token");

Router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save to database

    const OTP = Math.floor(100000 + Math.random() * 900000); // Generates a random 6-digit number
    const token = new Token({
      user: newUser._id, // Reference to the user
      OTP: OTP + "", // Ensure the key matches the schema (case-sensitive)
      expiresAt: new Date(Date.now() + 2 * 60 * 1000), // Set expiry time for 2 minutes from now
    });

    await newUser.save();
    await token.save();
    //sending verification mail
    try {
      await sendVerificationMail(
        email,
        "Verification Mail of social media app",
        OTP
      );
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Unable to send verification mail!" });
    }
    res.status(201).json({
      message: "User registered successfully",
      user: { username: newUser.username, email: newUser.email },
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = Router;
