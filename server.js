const http = require("http");
const saveVictimInfo = require("./function_modules/savevictiminfo");
const responder = require("./function_modules/responder");
const log = require("./function_modules/logger");

/**
 * Command line argument option
 */
const argv = require("yargs/yargs")(process.argv.slice(2))
  .options({
    port: {
      alias: "p",
      description: "Sets port to listen on",
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
      description: "Verbose feedback in the console",
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
 * Node JS server instance, as the backbone of the project.
 */
const server = http.createServer((req, res) => {
  let currentTime = new Date();
  argv.verbose && log(`\n[+] - ${currentTime}`);
  saveVictimInfo(req, argv, currentTime);
  responder(req, res, argv, currentTime);
});

server.on("clientError", (err, socket) => {
  socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
});

server.listen(portNumber, function () {
  log("[+] - ListenerX has started on port " + portNumber);
});
