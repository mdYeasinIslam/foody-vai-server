import express from "express";
import type { Request, Response } from "express";

const app = express();
app.use(express.json())
app.get("/", (req: Request, res: Response) => {
  res.send("Hello TS Server");
});

// app.listen(5000, () => console.log("Server running"));
export default app