const http = require("http");
// const queryParser = require("./function_modules/queryparser");
const imageSender = require("./function_modules/imagesender");
const saveVictimInfo = require("./function_modules/savevictiminfo");

// creating server instance
const server = http.createServer((req, res) => {
  saveVictimInfo(req);

  if (req.url === "/favicon.ico") {
    res.setHeader("Content-Type", "text/html");
    res.statusCode = 404;
    res.end();
  } else if (req.url.startsWith("/devil")) {
    imageSender(res);
  } else if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.statusCode = 404;
    res.end();
  } else {
    res.setHeader("Content-Type", "text/html");
    res.statusCode = 303;
    res.end();
  }
});

server.on("clientError", (err, socket) => {
  socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
});

server.listen(8000, function () {
  console.log("Listening server started");
});
