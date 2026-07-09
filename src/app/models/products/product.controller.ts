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
    res.status(200).json({
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
// GET SINGLE PRODUCT
productRoute.get("/:id", async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
});
// UPDATE PRODUCT
productRoute.patch("/:id", async (req: Request, res: Response) => {
  try {
    const body = zodCheck.partial().parse(req.body);

    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
});
// DELETE PRODUCT
productRoute.delete("/:id", async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
});