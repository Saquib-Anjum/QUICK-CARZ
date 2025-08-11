import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import userModel from "../models/userModel.js";
import carModel from "../models/carModel.js";
import multer from "multer";
import fs from "fs";
import imagekit from "../config/imageKit.js";
import bookingModel from "../models/BookingModel.js";
// api change role
export const changeRoleToOwner = async (req, res) => {
  try {
    const { _id } = req.user;
    await userModel.findByIdAndUpdate(_id, { role: "owner" });
    res.json({
      success: true,
      message: "Now you yan list cars",
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: err.message,
    });
  }
};

//add new car API
export const addCar = async (req, res) => {
  try {
    const { _id } = req.user;

    let car = JSON.parse(req.body.carData);
    console.log("Car ->", car);
    const imageFile = req.file;
    // upload image to imagekit
    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/cars",
    });
    // For URL Generation, works for both images and videos
    var optimizedImageURL = imagekit.url({
      path: response.filePath,

      transformation: [
        { width: "1280" },
        { quality: "auto" },
        { format: "webp" },
      ],
    });

    const image = optimizedImageURL;
    await carModel.create({ ...car, owner: _id, image });
    res.json({
      success: true,
      message: "Car Added",
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: err.message,
    });
  }
};

// API to list owner car

export const getOwnersCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const cars = await carModel.find({ owner: _id });

    res.json({
      success: true,
      message: "Here is owners car",
      cars,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: err.message,
    });
  }
};

// Api to toggle car Avability

export const toggleCarAvailability = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await carModel.findById(carId);
    // checking is car beleongs to user
    if (car.owner.toString() !== _id.toString()) {
      return res.json({
        success: false,
        message: "Unauthorized",
      });
    }
    car.isAvailable = !car.isAvailable;
    await car.save();
    res.json({
      success: true,
      message: "Availability toggeled",
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: err.message,
    });
  }
};

// API to delete a car delete cat from list

export const deleteCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await carModel.findById(carId);
    // checking is car beleongs to user
    if (car.owner.toString() !== _id.toString()) {
      return res.json({
        success: false,
        message: "Unauthorized",
      });
    }
    car.owner = null;
    car.isAvailable = false;
    await car.save();
    res.json({
      success: true,
      message: "Car removed",
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: err.message,
    });
  }
};

// API to get Dashboard data
export const getDashboardData = async (req, res) => {
  try {
    const { _id, role } = req.user;
    if (role !== "owner") {
      return res.json({
        success: false,
        message: "Unauthorized",
      });
    }
    const cars = await carModel.find({ owner: _id });

    const bookings = await bookingModel
      .find({ owner: _id })
      .populate("car")
      .sort({ createdAt: -1 });
    const pendingBookings = await bookingModel.find({
      owner: _id,
      status: "pending",
    });
    const completedBookings = await bookingModel.find({
      owner: _id,
      status: "confirmed",
    });

    // calculate monthly revenue

    const monthlyRevenue = bookings
      .slice()
      .filter((booking) => booking.status === "confirmed")
      .reduce((acc, booking) => acc + booking.price, 0);

    const recentBookings = bookings.slice(0, 3);

    const dashboardData = {
      totalCars: cars.length,
      totalBookings: bookings.length,
      pendingBookings: pendingBookings.length,
      completedBookings: completedBookings.length,
      recentBookings: recentBookings.length,
      monthlyRevenue,
    };
    res.json({
      success: true,
      dashboardData,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: err.message,
    });
  }
};

// API to update user profile
export const updateUserImage = async (req, res) => {
  try {
    const { _id } = req.user;
    const imageFile = req.file;
    // upload image to imagekit
    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/users",
    });
    // For URL Generation, works for both images and videos
    var optimizedImageURL = imagekit.url({
      path: response.filePath,

      transformation: [
        { width: "400" },
        { quality: "auto" },
        { format: "webp" },
      ],
    });
    const image = optimizedImageURL;
    await userModel.findByIdAndUpdate(_id, { image });
    res.json({
      success: true,
      message: "Image updated",
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: err.message,
    });
  }
};
