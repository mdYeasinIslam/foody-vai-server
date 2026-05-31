import express, { Request, Response } from "express";
import AddressModel from "./address.model";
import z from "zod";
import { verifyToken } from "../auth/auth.controller";

export const addressRoute = express.Router();

const AddressZod = z.object({
  districtId: z.string(),
  // districtName: z.string().nullable(),
  areaId: z.string(),
  // areaName: z.string().nullable(),
  contactName: z.string(),
  phone: z.string(),
  addressName: z.string(),
  address: z.string(),
  isDefault:z.boolean().optional()
});

addressRoute.post("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const body = await AddressZod.parseAsync(req.body);
    const count = await AddressModel.countDocuments();
    const address = await AddressModel.create({
      ...body,
      isDefault: count === 0,
    });
    res.status(201).json({
      success: true,
      message: "Address is added successfully",
      data: address,
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
addressRoute.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const findAll = await AddressModel.find();
    res.status(201).json({
      success: true,
      message: "Address is fetched successfully",
      data: findAll,
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
//update address info
addressRoute.patch("/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const body = await req.body;
    const findOneAndUpdate = await AddressModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Address is updated successfully",
      data: findOneAndUpdate,
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
//delete all address
addressRoute.delete("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const findAllAndDelete = await AddressModel.deleteMany();
    res.status(201).json({
      success: true,
      message: "Address is deleted successfully",
      data: findAllAndDelete,
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
//delete single one
addressRoute.delete(
  "/:id",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const findOneAndDelete = await AddressModel.findByIdAndDelete(id);
      res.status(201).json({
        success: true,
        message: "Address is deleted successfully",
        data: findOneAndDelete,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: error,
      });
    }
  },
);
