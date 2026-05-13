"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    customerName: {
        type: String,
        required: [true, "Customer name is required"],
        trim: true,
    },
    customerPhone: {
        type: String,
        required: [true, "Customer phone is required"],
        trim: true,
    },
    customerAddress: {
        type: String,
        required: [true, "Customer address is required"],
        trim: true,
    },
    items: {
        type: Array,
        required: true,
    },
    subtotal: {
        type: Number,
        required: true,
    },
    tax: {
        type: Number,
        required: true,
    },
    deliveryFee: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    specialNotes: {
        type: String,
        default: "",
    },
    paymentMethod: {
        type: String,
        enum: ["cash", "card", "online"],
        default: "cash",
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending",
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "preparing", "ready", "delivered"],
        default: "pending",
    },
    statusHistory: [
        {
            status: String,
            timestamp: Date,
            by: String,
            note: String,
        },
    ],
    estimatedTime: {
        type: Date,
        default: null,
    },
}, {
    versionKey: false,
    timestamps: true,
});
const Order = mongoose_1.default.model("Order", orderSchema);
exports.default = Order;
//# sourceMappingURL=order.model.js.map