import express from "express";
import protect from "../middleware/auth.js";
import { changeRoleToOwner, addCar } from "../controllers/ownerController.js";
const ownerRouter = express.Router();

ownerRouter.post("/change-role", protect, changeRoleToOwner);
ownerRouter.post("/add-car", protect, addCar);

export default ownerRouter;
