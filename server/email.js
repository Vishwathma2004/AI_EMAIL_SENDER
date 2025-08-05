import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config({ path: "../.env" });
const app = express();
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: "gmail", // ✅ Use Gmail's preset config
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // ✅ Gmail App Password
  },
});


// ✅ Verify SMTP connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP connection failed:", error);
  } else {
    console.log("✅ SMTP server is ready to send emails");
  }
});

app.post("/send-email", async (req, res) => {
  try {
    const { recipients, subject, content } = req.body;

    if (!recipients || recipients.length === 0) {
      return res.status(400).json({ success: false, message: "Recipients required" });
    }

    await transporter.sendMail({
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to: recipients.join(","),
      subject,
      html: content.replace(/\n/g, "<br>"),
    });

    res.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("❌ Email sending error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(5000, () => console.log("📧 Email server running on port 5000"));
