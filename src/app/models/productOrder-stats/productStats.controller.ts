import express from "express";
import ProductOrderStats from "./productStats.model";
export const productStateRoute = express.Router();
productStateRoute.get("/", async (req, res) => {
  try {
    const cartProducts = await ProductOrderStats.find().sort({ createdAt: -1 });
    res.status(201).json({
      success: true,
      message: "All cart data are fetched successfully",
      data: cartProducts,
      count: cartProducts.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
});
