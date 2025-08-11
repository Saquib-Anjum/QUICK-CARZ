import mongoose from "mongoose";
import bookingModel from "../models/BookingModel.js";
import carModel from "../models/carModel.js";
// function to check Available of car for given date

const checkAvailability = async (car, pickupDate, returnDate) => {
  const bookings = await bookingModel.find({
    car,
    pickupDate: { $lte: returnDate },
    returnDate: { $gte: pickupDate },
  });

  return bookings.length === 0;
};

// API tocheck Availabiity of cars for the given Date and location

export const checkAvailabilityOfCar = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.body;
    // fetch all available car ffor given location

    const cars = await carModel.find({ location, isAvailable: true });

    // check car availability using primise

    const availableCarsPromises = cars.map(async (car) => {
      const isAvailable = await checkAvailability(
        car._id,
        pickupDate,
        returnDate
      );
      return { ...car._doc, isAvailable: isAvailable };
    });

    let availableCars = await Promise.all(availableCarsPromises);
    availableCars = availableCars.filter((car) => car.isAvailable === true);

    res.json({
      success: true,
      availableCars,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

// API to create Booking

export const createBooking = async (req, res) => {
  try {
    const { _id } = req.user;
    const { car, pickupDate, returnDate } = req.body;
    // check avilablity
    const isAvailable = await checkAvailability(car, pickupDate, returnDate);
    if (!isAvailable) {
      return res.json({
        success: false,
        message: "Car is not Available",
      });
    }
    const carData = await carModel.findById(car);
    // calculate price based on return and return date

    const picked = new Date(pickupDate);

    const returned = new Date(returnDate);

    const noOfDays = Math.ceil(returned - picked) / (1000 * 60 * 60 * 24);
    const price = carData.pricePerDay * noOfDays;
    await bookingModel.create({
      car,
      owner: carData.owner,
      user: _id,
      pickupDate,

      returnDate,
      price,
    });
    res.json({
      success: true,
      message: "Booking Completed",
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

// API to list Users
export const getUserBookings = async (req, res) => {
  try {
    const { _id } = req.user;
    const bookings = await bookingModel
      .find({ user: _id })
      .populate("car")
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      bookings,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

// API to get owner booking

export const getOwnerBookings = async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.json({ success: false, message: "Unauthorized " });
    }
    const bookings = await bookingModel
      .find({
        owner: req.body._id,
      })
      .populate("car user")
      .select("-user.password")
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      bookings,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

// API to update booking status
export const changeBookingStatus = async (req, res) => {
  try {
    const { _id } = req.user;
    const { bookingId, status } = req.body;
    const booking = await bookingModel.findById(bookingId);
    if (booking.owner.toString() !== _id.toString()) {
      return res.json({
        success: false,
        message: "Unauthorized",
      });
    }
    booking.status = status;
    await booking.save();
    res.json({
      success: true,
      message: "Staus Updated",
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
