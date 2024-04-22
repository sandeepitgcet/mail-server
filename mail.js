const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "35.154.29.173",
  port: 25,
  secure: false,
  auth: {
    user: "root",
    pass: "Sandeeps57@",
  },
  tls: {
    rejectUnauthorized: false, // Insecure, consider using a certificate
  },
});

const SendReply = async () => {
  console.log("Sending mail.................");
  const info = await transporter.sendMail({
    from: "hello@prakamya.co.in",
    to: "sandeepitgcet@gmail.com",
    subject: "Hello from prakamya.co.in",
    text: "Hello from prakamya.co.in",
    html: "<b>Hello from prakamya.co.in</b>",
  });
  console.log("Message sent: %s", info.messageId);
};
try {
  SendReply();
} catch (err) {
  console.log("Error from sendReply: ", err);
}
