const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = 3000;

// 允许跨域、JSON解析
app.use(cors());
app.use(express.json());

// 【静态文件托管】让 /index.html /booking.html /figures 等直接能访问
app.use(express.static(path.join(__dirname, 'public')));

// 让 / 自动跳转首页
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 邮箱配置
// The Gmail app password is NOT stored in this file (the repo is public).
// Set it on Render: Dashboard -> this service -> Environment -> GMAIL_APP_PASSWORD
// For local testing: set the same variable in your terminal before `node server.js`.
const GMAIL_USER = process.env.GMAIL_USER || 'orendaspa2025@gmail.com';
const GMAIL_APP_PASSWORD = (process.env.GMAIL_APP_PASSWORD || '').replace(/\s+/g, '');
if (!GMAIL_APP_PASSWORD) {
  console.warn('GMAIL_APP_PASSWORD is not set: booking and contact emails will fail.');
}
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD
  }
});

// 联系表单邮件接口
app.post("/send", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    await transporter.sendMail({
      from: `"${name}" <orendaspa2025@gmail.com>`,
      replyTo: email,
      to: "orendaspa2025@gmail.com",
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`
    });
    res.json({ success: true, message: "Email sent!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to send email.", error: error.toString() });
  }
});

// 预约接口
app.post("/api/bookings", async (req, res) => {
  const { service, date, name, email, phone } = req.body;
  try {
    await transporter.sendMail({
      from: `"Orenda Spa Booking" <orendaspa2025@gmail.com>`,
      to: "orendaspa2025@gmail.com",
      subject: "New Booking from Orenda Spa Website",
      text: `Service: ${service}\nDate: ${date}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`
    });
    res.json({ success: true, message: "Booking received." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to process booking.", error: error.toString() });
  }
});

// 启动服务
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});