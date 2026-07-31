import express, { Request, Response } from "express";
import z from "zod";
import CategoryModel from "./category.model";

export const categoryRouter = express.Router();

const zodCategory = z.object({
  //   _id: z.string().optional(),
  name: z.string(),
  description: z.string().nullable(),
  img: z.string(),
});

categoryRouter.post("/add-category", async (req: Request, res: Response) => {
  try {
    const body = zodCategory.parse(req.body);
    const savedCategory = await CategoryModel.create(body);
    res.status(200).json({
      success: true,
      message: "Category added successfully",
      data: savedCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
});
categoryRouter.get("/", async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
});
categoryRouter.get("/:id", async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Category fetched successfully",
      data: category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
});
categoryRouter.patch("/:id", async (req, res) => {
  try {
    const body = zodCategory.parse(req.body);
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      req.params.id,
      body,
      { new: true },
    );
    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
});
categoryRouter.delete("/:id", async (req, res) => {
  try {
    const deletedCategory = await CategoryModel.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: deletedCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
});