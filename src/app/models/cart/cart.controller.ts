import express from "express";
import z from "zod";
import CartModel from "./cart.model";
export const cartRoute = express.Router();

const zodCheck = z.object({
  name: z.string(),
  description: z.string().nullable(),
  price: z.number(),
  weight: z.number(),
  originalPrice: z.number(),
  category: z.string(),
  quantity: z.number(),
  img: z.string(),
});

cartRoute.post("/add-product", async (req, res) => {
  try {
    const body = zodCheck.parse(req.body);
    console.log(body);
    const saveData = await CartModel.create(body);
    res.status(201).json({
      success: true,
      message: "",
      data: saveData,
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
cartRoute.get("/", async (req, res) => {
  try {
    const cartProducts = await CartModel.find();
    res.status(201).json({
      success: true,
      message: "",
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

