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
exports.productRoute = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = __importDefault(require("zod"));
const product_model_1 = __importDefault(require("./product.model"));
exports.productRoute = express_1.default.Router();
const zodCheck = zod_1.default.object({
    name: zod_1.default.string(),
    description: zod_1.default.string().nullable(),
    prices: zod_1.default.array(zod_1.default.object({
        weight: zod_1.default.number(),
        price: zod_1.default.number(),
        originalPrice: zod_1.default.number(),
        weightName: zod_1.default.string(),
        currency: zod_1.default.string()
    })),
    category: zod_1.default.string(),
    subCategory: zod_1.default.string().nullable(),
    img: zod_1.default.string(),
});
exports.productRoute.post("/add-product", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = zodCheck.parse(req.body);
        const saveData = yield product_model_1.default.create(body);
        res.status(201).json({
            success: true,
            message: "",
            data: saveData,
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
exports.productRoute.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.default.find();
        res.status(201).json({
            success: true,
            message: "",
            data: products,
            count: products.length,
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
//# sourceMappingURL=product.controller.js.map