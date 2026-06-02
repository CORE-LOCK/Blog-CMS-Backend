import user from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await user.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "user already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = await user.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      success: true,
      message: "user register successfully",
      userData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await user.findOne({ email });
    if (!userData) {
      return res.status(400).json({
        success: false,
        message: "invalid email or password",
      });
    }
    // compare password
    const isMatch = await bcrypt.compare(password, userData.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "invalid email or password",
      });
    }
    
    // token
    const token = jwt.sign({ id: userData._id }, process.env.secret_key, {
      expiresIn: "7d",
    });
    res.status(200).json({
      success: true,
      message: "user login successfully",
      token,
      userData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
