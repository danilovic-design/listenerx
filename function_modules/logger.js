let log = function (argv, textNode) {
  if (textNode && argv.verbose) {
    return console.log(textNode);
  } else {
    return null;
  }
  return console.log(textNode);
};

module.exports = log;
