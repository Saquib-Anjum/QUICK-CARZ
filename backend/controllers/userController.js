import mongoose from "mongoose";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import carModel from "../models/carModel.js";
// create JWT function: generate token
const generateJWT = (userId) => {
  const payload = { id: userId };
  return jwt.sign(payload, process.env.JWT_SECRET);
};
//registeration of user
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password || password.length < 8) {
      return res.json({
        success: false,
        message: "Fill all the fields",
      });
    }
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.json({
        success: false,
        message: "User already Exist",
      });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const userData = {
      name,
      email,
      password: encryptedPassword,
    };

    // const data = new userModel(userData);
    // data.save();
    const user = await userModel.create(userData);
    const token = generateJWT(user._id.toString());
    res.json({
      success: true,
      message: "user Successfully created",
      token,
    });
  } catch (err) {
    console.log(err.message);
    res.json({
      success: false,
      message: err.message,
    });
  }
};

//user login

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await userModel.findOne({ email });
    if (!userData) {
      return res.json({
        success: false,
        message: "User 🙏 not found",
      });
    }
    const isMatched = await bcrypt.compare(password, userData.password);
    if (!isMatched) {
      return res.json({
        success: false,
        message: "Invalid user credentials",
      });
    }
    const token = generateJWT(userData._id.toString());
    res.json({
      success: true,
      message: "User logged in",
      token,
    });
  } catch (err) {
    console.log(err.message);
    res.json({
      success: false,
      message: err.message,
    });
  }
};

//get user data using jwt token
export const getUserData = async (req, res) => {
  try {
    const { user } = req;

    res.json({
      success: true,
      message: "here is the user ☁️",
      user,
    });
  } catch (err) {
    console.log(err.message);
    res.json({
      success: false,
      message: err.message,
    });
  }
};

// get All car datafor the frontend

export const getCars = async (req, res) => {
  try {
    const cars = await carModel.find({ isAvailable: true });
    res.json({
      success: true,
      cars,
    });
  } catch (err) {
    console.log(err.message);
    res.json({
      success: false,
      message: err.message,
    });
  }
};
