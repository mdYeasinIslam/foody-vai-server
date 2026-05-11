import express from "express";
import z, { success } from "zod";
import CartModel from "./cart.model";
import mongoose from "mongoose";
export const cartRoute = express.Router();

const zodCheck = z.object({
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
    const id = req.body._id;
    const body = zodCheck.parse(req.body);
    const findProduct = await CartModel.findOne(id).exec();
    if (findProduct) {
      const quantity = findProduct.quantity + body.quantity;
      const saveData = await CartModel.findOneAndUpdate(id, {
        quantity: quantity,
      });
      res.status(201).json({
        success: true,
        message: "Item already exit in DB. SO, Quantity updated successfully",
        data: saveData,
      });
    } else {
      console.log('else')
      const saveData = await CartModel.create(body);
      res.status(201).json({
        success: true,
        message: "An item added to cart successfully",
        data: saveData,
      });
    }
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

cartRoute.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const updateData = await CartModel.findByIdAndUpdate(id, body);
    res.status(201).json({
      success: true,
      message: "Item updated successfully",
      data: updateData,
    })
  } catch (error) {
     console.log(error);
     res.status(500).json({
       success: false,
       message: "Something went wrong",
       error: error,
     });
  }
})