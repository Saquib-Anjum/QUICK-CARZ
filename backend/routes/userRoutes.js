import express from "express";
import {
  register,
  login,
  getUserData,
  getCars,
} from "../controllers/userController.js";
import protect from "../middleware/auth.js";
const userRouter = express.Router();

userRouter.post("/register", register);

userRouter.post("/login", login);
userRouter.get("/data", protect, getUserData);
userRouter.get("/cars", getCars);

export default userRouter;
