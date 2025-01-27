const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

function adminMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  // Check if the Authorization header is provided
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
        msg: "You are not authenticated.",
      });
    }
  } catch (error) {
    // Handle token verification errors
    return res.status(401).json({
      msg: "Invalid or expired token.",
      error: error.message, // Optional: For debugging
    });
  }
}

module.exports = adminMiddleware;