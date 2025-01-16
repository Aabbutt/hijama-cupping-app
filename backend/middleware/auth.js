const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");
const bcrypt = require("bcrypt");

const hashPassword = async (req, res, next) => {
  const { password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  req.body.password = hashedPassword;

  next();
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const jwtParse = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      console.log("No authorization header or incorrect format");
      return res.status(401).json({
        message: "Please login first",
        success: false,
        data: [],
      });
    }

    const token = authorization.split(" ")[1];
    console.log("Received token:", token);

    if (!token) {
      console.log("Token is empty");
      return res.status(401).json({
        message: "Please login first",
        success: false,
        data: [],
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      console.log("User not found");
      return res.status(404).json({
        message: "User not found",
        success: false,
        data: [],
      });
    }

    req.user = user.toObject();
    next();
  } catch (error) {
    console.log("Error in jwtParse:", error.message);
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({
        message: "Invalid or expired token. Please login again.",
        success: false,
        data: [],
      });
    }
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      data: [],
    });
  }
};

const isAdmin = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Unauthorized",
      success: false,
      data: [],
    });
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        data: [],
      });
    }
    if (user.role !== "admin") {
      return res.status(401).json({
        message: "Unauthorized",
        success: false,
        data: [],
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
      success: false,
      data: [],
    });
  }
};

module.exports = { hashPassword, jwtParse, isAdmin, comparePassword };
