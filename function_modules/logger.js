let log = function (argv, textNode) {
  if (textNode && argv.verbose) {
    return console.log("[v] - " + textNode);
  }

  if (argv && !textNode) {
    console.log(argv);
  }
};

let debuglog = function (argv, textNode) {
  if (textNode && argv.debug) {
    return console.log(textNode);
  }
};

module.exports.log = log;
module.exports.debuglog = debuglog;
