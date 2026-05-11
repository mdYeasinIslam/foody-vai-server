import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import { addressRoute } from "./app/models/customer-addresses/address.controller";
import { productRoute } from "./app/models/products/product.controller";
import { cartRoute } from "./app/models/cart/cart.controller";

const app = express();
//middle Ware
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

app.use("/customer-address", addressRoute);
app.use('/products', productRoute)
app.use('/cart',cartRoute)
app.get("/", (req: Request, res: Response) => {
  res.send("Hello TS Server");
});

export default app;
