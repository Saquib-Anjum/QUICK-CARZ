import express from "express";
import {
  checkAvailabilityOfCar,
  createBooking,
  getUserBookings,
  getOwnerBookings,
  changeBookingStatus,
} from "../controllers/bookingController.js";
import protect from "../middleware/auth.js";
const bookingRouter = express.Router();

//check availability
bookingRouter.post("/check-availability", checkAvailabilityOfCar),
  //create booking
  bookingRouter.post("/create", protect, createBooking);
//get user booking
bookingRouter.get("/user", protect, getUserBookings);
//get owner booking
bookingRouter.get("/owner", protect, getOwnerBookings);
//change
bookingRouter.post("change-status", protect, changeBookingStatus);

export default bookingRouter;
