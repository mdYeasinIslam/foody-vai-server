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
const cartSchema = new mongoose_1.Schema({
    productId: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    price: { type: priceSchema, required: true },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    subCategory: {
        type: String,
        trim: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    img: {
        type: String,
        required: true,
        trim: true,
    },
}, { timestamps: true, versionKey: false });
const CartModel = (0, mongoose_1.model)("Cart", cartSchema);
exports.default = CartModel;
//# sourceMappingURL=cart.model.js.map