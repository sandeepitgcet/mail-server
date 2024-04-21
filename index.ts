import { SMTPServer } from "smtp-server";

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
    stream.on("data", (data) => {
      console.log("data : ", data);
      callback();
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
