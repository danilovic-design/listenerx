const path = require("path");
const fs = require("fs");

const returnImage = function (res) {
  // answering with an image
  let devilishImage = fs.createReadStream(
    path.join(__dirname, "..", "img", "devil.png")
  );

  devilishImage.on("open", function () {
    res.setHeader("Content-Type", "image/png");
    res.statusCode = 200;
    devilishImage.pipe(res);
  });
};

module.exports = returnImage;
