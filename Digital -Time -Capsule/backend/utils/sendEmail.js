const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async ({ to, subject, text }) => {
  const mailOptions = {
    from: `"Time Capsule" <${process.env.EMAIL}>`,
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
