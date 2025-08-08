import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("DB CONNECTED 💖");
    });
    await mongoose.connect(`${process.env.MONGODB_URI}/quickcarz`);
  } catch (err) {
    console.log(err.message);
  }
};
export default connectDB;
