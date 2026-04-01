import { Server } from "socket.io";
import orderHandler from "./order/orderHandler";

const handleSocket = (server: any) => {
  const io = new Server(server,{cors:{origin:"*",methods:["GET","POST"]}});
  io.on("connection successfully", (socket) => {
      console.log(`socket connected ${socket.id}`);
      
      // Order handler : place order
      orderHandler(io,socket)
  });
};

export default handleSocket;
