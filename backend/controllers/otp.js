import Otp from "../models/Otp.js";
import randomstring from "randomstring";
import sendEmail from "../middleware/sendEmail.js";

// Generate OTP
function generateOTP() {
  return randomstring.generate({
    length: 6,
    charset: "numeric",
  });
}

export const sendOTP = async (req, res, next) => {
  try {
    const { email } = req.body;
    const otp = generateOTP(); // Generate a 6-digit OTP
    const newOTP = new Otp({ email, otp });
    await newOTP.save();

    // Send OTP via email
    await sendEmail({
      to: email,
      subject: "Your One-Time Password (OTP) for Verification",
      message: `<p>Dear User!<br><br>Your One-Time Password (OTP) for verification is: <span><h2><strong>${otp}</strong><h2></span> <br> <br>  Please do not share this code with anyone.<br>If you did not request this OTP, please ignore this email or contact our support team.<br><br>Thank you,<br>Devansh Shrivastava</p>`,
    });

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Verify OTP provided by the user
export const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const existingOTP = await Otp.findOneAndDelete({ email, otp });

    if (existingOTP) {
      // OTP is valid
      res
        .status(200)
        .json({ success: true, message: "OTP verification successful" });
    } else {
      // OTP is invalid
      res.status(400).json({ success: false, error: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
