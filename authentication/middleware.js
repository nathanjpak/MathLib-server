const authenticateRequest = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.status(401).send("No active session");
  } else {
    next();
  }
}

module.exports = authenticateRequest;
