const nodemailer = require("nodemailer");
const user = process.env.EMAIL_USERNAME;
const pass = process.env.EMAIL_PASSWORD;

console.log(user, pass);

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user,
    pass,
  },
});

const emailNotification = async (email, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: "Pemberitahuan nomer peserta",
    html: `${text}`,
  };

  return transporter.sendMail(mailOptions);
};

export default {
  emailNotification,
};
