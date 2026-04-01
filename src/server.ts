import { Server } from "http";
import app from "./App";
import mongoose from "mongoose";
let server: Server;
const PORT = 5000;
async function main() {
  await mongoose.connect(
    "mongodb+srv://Level-2-backend-practice:Level-2-backend-practice@cluster0.bfv30pl.mongodb.net/mongoose-practice?retryWrites=true&w=majority&appName=Cluster0",
  );
  console.log("mongodb is connected by mongosse");
  server = app.listen(PORT, () =>
    console.log(`Server is running on port ${PORT}`),
  );
}

main().catch((err) => {
  console.error("Error starting server:", err);
});
