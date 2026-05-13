"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const priceSchema = new mongoose_1.Schema({
    weight: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    originalPrice: {
        type: Number,
        required: true,
    },
    weightName: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
}, { _id: false });
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    prices: { type: [priceSchema], required: true },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    subCategory: {
        type: String,
        trim: true,
    },
    img: {
        type: String,
        required: true,
        trim: true,
    },
}, { timestamps: true, versionKey: false });
const ProductModel = (0, mongoose_1.model)("Product", productSchema);
exports.default = ProductModel;
//# sourceMappingURL=product.model.js.map