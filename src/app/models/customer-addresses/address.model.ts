import { model, Schema } from "mongoose";
import { minLength } from "zod";

const addressSchema = new Schema({
  districtId: {
    type: String,
    required: true,
    trim: true,
  },
  districtName: {
    type: String,
    required: true,
    trim: true,
  },
  areaId: {
    type: String,
    required: true,
    trim: true,
  },
  areaName: {
    type: String,
    trim:true
  },
  contactName: {
    type: String,
    required: true,
    trim:true
  },
  phone: {
    type: String,
    required: true,
    minlength: [10, 'Phone number should be a valid Bangladeshi phone number'],
    trim:true
  },
  addressName: {
    type: String,
    required: true,
    enum: ["office", "home", "other"],
  },
  address: {
    type: String,
    required: true,
  },
});
const AddressModel = model("Address", addressSchema);
export default AddressModel;