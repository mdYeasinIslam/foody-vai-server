"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRoute = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = __importDefault(require("zod"));
const cart_model_1 = __importDefault(require("./cart.model"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.cartRoute = express_1.default.Router();
const zodCheck = zod_1.default.object({
    productId: zod_1.default.string(),
    name: zod_1.default.string(),
    description: zod_1.default.string().nullable(),
    price: zod_1.default.object({
        weight: zod_1.default.number(),
        price: zod_1.default.number(),
        originalPrice: zod_1.default.number(),
        currency: zod_1.default.string(),
        weightName: zod_1.default.string(),
    }),
    category: zod_1.default.string(),
    quantity: zod_1.default.number(),
    img: zod_1.default.string(),
});
exports.cartRoute.post("/add-product", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = zodCheck.parse(req.body);
        const existing = yield cart_model_1.default.findOne({
            productId: body.productId,
        });
        if (existing) {
            // already in DB
            const updatedData = yield cart_model_1.default.findByIdAndUpdate(existing._id, { $inc: { quantity: 1 } }, { new: true });
            return res.status(201).json({
                success: true,
                data: updatedData,
                alreadyExist: true,
                message: "Item already in cart. Quantity increased.",
                cartItemId: existing._id,
            });
        }
        const savedData = yield cart_model_1.default.create(Object.assign(Object.assign({}, body), { quantity: 1 }));
        res.status(201).json({
            success: true,
            alreadyExist: false,
            message: "An item added to cart successfully",
            data: savedData,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
        });
    }
}));
exports.cartRoute.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartProducts = yield cart_model_1.default.find().sort({ createdAt: -1 });
        res.status(201).json({
            success: true,
            message: "All cart data are fetched successfully",
            data: cartProducts,
            count: cartProducts.length,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
        });
    }
}));
exports.cartRoute.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id.trim();
        console.log(mongoose_1.default.Types.ObjectId.isValid(id));
        const cartProduct = yield cart_model_1.default.findById(id);
        console.log(cartProduct);
        res.status(200).json({
            success: true,
            message: "Cart data are fetched successfully",
            data: cartProduct,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
        });
    }
}));
exports.cartRoute.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const deleteData = yield cart_model_1.default.findByIdAndDelete(id);
        res.status(201).json({
            success: true,
            message: "Item deleted successfully",
            data: deleteData,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
        });
    }
}));
exports.cartRoute.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteData = yield cart_model_1.default.deleteMany({});
        res.status(201).json({
            success: true,
            message: "All items deleted successfully",
            data: deleteData,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
        });
    }
}));
exports.cartRoute.patch("/:id/quantity", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { action, productId } = req.body; // "increment" | "decrement"
        const delta = action === "increment" ? 1 : -1;
        const updatedData = yield cart_model_1.default.findOneAndUpdate({ productId }, { $inc: { quantity: delta } }, { new: true });
        console.log(updatedData);
        if (!updatedData)
            return res
                .status(404)
                .json({ success: false, message: "Cart item not found" });
        // auto-delete if quantity drops to 0
        if (updatedData.quantity <= 0) {
            yield cart_model_1.default.findOneAndDelete(productId);
            return res.status(200).json({ success: true, data: null, deleted: true, cartItemId: updatedData._id });
        }
        res.status(201).json({
            success: true,
            message: "Item updated successfully",
            data: updatedData,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
        });
    }
}));
//# sourceMappingURL=cart.controller.js.map