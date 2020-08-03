const ifaces = require("os").networkInterfaces();
const fs = require("fs");

const currentWSLip = ifaces["eth0"][0]["address"];
console.info("new address", currentWSLip);

const filesToUpdate = ["firebase.json", "client/src/fbConfig.ts"];

filesToUpdate
  .map((fileName) => `${__dirname}/${fileName}`)
  .forEach((fileName) => {
    fs.readFile(fileName, "utf8", (err, fileContents) => {
      if (err) throw console.error(err);
      const newFile = fileContents.replace(
        /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/gm,
        currentWSLip
      );
      fs.writeFile(fileName, newFile, (err) => {
        if (err) console.info(err.message, err.stack);
      });
    });
  });
