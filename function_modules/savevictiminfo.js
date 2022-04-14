const fs = require("fs");
const path = require("path");
const infoDirectoryName = "victiminfo";
const url = require("url");

const createCaptionContent = function (t, req) {
  let content = `Caption arrived: ${t} \n \n ${req.url} \n`;

  let rawHeaders = req.rawHeaders;

  for (let i = 0; i < rawHeaders.length; i += 2) {
    content += `${rawHeaders[i]} : ${rawHeaders[i + 1]} \n`;
  }

  return content;
};

const saveInfoToFile = function (req, t) {
  let content = createCaptionContent(t, req);

  let timestamp = `${t.getDate()}-${t.getMonth()}-${t.getFullYear()}-${t.getHours()}-${t.getMinutes()}-${t.getSeconds()}-${t.getMilliseconds()}`;

  fs.writeFile(
    path.join(infoDirectoryName, timestamp + ".txt"),
    content,
    function (err) {
      if (err) {
        console.log(err);
        if (err.errno === 4058) {
          console.log("victim info directory missing");
        }
      }
    }
  );
};

const saveVictimInfo = function (req, argv, t) {
  if (argv.nopost && req.method === "POST") {
    argv.verbose &&
      console.log(">    Incoming POST request, request not recorded");
  } else if (argv.noget && req.method === "GET") {
    argv.verbose &&
      console.log(">    Incoming GET request, request not recorded");
  } else {
    let url_parts = url.parse(req.url, true);

    url_parts.search &&
      argv.verbose &&
      console.log(">    QUERY PARAMETER PRESENT!");

    if (!argv.paramsonly) {
      argv.verbose &&
        console.log(`>    Incoming ${req.method} request, request recorded`);
      saveInfoToFile(req, t);
    }
    if (argv.paramsonly && url_parts.search) {
      argv.verbose &&
        console.log(
          `>    Incoming ${req.method} request with query parameters, request recorded`
        );
      saveInfoToFile(req, t);
    } else {
      argv.verbose &&
        argv.paramsonly &&
        !url_parts.search &&
        console.log(
          `>    Incoming ${req.method} request not recorded, missing query parameters`
        );
    }
  }
};

module.exports = saveVictimInfo;
