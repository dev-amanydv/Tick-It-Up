const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

function userMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  // Check if the Authorization header is present
  if (!authHeader) {
    return res.status(401).json({
      msg: "Authorization token is missing.",
    });
  }

  const words = authHeader.split(" ");
  if (words[0] !== "Bearer" || !words[1]) {
    return res.status(400).json({
      msg: "Invalid token format. Expected 'Bearer <token>'.",
    });
  }

  const jwtToken = words[1];

  try {
    const decodedValue = jwt.verify(jwtToken, JWT_SECRET);

    if (decodedValue && decodedValue.username) {
      next(); // User is authenticated
    } else {
      return res.status(403).json({
        msg: "You are not authorized to access this resource.",
      });
    }
  } catch (error) {
    return res.status(401).json({
      msg: "Invalid or expired token.",
      error: error.message, // Optional for debugging purposes
    });
  }
}

module.exports = userMiddleware;