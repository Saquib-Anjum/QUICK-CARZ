import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
const bookingSchema = new mongoose.Schema(
  {
    car: {
      type: ObjectId,
      ref: "car",
      required: true,
    },
    user: {
      type: ObjectId,
      ref: "user",
      required: true,
    },
    owner: {
      type: ObjectId,
      ref: "user",
      required: true,
    },
    pickupDate: {
      type: Date,
      required: true,
    },
    returnDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const bookingModel = mongoose.model("bookings", bookingSchema);

export default bookingModel;
