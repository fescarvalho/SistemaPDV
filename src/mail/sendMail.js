const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 465,
  auth: {
    user: 'apikey',
    pass: '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',
  },
});

module.exports = transporter;
