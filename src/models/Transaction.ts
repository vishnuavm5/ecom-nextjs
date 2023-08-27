import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  itemId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  paymentMode: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

const Transaction =
  mongoose.models.transactions ||
  mongoose.model("transactions", transactionSchema);

export default Transaction;
