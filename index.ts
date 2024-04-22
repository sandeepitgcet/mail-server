import { SMTPServer } from "smtp-server";
import { simpleParser } from "mailparser";

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
      let parsed = await simpleParser(data.toString());
      console.log("parsed : ", parsed);
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
