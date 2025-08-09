import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
const protect = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.json({
      success: false,
      messahe: "Not Authorized",
    });
  }

  try {
    const userId = jwt.decode(token, process.env.JWT_SECRET);
    if (!userId) {
      return res.json({
        success: false,
        messahe: "Not Authorized",
      });
    }

    await userModel.findOne({ userId });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: err.message,
    });
  }
};
export default protect;
