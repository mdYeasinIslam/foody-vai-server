import mongoose, { Schema } from "mongoose";

const ProductOrderStatsSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      unique: true,
    },

    totalOrderedQuantity: {
      type: Number,
      default: 0,
    },

    totalOrders: {
      type: Number,
      default: 0,
    },

    orderHistory: [
      {
        orderId: String,
        quantity: Number,
        orderedAt: Date,
      },
    ],
  },
  {
    timestamps: true,
  },
);
const ProductOrderStats = mongoose.model(
  "ProductOrderStats",
  ProductOrderStatsSchema,
);
export default ProductOrderStats;
