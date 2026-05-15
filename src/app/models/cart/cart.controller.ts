import express from "express";
import z, { success } from "zod";
import CartModel from "./cart.model";
import mongoose from "mongoose";
export const cartRoute = express.Router();

const zodCheck = z.object({
  productId: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.object({
    weight: z.number(),
    price: z.number(),
    originalPrice: z.number(),
    currency: z.string(),
    weightName: z.string(),
  }),
  category: z.string(),
  quantity: z.number(),
  img: z.string(),
});

cartRoute.post("/add-product", async (req, res) => {
  try {
    const body = zodCheck.parse(req.body);
    const existing = await CartModel.findOne({
      productId: body.productId,
      "price.weight": body.price.weight,
    });
    if (existing) {
      // already in DB
      const updatedData = await CartModel.findByIdAndUpdate(
        existing._id,
        { $inc: { quantity: 1 } },
        { new: true },
      );

      return res.status(201).json({
        success: true,
        data: updatedData,
        alreadyExist: true,
        message: "Item already in cart. Quantity increased.",
        cartItemId: existing._id,
      });
    }
    const savedData = await CartModel.create({ ...body, quantity: 1 });
    res.status(201).json({
      success: true,
      alreadyExist: false,
      message: "An item added to cart successfully",
      data: savedData,
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
    const cartProducts = await CartModel.find().sort({ createdAt: -1 });
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
cartRoute.get("/:id", async (req, res) => {
  try {
    const id = req.params.id.trim();
    console.log(mongoose.Types.ObjectId.isValid(id));
    const cartProduct = await CartModel.findById(id);
    console.log(cartProduct);
    res.status(200).json({
      success: true,
      message: "Cart data are fetched successfully",
      data: cartProduct,
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
cartRoute.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteData = await CartModel.findByIdAndDelete(id);
    res.status(201).json({
      success: true,
      message: "Item deleted successfully",
      data: deleteData,
      cartItemId: id,
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

cartRoute.delete("/", async (req, res) => {
  try {
    const deleteData = await CartModel.deleteMany({});
    res.status(201).json({
      success: true,
      message: "All items deleted successfully",
      data: deleteData,
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

cartRoute.patch("/:id/quantity", async (req, res) => {
  try {
    const { action, productId, price } = req.body;
    const delta = action === "increment" ? 1 : -1;
    const updatedData = await CartModel.findOneAndUpdate(
      { productId, "price.weight": price.weight },
      { $inc: { quantity: delta } },
      { new: true },
    );
    if (!updatedData)
      return res
        .status(404)
        .json({ success: false, message: "Cart item not found" });

    // auto-delete if quantity drops to 0
    if (updatedData.quantity <= 0) {
      await CartModel.findByIdAndDelete(updatedData._id);
      return res.status(200).json({ success: true, data: null, deleted: true,cartItemId:updatedData._id });
    }
    res.status(200).json({
      success: true,
      message: "Item updated successfully",
      data: updatedData,
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
