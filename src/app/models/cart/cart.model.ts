import { model, Schema } from "mongoose";
const priceSchema = new Schema(
  {
    weight: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    weightName: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);
const cartSchema = new Schema(
  {
    productId: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },

    price: { type: priceSchema, required: true },
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
