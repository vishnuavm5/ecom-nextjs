import mongoose from "mongoose";

let isConnected: boolean = false;

const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URI) return console.log("Missing MongoDB URI");
  if (isConnected) {
    console.log(`Connection is already established`);
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log(error);
  }
};
export default connectToDB;
