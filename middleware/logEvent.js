const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const fsPromise = require("fs").promises;
const path = require("path");

const logEvent = async (messsage, logName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${messsage}\n`;
  console.log(logItem);

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromise.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromise.appendFile(
      path.join(__dirname, "..", "logs", logName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

const logger = (req, res, next) => {
  logEvent(
    `${req.method} \t ${req.headers.origin} \t ${req.url}`,
    "reqLog.txt"
  );
  console.log(`${req.method} \n ${req.path}`);
  next();
};
module.exports = { logger, logEvent };
