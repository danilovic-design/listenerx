const http = require("http");
const saveVictimInfo = require("./function_modules/savevictiminfo");
const responder = require("./function_modules/responder");
const log = require("./function_modules/logger").log;
const debuglog = require("./function_modules/logger").debuglog;

/**
 * Command line argument option
 */
const argv = require("yargs/yargs")(process.argv.slice(2))
  .options({
    port: {
      alias: "p",
      description: "Sets port to listen on. Default port is 5000",
      requiresArg: true,
      required: false,
    },
    noget: {
      alias: "ng",
      description: "Disables recording to GET requests",
      requiresArg: false,
      required: false,
    },
    nopost: {
      alias: "np",
      description: "Disables recording to POST requests",
      requiresArg: false,
      required: false,
    },
    verbose: {
      alias: "v",
      description: "Verbose output in the console",
      requiresArg: false,
      required: false,
    },
    paramsonly: {
      description: "Records only GET requests with incoming query parameters",
      requiresArg: false,
      required: false,
    },
    customresponse: {
      description: "Enables you send short responses back as HTTP-responses.",
      required: false,
      requiresArg: false,
    },
    stealth: {
      description:
        "Enables stealth mode. The server will not respond to HTML requests.",
      required: false,
      requiresArg: false,
    },
    script: {
      description: "Sends back a custom script file",
      required: false,
      requiresArg: true,
    },
  })
  .help("help")
  .alias("help", "h")
  .epilog("Created by danilovic-design @GitHub").argv;

/**
 * The program's default port number
 * @returns {Number}
 */
const portNumber = argv.port || 5000;

/**
 * Debug mode tests
 */
debuglog(argv, `[i] - Port set to ${argv.port ? argv.port : 5000}`);
!(typeof portNumber === "number") &&
  debuglog(argv, `[x] - ERROR! The given port number is not a number.`);
!(typeof portNumber === "number" && portNumber >= 0 && portNumber <= 65535) &&
  debuglog(
    argv,
    `[x] - ERROR! The given port is outside of the scope of port numbers. It should be between 0 and 65535`
  );
debuglog(argv, `[i] - Debug mode ${argv.debug ? "ON" : "OFF"}`);
debuglog(argv, `[i] - Verbose mode ${argv.verbose ? "ON" : "OFF"}`);
debuglog(argv, `[i] - No-get mode ${argv.noget ? "ON" : "OFF"}`);
debuglog(argv, `[i] - No-post mode ${argv.nopost ? "ON" : "OFF"}`);
debuglog(argv, `[i] - Params-only mode ${argv.paramsonly ? "ON" : "OFF"}`);
debuglog(
  argv,
  `[i] - Custom response set to ${
    argv.customresponse ? argv.customresponse : "no-answer"
  }`
);
debuglog(argv, `[i] - Script sending mode ${argv.script ? "ON" : "OFF"}`);
debuglog(argv, `[i] - Stealth mode ${argv.stealth ? "ON" : "OFF"}`);

/**
 * Node JS server instance, as the backbone of the project.
 */
const server = http.createServer((req, res) => {
  let currentTime = new Date();
  log(argv, "\t");
  log(argv, `${currentTime}`);
  debuglog(
    argv,
    `[i] - New incoming request, method: ${req.method}, url: ${req.url}`
  );
  saveVictimInfo(req, argv, currentTime);
  responder(req, res, argv, currentTime);
});

server.on("clientError", (err, socket) => {
  socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
});

server.listen(portNumber, function () {
  log(
    "\n************* ListenerX has started on port " +
      portNumber +
      " ***************\n"
  );
});
