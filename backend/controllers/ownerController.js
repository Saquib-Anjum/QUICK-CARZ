import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import userModel from "../models/userModel.js";
import carModel from "../models/carModel.js";
import multer from "multer";
import fs from "fs";
import imagekit from "../config/imageKit.js";
// api change role
export const changeRoleToOwner = async (req, res) => {
  try {
    const { _id } = req.user;
    await userModel.findOneAndUpdate(_id, { role: "owner" });
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
    const imageFile = req.file;
    // upload image to imagekit
    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.orignalname,
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

//
