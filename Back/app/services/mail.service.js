const nodemailer = require("nodemailer");
const logger = require("../../config/logger.config");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
});

module.exports = function sendRegistrationMail(username, email) {
  logger.log("info", email);
  let mailOptions = {
    from: '"Franjo Pintarić" <franjo@kulprojekt.com',
    to: `${email}`,
    subject: "Thanks for registering for my supercool project",
    html: `Hello <b>${username}</b>, thanks for registering!`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.log("error", `Error sending mail: ${error}`);
    }

    logger.log(
      "info",
      `Mail sent, preview URL: ${nodemailer.getTestMessageUrl(info)}`
    );
  });
};
