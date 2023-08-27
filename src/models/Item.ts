import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: [true, "Please provide item name"],
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: [true, "Please provide price for the item"],
  },
  category: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  sellerInfo: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  img1: {
    type: String,
  },
  img2: {
    type: String,
  },
  img3: {
    type: String,
  },
  img4: {
    type: String,
  },
  Orders: {
    type: Number,
  },
});

const Item = mongoose.models.items || mongoose.model("items", ItemSchema);

export default Item;
