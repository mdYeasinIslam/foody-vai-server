import express, { Request, Response } from "express";
import z from "zod";
import ProductModel from "./product.model";

export const productRoute = express.Router();

const zodCheck = z.object({
  name: z.string(),
  description: z.string().nullable(),
  prices: z.array(z.object({
    weight: z.number(),
    price: z.number(),
    originalPrice: z.number(),
    weightName:z.string(),
    currency:z.string()
  })),
  category: z.string(),
  subCategory: z.string().nullable(),
  img: z.string(),
});
productRoute.post("/add-product", async (req: Request, res: Response) => {
  try {
    const body = zodCheck.parse(req.body);
    const saveData = await ProductModel.create(body);
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

productRoute.get("/", async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find();
    res.status(201).json({
      success: true,
      message: "",
      data: products,
      count: products.length,
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
