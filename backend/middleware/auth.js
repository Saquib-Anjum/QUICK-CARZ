// import jwt from "jsonwebtoken";
// import userModel from "../models/userModel.js";
// const protect = async (req, res, next) => {
//   const token = req.headers.authorization;
//   if (!token) {
//     return res.json({
//       success: false,
//       messahe: "Not Authorized",
//     });
//   }

//   try {
//     const userId = jwt.decode(token, process.env.JWT_SECRET);
//     if (!userId) {
//       return res.json({
//         success: false,
//         messahe: "Not Authorized",
//       });
//     }

//     req.user = await userModel.findById(userId).select("-password");
//     next();
//   } catch (err) {
//     console.log(err);
//     res.json({
//       success: false,
//       message: err.message,
//     });
//   }
// };
// export default protect;

import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const protect = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorized ⛔ - No token provided",
    });
  }

  try {
    // Use jwt.verify instead of jwt.decode for security
    // jwt.decode doesn't verify the token signature
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.json({
        success: false,
        message: "Not Authorized ⛔- Invalid token",
      });
    }

    // Use decoded.id instead of the entire decoded object
    // The decoded object contains { id, iat, exp }, we only need the id
    req.user = await userModel.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.json({
        success: false,
        message: "User 🙏☁️ not found",
      });
    }

    next();
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Not Authorized - " + err.message,
    });
  }
};

export default protect;
