import { SMTPServer } from "smtp-server";
import { simpleParser } from "mailparser";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "43.205.128.19",
  port: 465,
  secure: true,
  auth: {
    user: "sandeep@prakamya.co.in",
    pass: "password",
  },
});

const server = new SMTPServer({
  allowInsecureAuth: true,
  authOptional: true,
  onConnect: (session, cb) => {
    console.log("Connected : ", session.id);

    cb();
  },

  onMailFrom(address, session, callback) {
    const SendReply = async () => {
      console.log("Sending mail.................");
      const info = await transporter.sendMail({
        from: "hello@prakamya.co.in",
        to: address.address,
        subject: "Hello from prakamya.co.in",
        text: "Hello from prakamya.co.in",
        html: "<b>Hello from prakamya.co.in</b>",
      });
      console.log("Message sent: %s", info.messageId);
    };
    console.log("address : ", address);
    try {
      SendReply();
    } catch (err) {
      console.log("Error from sendReply: ", err);
    }
    callback();
  },
  onRcptTo(address, session, callback) {
    console.log("address : ", address);
    callback();
  },
  onData(stream, session, callback) {
    stream.on("data", async (data) => {
      let parsed = await simpleParser(data.toString());
      console.log("parsed : ", parsed);
    });
    stream.on("end", () => {
      console.log("stream end.");
    });
    stream.on("close", () => {
      console.log("stream close.");
    });
  },
});

server.listen(25, () => {
  console.log("Server is running on port 25");
});
