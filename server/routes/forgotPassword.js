const router = require("express").Router();
const crypto = require("crypto");
const User = require("../models/user");
const Token = require("../models/token"); // Assuming the OTP token model exists
const sendVerificationMail = require("../utils/sendVerificationMail");

// Forgot Password Route
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email is provided
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required." });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Generate a random OTP
    const OTP = crypto.randomInt(100000, 999999).toString();

    // Save OTP in the Token model
    const token = new Token(
      { user: user._id, OTP, expiresAt: Date.now() + 5 * 60 * 1000 } // 2 minutes expiration
    );

    await token.save();
    console.log(token, "TOKEN -- test");
    // Send OTP via email
    await sendVerificationMail(
      user.email,
      "Password Reset OTP",
      `${process.env.DOMAIN}/update-password/${OTP}`
    );

    return res.status(200).json({
      success: true,
      message: "Password reset OTP sent to your email.",
    });
  } catch (error) {
    console.error("Error during forgot-password:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});

module.exports = router;
