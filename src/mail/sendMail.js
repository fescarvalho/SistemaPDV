const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: smtp.sendgrid.net,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_KEY,
  },
});

module.exports = transporter;
