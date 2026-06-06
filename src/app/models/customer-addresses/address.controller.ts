import express, { Request, Response } from "express";
import AddressModel from "./address.model";
import z from "zod";
import { verifyToken } from "../auth/auth.controller";

export const addressRoute = express.Router();

const AddressZod = z.object({
  districtId: z.string(),
  districtName: z.string(),
  areaId: z.string(),
  areaName: z.string(),
  contactName: z.string(),
  phone: z.string(),
  addressName: z.string(),
  address: z.string(),
  isDefault: z.boolean().optional(),
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
//update (set as default)
addressRoute.patch(
  "/:id/set-default",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const { isDefault } = req.body;

      if (isDefault) {
        await AddressModel.updateMany({}, { isDefault: false });
      }
      const updatedAddress = await AddressModel.findByIdAndUpdate(
        id,
        { isDefault },
        { new: true },
      );
      res.status(200).json({
        success: true,
        message: "Address default status updated successfully",
        data: updatedAddress,
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
      const address = await AddressModel.findById(id);

      if (address?.isDefault) {
        await AddressModel.findByIdAndDelete(id);
        const firstAddress = await AddressModel.findOne();
        if (firstAddress) {
          await AddressModel.findByIdAndUpdate(firstAddress._id, {
            isDefault: true,
          });
        }
      } else {
        await AddressModel.findByIdAndDelete(id);
      }

      res.status(200).json({
        success: true,
        message: "Address is deleted successfully",
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
  },
);
