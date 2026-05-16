import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import { addressRoute } from "./app/models/customer-addresses/address.controller";
import { productRoute } from "./app/models/products/product.controller";
import { cartRoute } from "./app/models/cart/cart.controller";
import { authRoute } from "./app/models/auth/auth.controller";

const app = express();
//middle Ware
//Must remove "/" from your production URL
app.use(
  cors({
    origin: ["http://localhost:3000", "https://foodyvai.vercel.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());

app.use("/customer-address", addressRoute);
app.use("/products", productRoute);
app.use("/cart", cartRoute);
app.use("/auth", authRoute);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello TS Server");
});

export default app;
