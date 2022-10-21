const authenticateRequest = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.header(401).send("No active session");
  } else {
    next();
  }
}

module.exports = authenticateRequest;
