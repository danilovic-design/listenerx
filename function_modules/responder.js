const imageSender = require("./imagesender");
const log = require("./logger").log;
const fs = require("fs");

const send404 = function (res, argv) {
  log(argv, "404 sent back.");
  res.setHeader("Content-Type", "text/html");
  res.statusCode = 404;
  res.end();
};

const sendCustomResponse = function (res, argv) {
  log(argv, "HTML response sent back.");
  res.setHeader("Content-Type", "text/html");
  res.statusCode = 200;
  let textNode = argv.customresponse ? argv.customresponse : "";
  res.end(textNode);
};

const sendScript = function (res, argv) {
  log(argv, "Sending HTML response with script.");
  res.setHeader("Content-Type", "text/html");
  res.statusCode = 200;
  let textNode = argv.customresponse ? argv.customresponse : " ";

  try {
    const scriptData = fs.readFileSync(argv.script, "utf8");
    res.end(`${textNode} <script>${scriptData}</script>`);
  } catch (err) {
    console.error(err);
  }
};

const responder = function (req, res, argv) {
  if (req.url === "/favicon.ico") {
    log(argv, "Favicon requested and sent 404 back.");
    send404(res, argv);
  } else if (req.url.startsWith("/devil")) {
    log(argv, "Devil image requested and got sent back.");
    imageSender(res);
  } else {
    if (argv.script) {
      sendScript(res, argv);
    } else if (argv.customresponse) {
      sendCustomResponse(res, argv);
    } else {
      send404(res, argv);
    }
  }
};

module.exports = responder;
