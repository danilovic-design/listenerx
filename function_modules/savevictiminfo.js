const fs = require("fs");
const path = require("path");
const infoDirectoryName = "victiminfo";

const saveVictimInfo = function (req) {
  let t = new Date();
  let timestamp = `${t.getDate()}-${t.getMonth()}-${t.getFullYear()}-${t.getHours()}-${t.getMinutes()}-${t.getSeconds()}-${t.getMilliseconds()}`;
  let content = `Caption arrived: ${t} \n \n ${req.url} \n`;

  let rawHeaders = req.rawHeaders;

  for (let i = 0; i < rawHeaders.length; i += 2) {
    content += `${rawHeaders[i]} : ${rawHeaders[i + 1]} \n`;
  }

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
module.exports = saveVictimInfo;
