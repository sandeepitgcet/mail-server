import { SMTPServer } from "smtp-server";
import { MailParser } from "mailparser";

const parser = new MailParser();

const server = new SMTPServer({
  allowInsecureAuth: true,
  authOptional: true,
  onConnect: (session, cb) => {
    console.log("Connected : ", session.id);
    cb();
  },
  onMailFrom(address, session, callback) {
    console.log("address : ", address);
    callback();
  },
  onRcptTo(address, session, callback) {
    console.log("address : ", address);
    callback();
  },
  onData(stream, session, callback) {
    stream.on("data", async (data) => {
      parser.on("data", (data) => {
        if (data.type === "text") {
          console.log("Text Data: ", data.html);
        }
        if (data.type === "attachment") {
          console.log("Attachment Data: ", data.filename);
          data.content.pipe(process.stdout);
          data.content.on("end", () => data.release());
        }
      });
    });
    stream.on("end", () => {
      console.log("stream end.");
      callback();
    });
    stream.on("close", () => {
      console.log("stream close.");
      callback();
    });
    callback();
  },
});

server.listen(25, () => {
  console.log("Server is running on port 25");
});
