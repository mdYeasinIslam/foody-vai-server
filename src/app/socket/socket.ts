import { Server } from "socket.io";
import orderHandler from "./order/orderHandler";
import { calculateTotal, generateId } from "../utils/_helper";

const handleSocket = (server: any) => {
  const io = new Server(server, { cors: { origin: "*", methods: ["GET", "POST"] } });
  
  io.on("connection", (socket) => {
    console.log(`socket connected ${socket.id}`);
    socket.emit("connected", {
      success: true,
      message: "Socket connected successfully",
    });
    orderHandler(io, socket);
  });
};

export default handleSocket;
