import express from "express";
import { register, login, getUserData } from "../controllers/userController.js";
import protect from "../middleware/auth.js";
const userRouter = express.Router();

userRouter.post("/register", register);

userRouter.post("/login", login);
userRouter.get("/data", protect, getUserData);

export default userRouter;
