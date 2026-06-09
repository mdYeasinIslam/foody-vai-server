import { Server } from "socket.io";
import orderHandler from "./order/orderHandler";

const handleSocket = (server: any) => {
  const io = new Server(server, { cors: { origin: "*", methods: ["GET", "POST","PUT","DELETE","PATCH"] } });
  
  io.on("connection", (socket) => {
    console.log(`socket connected ${socket.id}`);
    socket.emit("connected", {
      success: true,
      message: "Welcome to FoodyVai",
    });
    orderHandler(io, socket);
  });
};

export default handleSocket;
