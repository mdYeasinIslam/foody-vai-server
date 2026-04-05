import { Server } from "socket.io";
import orderHandler from "./order/orderHandler";
import { generateId } from "../utils/_helper";

const handleSocket = (server: any) => {
  const io = new Server(server, { cors: { origin: "*", methods: ["GET", "POST"] } });
  
  io.on("connection", (socket) => {
      console.log(`socket connected ${socket.id}`);
      socket.emit('connection',{success:true,message:"Socket connected successfully"})
    // Order handler : place order
       generateId();
       console.log(generateId());
      orderHandler(io,socket)
  });
};

export default handleSocket;
