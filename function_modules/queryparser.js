const queryParser = function (req) {
  let queryStrings = {};
  if (req.url.split("?")[1]) {
    console.log(req.url);
    let keyPairs = req.url.split("?")[1].split("&");
    keyPairs.forEach((element) => {
      queryStrings[element.split("=")[0]] = element.split("=")[1];
    });
  }

  return queryStrings;
};

module.exports = queryParser;
