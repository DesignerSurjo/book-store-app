import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET);
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    if (password === user.password) { // In production, you should hash and compare passwords
      const token = createToken(user._id, user.role);
      res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Password should be at least 8 characters long" });
    }

    const newUser = new userModel({ name, email, password });
    const user = await newUser.save();
    const token = createToken(user._id, user.role);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await userModel.findOne({ email, role: 'admin' });

    if (!admin) {
      return res.json({ success: false, message: "Invalid credentials or not an admin" });
    }

    if (password === admin.password) {
      const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateUserRole = async (req, res) => {
    try {
      const { userId } = req.params;
      const { role } = req.body; // "admin" or "customer"
  
      if (role !== 'admin' && role !== 'customer') {
        return res.json({ success: false, message: "Invalid role" });
      }
  
      const updatedUser = await userModel.findByIdAndUpdate(
        userId,
        { role },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.json({ success: false, message: "User not found" });
      }
  
      res.json({ success: true, message: "User role updated", user: updatedUser });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  
  

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({}, { password: 0 });
    res.json({ success: true, users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { loginUser, registerUser, adminLogin, getAllUsers, deleteUser, updateUserRole };
