import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please provide a valid email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isSeller: {
    type: Boolean,
    required: [true, "Please choose seller or not"],
  },
  address: {
    type: String,
  },
  cart: [{ type: mongoose.Types.ObjectId, ref: "Item" }],
  orders: [{ type: mongoose.Types.ObjectId, ref: "Item" }],
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
