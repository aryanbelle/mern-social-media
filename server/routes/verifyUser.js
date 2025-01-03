const router = require("express").Router();
const User = require("../models/user"); // Import your User model
const Token = require("../models/token"); // Import your Token model

// Route to verify user
router.post("/:username/:otp", async (req, res) => {
  try {
    const { username, otp } = req.params;
    console.log(username, otp);
    // Check if both email and OTP are provided
    if (!username || !otp) {
      return res
        .status(400)
        .json({ success: false, message: "Email and OTP are required." });
    }

    // Find the user by email
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Find the token associated with the user
    const token = await Token.findOne({ user: user._id, OTP: otp });
    if (!token) {
      return res.status(400).json({ success: false, message: "Invalid OTP." });
    }

    // Check if the token has expired
    if (token.expiresAt < Date.now()) {
      return res
        .status(400)
        .json({ success: false, message: "OTP has expired." });
    }

    // Verify the user
    user.isVerified = true;
    await user.save();

    // Delete the token after successful verification
    await Token.deleteOne({ _id: token._id });

    return res
      .status(200)
      .json({ success: true, message: "User verified successfully." });
  } catch (error) {
    console.error("Error verifying user:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
});

module.exports = router;
