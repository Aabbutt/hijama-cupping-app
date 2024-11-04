const User = require("../models/usermodel");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");
const { comparePassword } = require("../middleware/auth");

const createToken = (_id) => {
  return jwt.sign({ _id }, JWT_SECRET, {
    expiresIn: "3d",
  });
};

//  create user

const createuser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: " All fields are required " });
  }

  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ error: "User already exists" });
  }

  const newUser = new User(req.body);

  await newUser.save();

  const token = createToken(newUser._id);

  res.status(201).json({
    message: "User was created",
    token,
    user: {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
  });
};

// get all users

const getallusers = async (req, res) => {
  try {
    const result = await User.find();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: " user not create " });
  }
};

// get user by id

const getuserbyid = async (req, res) => {
  const user = req.user;

  res.status(200).json({
    message: " User found",
    user,
    success: true,
  });
};

// update user

const updateuser = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById({ _id });
  const { name, email, role, phone, address, dateofbirth } = req.body;

  name && (user.name = name);
  email && (user.email = email);
  role && (user.role = role);
  phone && (user.phone = phone);
  address && (user.address = address);
  dateofbirth && (user.dateofbirth = dateofbirth);
  await user.save();

  res.status(200).json({
    message: "User was updated",
    data: user,
    success: true,
  });
};

// delete user

const destroyuser = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res
      .status(400)
      .json({ message: "User id is required", success: false });
  }
  const result = await User.findByIdAndDelete(id);
  if (!result) {
    return res.status(404).json({
      message: "User not found",
      success: false,
    });
  }

  res.status(200).json({
    message: "User was deleted",
    success: true,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ error: "Email not found" });
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ error: "Invalid Password" });
  }

  const token = createToken(user._id);

  res.status(200).json({
    message: "User was logged in",
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

module.exports = {
  createuser,
  destroyuser,
  updateuser,
  getuserbyid,
  getallusers,
  login,
};
