import express from "express";
import type { Request, Response } from "express";
import cors from "cors";

const app = express();
//middle Ware
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello TS Server");
});

export default app;
