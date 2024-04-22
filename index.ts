import { SMTPServer } from "smtp-server";
import { simpleParser } from "mailparser";

const server = new SMTPServer({
  allowInsecureAuth: true,
  authOptional: true,
  onConnect: (session, cb) => {
    console.log("Connected : ", session.id);
  },

  onMailFrom(address, session, callback) {
    console.log("address : ", address);
  },
  onRcptTo(address, session, callback) {
    console.log("address : ", address);
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

server.listen(465, () => {
  console.log("Server is running on port 465");
});
