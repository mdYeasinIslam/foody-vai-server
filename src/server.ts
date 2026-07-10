require("dotenv").config({ override: false });
import http from "http";
import app from "./App";
import connectDB from "./app/config/database";
import handleSocket from "./app/socket/socket";

let server = http.createServer(app);
const PORT = process.env.PORT || 8080;
handleSocket(server);

async function main() {
  await connectDB();
  server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

main().catch((err) => {
  console.error("Error starting server:", err);
});
