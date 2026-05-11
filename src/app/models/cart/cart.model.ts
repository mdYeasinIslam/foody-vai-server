import { model, Schema } from "mongoose";

const cartSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    subCategory: {
      type: String,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false },
);

const CartModel = model("Cart", cartSchema);
export default CartModel;
