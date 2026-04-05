import http from "http";
import app from "./App";
import mongoose from "mongoose";
import dotenv from "dotenv";
import handleSocket from "./app/socket/socket";
import connectDB from "./app/config/database";
dotenv.config();
let server = http.createServer(app);
const PORT = 5000;

handleSocket(server);

async function main() {
  await connectDB();
  server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

main().catch((err) => {
  console.error("Error starting server:", err);
});
