const { logEvents } = require("./logger");

const errorHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}: ${err.message}\tmethod: ${req.method}, url: ${req.url}, origin: ${req.headers.origin}`,
    "errLog.log"
  );
  console.log(err.stack);

  const status = res.statusCode ? res.statusCode : 500; // server error

  res.status(status);

  res.json({ status: "fail", message: err.message });
};

module.exports = errorHandler;
