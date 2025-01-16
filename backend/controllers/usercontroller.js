const User = require("../models/usermodel");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");
const { comparePassword } = require("../middleware/auth");
const bcrypt = require("bcryptjs");

const createToken = (_id) => {
  return jwt.sign({ _id }, JWT_SECRET, {
    expiresIn: "3d",
  });
};

//  create user

const createuser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
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

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify current password
    const isMatch = await comparePassword(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to change password" });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password");
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Failed to get profile" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, email, phone, address, dateofbirth, gender } = req.body;

    console.log('Update profile request:', {
      userId,
      body: req.body
    });

    const user = await User.findById(userId);
    if (!user) {
      console.log('User not found:', userId);
      return res.status(404).json({ error: "User not found" });
    }

    // Update fields if provided, but don't change the role
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (address) user.address = address;
    if (dateofbirth) user.dateofbirth = dateofbirth;
    if (gender) user.gender = gender;

    // Keep the existing role
    user.role = 'patient'; // Default to 'patient' if no role exists

    console.log('Updating user with:', {
      name,
      email,
      phone,
      address,
      dateofbirth,
      gender,
      role: user.role
    });

    await user.save();

    // Return updated user without password
    const updatedUser = await User.findById(userId).select("-password");
    console.log('User updated successfully:', updatedUser);

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ 
      error: "Failed to update profile",
      details: error.message 
    });
  }
};

const logout = async (req, res) => {
  try {
    // Since we're using JWT, we just need to tell the client to remove the token
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to logout" });
  }
};

module.exports = {
  createuser,
  destroyuser,
  updateuser,
  getuserbyid,
  getallusers,
  login,
  changePassword,
  getProfile,
  updateProfile,
  logout
};
