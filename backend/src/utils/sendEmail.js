const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'localhost',
  port: Number(process.env.EMAIL_PORT) || 1025,
  secure: process.env.EMAIL_SECURE === 'true',
  auth:
    process.env.EMAIL_USER && process.env.EMAIL_PASSWORD
      ? {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        }
      : undefined,
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Email transporter non prêt :', error.message || error);
  } else {
    console.log('Email transporter prêt à envoyer des messages');
  }
});

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'no-reply@immobook.local',
      to,
      subject,
      text,
      html,
    });
  } catch (error) {
    console.error('Erreur d’envoi email :', error.message || error);
    throw error;
  }
};

module.exports = sendEmail;
