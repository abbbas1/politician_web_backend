import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3bde564e4f0acd",
    pass: "********c04d"
  },
});
const loginEmail = async (from, to, subject, text) => {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: from, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    //   html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
};

export default loginEmail;
