const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 邮箱配置
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'orendaspa2025@gmail.com',
    pass: 'vtqgwabqnnsobcui'
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
  const { service, date, time, therapist, name, email, phone } = req.body;
  try {
    await transporter.sendMail({
      from: `"Orenda Spa Booking" <orendaspa2025@gmail.com>`,
      to: "orendaspa2025@gmail.com",
      subject: "New Booking from Orenda Spa Website",
      text: `Service: ${service}\nDate: ${date}\nTime: ${time}\nTherapist: ${therapist}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`
    });
    res.json({ success: true, message: "Booking received." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to process booking.", error: error.toString() });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});