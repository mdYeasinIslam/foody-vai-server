"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const orderHandler_1 = __importDefault(require("./order/orderHandler"));
const handleSocket = (server) => {
    const io = new socket_io_1.Server(server, { cors: { origin: "*", methods: ["GET", "POST"] } });
    io.on("connection", (socket) => {
        console.log(`socket connected ${socket.id}`);
        socket.emit("connected", {
            success: true,
            message: "Welcome to FoodyVai",
        });
        (0, orderHandler_1.default)(io, socket);
    });
};
exports.default = handleSocket;
//# sourceMappingURL=socket.js.map