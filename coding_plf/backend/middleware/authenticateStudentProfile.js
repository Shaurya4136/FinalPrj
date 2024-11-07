const jwt = require('jsonwebtoken');
const User = require('../models/User1'); // Ensure correct User model path

const authenticateStudentProfile = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from the header

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token
    const user = await User.findById(decoded.userId); // Fetch user based on decoded userId

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if the user's role is 'Student'
    if (user.role !== 'Student') {
      return res.status(403).json({ message: 'Access denied. Not a student.' });
    }

    // Attach user information to the request object for later use
    req.user = {
      id: user._id,
      role: user.role
    };

    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired.' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: 'Invalid token.' });
    } else {
      console.error('Authentication error:', error);
      return res.status(500).json({ message: 'Authentication error. Please try again later.' });
    }
  }
};

module.exports = authenticateStudentProfile;
