"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const address_controller_1 = require("./app/models/customer-addresses/address.controller");
const product_controller_1 = require("./app/models/products/product.controller");
const cart_controller_1 = require("./app/models/cart/cart.controller");
const app = (0, express_1.default)();
//middle Ware
//Must remove "/" from your production URL
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "https://foodyvai.vercel.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/customer-address", address_controller_1.addressRoute);
app.use("/products", product_controller_1.productRoute);
app.use("/cart", cart_controller_1.cartRoute);
app.get("/", (req, res) => {
    res.send("Hello TS Server");
});
exports.default = app;
//# sourceMappingURL=App.js.map