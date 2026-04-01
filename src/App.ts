import express from "express";
import type { Request, Response } from "express";
import { Server } from "socket.io";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello TS Server");
});



export default app;
