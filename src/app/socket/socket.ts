import { createServer, Server } from "node:http";
import app from "../../App";

const handleSocket = (server: any) => {
  const io = new Server(server);
  io.on("connection successfully", (socket) => {
    console.log(`socket connected ${socket.id}`);
  });
};

export default handleSocket;
