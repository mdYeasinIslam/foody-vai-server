import { model, Schema } from "mongoose";
import { ICategory } from "./interface";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    img: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false },
);

const CategoryModel = model("Category", categorySchema);
export default CategoryModel;
