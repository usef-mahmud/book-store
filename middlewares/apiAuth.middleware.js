const jwt = require("jsonwebtoken");
module.exports.apiAuth = (req, res, next) => {
  if (req.headers['x-access-token']) {
    jwt.verify(
      req.headers['x-access-token'],
      process.env.SECRET_KEY,
      (err) => {
        err
          ? res.status(401).json({
              data: {},
              status: "ERROR",
              errorMessage: "invalid api token",
            })
          : next()
      }
    );
  } else {
    res.status(401).json({
      data: {},
      status: "ERROR",
      errorMessage: "api token is empty",
    })
  }
}
