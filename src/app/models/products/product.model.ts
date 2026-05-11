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
const productSchema = new Schema(
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
    prices: { type: [priceSchema], required: true },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    subCategory: {
      type: String,
      trim: true,
    },
    img: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false },
);

const ProductModel = model("Product", productSchema);
export default ProductModel;
