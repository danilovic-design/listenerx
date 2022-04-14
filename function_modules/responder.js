const imageSender = require("./imagesender");
const log = require("./logger");

const send404 = function (res, argv) {
  argv.verbose && log("    404 sent back.");
  res.setHeader("Content-Type", "text/html");
  res.statusCode = 404;
  res.end();
};

const responder = function (req, res, argv) {
  if (req.url === "/favicon.ico") {
    argv.verbose && log(":>    Favicon requested and sent 404 back.");
    send404(res, argv);
  } else if (req.url.startsWith("/devil")) {
    argv.verbose && log(">    Devil image requested and got sent back.");
    imageSender(res);
  } else if (req.url === "/") {
    send404(res, argv);
  } else {
    res.setHeader("Content-Type", "text/html");
    res.statusCode = 303;
    res.end();
  }
};

module.exports = responder;
