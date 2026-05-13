"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_model_1 = __importDefault(require("../../models/orders/order.model"));
const _helper_1 = require("../../utils/_helper");
const orderHandler = (io, socket) => {
    //place order
    socket.on("placeOrder", (data, callback) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("place order id", socket.id);
            const validate = (0, _helper_1.validator)(data);
            if (!validate.isValid) {
                callback({ success: false, message: validate.message });
            }
            const total = (0, _helper_1.calculateTotal)(data === null || data === void 0 ? void 0 : data.items);
            const orderId = (0, _helper_1.generateId)();
            const orderData = (0, _helper_1.createOrderDocument)(data, orderId, total);
            const newOrder = yield order_model_1.default.create(orderData);
            socket.join(`order-${orderId}`);
            socket.join("customers");
            io.to("admin").emit("newOrder", newOrder);
            callback({
                success: true,
                message: "Order placed successfully",
                orderData: newOrder,
            });
        }
        catch (error) {
            console.log(error);
            callback({
                success: false,
                message: "Something went wrong",
                error: error,
            });
        }
    }));
    // track order
    socket.on("trackOder", (data, callback) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const order = yield order_model_1.default.findOne({ orderId: data === null || data === void 0 ? void 0 : data.orderId });
            if (!order) {
                return callback({ success: false, message: "Order not found" });
            }
            socket.join(`order-${data === null || data === void 0 ? void 0 : data.orderId}`);
            callback({ success: true, message: "Order tracked successfully", order });
        }
        catch (error) {
            console.log(error);
            callback({
                success: false,
                message: "Something went wrong",
                error: error,
            });
        }
    }));
    // cancel order
    socket.on("cancelOrder", (data, callback) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const order = yield order_model_1.default.findOne({ orderId: data === null || data === void 0 ? void 0 : data.orderId });
            if (!order) {
                return callback({ success: false, message: "Order not found" });
            }
            if (!((_a = ["pending", "confirmed"]) === null || _a === void 0 ? void 0 : _a.includes((order === null || order === void 0 ? void 0 : order.status) || ""))) {
                return callback({
                    success: false,
                    message: "Order cannot be cancelled",
                });
            }
            yield order_model_1.default.updateOne({ orderId: data === null || data === void 0 ? void 0 : data.orderId }, {
                $set: {
                    status: "cancelled",
                    updatedAt: new Date(),
                },
                $push: {
                    statusHistory: {
                        status: "cancelled",
                        timestamp: new Date(),
                        by: socket.id,
                        note: data.reason || "Order cancelled by customer",
                    },
                },
            });
            io.to(`order-${data === null || data === void 0 ? void 0 : data.orderId}`).emit("orderCancelled", {
                orderId: data.orderId,
            });
            io.to("admin").emit("orderCancelled", { orderId: data.orderId });
            callback({ success: true, message: "Order cancelled successfully" });
        }
        catch (error) {
            console.log(error);
            callback({
                success: false,
                message: "Something went wrong",
                error: error,
            });
        }
    }));
    //get my order
    socket.on("getMyOrder", (data, callback) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const orders = yield order_model_1.default.find({ customerPhone: data === null || data === void 0 ? void 0 : data.customerPhone })
                .sort({ createdAt: -1 })
                .limit(20);
            if (orders.length <= 0) {
                callback({ success: false, message: "Order not found" });
            }
            callback({ success: true, message: "Order found successfully", orders });
        }
        catch (error) {
            console.log(error);
            callback({
                success: false,
                message: "Something went wrong",
                error: error,
            });
        }
    }));
    //admin login
    socket.on("adminLogin", (data, callback) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (data.password === process.env.ADMIN_PASSWORD) {
                socket.isAdmin = true;
                socket.join("admin");
                callback({ success: true, message: "Login successful" });
            }
            else {
                callback({ success: false, message: "Invalid password" });
            }
        }
        catch (error) {
            console.log(error);
            callback({
                success: true,
                message: "Something went wrong",
                error: error,
            });
        }
    }));
    //get all order for admin
    socket.on("getAllOrders", (data, callback) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!socket.isAdmin) {
                return callback({ success: false, message: "Unauthorized" });
            }
            const filter = (data === null || data === void 0 ? void 0 : data.status) ? { status: data === null || data === void 0 ? void 0 : data.status } : {};
            const getAllOrders = yield order_model_1.default.find(filter)
                .sort({ createdAt: -1 })
                .limit(20);
            callback({
                success: true,
                message: "Orders fetched successfully",
                orders: getAllOrders,
            });
        }
        catch (error) {
            console.log(error);
            callback({
                success: false,
                message: "Something went wrong",
                error: error,
            });
        }
    }));
    //update order status
    socket.on("updateOrderStatus", (data, callback) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const order = yield order_model_1.default.findOne({ orderId: data === null || data === void 0 ? void 0 : data.orderId });
            if (!order) {
                return callback({ success: false, message: "Order not found" });
            }
            if (!(0, _helper_1.isValidStatusTransition)(order.status, data.newStatus)) {
                return callback({
                    success: false,
                    message: "Invalid status transition",
                });
            }
            const updateOrder = yield order_model_1.default.updateOne({ orderId: data === null || data === void 0 ? void 0 : data.orderId }, {
                $set: {
                    status: data.newStatus,
                    updatedAt: new Date(),
                },
                $push: {
                    statusHistory: {
                        status: data.newStatus,
                        timestamp: new Date(),
                        by: socket.id,
                        note: data.note || "Order status updated by admin",
                    },
                },
            });
            io.to(`order-${data === null || data === void 0 ? void 0 : data.orderId}`).emit("statusUpdated", {
                orderId: data.orderId,
                updateOrder,
                status: data.newStatus,
            });
            socket.io("admin").emit("orderStatusChanged", {
                orderId: data.orderId,
                status: data.newStatus,
            });
            callback({
                success: true,
                message: "Order status updated successfully",
                result: updateOrder,
            });
        }
        catch (error) {
            console.log(error);
            callback({
                success: false,
                message: "Something went wrong",
                error: error,
            });
        }
    }));
    //accept order
    socket.on("acceptOrder", (data, callback) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!socket.isAdmin) {
                return callback({ success: false, message: "Unauthorized" });
            }
            const order = yield order_model_1.default.findOne({ orderId: data.orderId });
            if (!order || order.status !== "pending") {
                return callback({
                    success: false,
                    message: "Can't accept this order",
                });
            }
            const estimatedTime = data.estimatedTime || 30;
            const result = yield order_model_1.default.updateOne({ orderId: data.orderId }, {
                $set: {
                    status: "confirmed",
                    estimatedTime,
                    updatedAt: new Date(),
                },
                $push: {
                    statusHistory: {
                        status: "confirmed",
                        Timestamp: new Date(),
                        by: socket.id,
                        note: `Order confirmed by admin with estimated time of ${estimatedTime} minutes`,
                    },
                },
            });
            io.to(`order-${data.orderId}`).emit("orderConfirmed", {
                orderId: data.orderId,
                estimatedTime,
            });
            socket
                .to("admin")
                .emit("orderConfirmedByAdmin", { orderId: data.orderId });
            callback({
                success: true,
                message: "Order confirmed successfully",
                result,
            });
        }
        catch (error) {
            console.log(error);
            callback({
                success: false,
                message: "Something went wrong",
                error: error,
            });
        }
    }));
    //reject order
    socket.on("rejectOrder", (data, callback) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!socket.isAdmin) {
                return callback({ success: false, message: "Unauthorized" });
            }
            const order = yield order_model_1.default.findOne({ orderId: data.orderId });
            if (!order || order.status !== "pending") {
                return callback({
                    success: false,
                    message: "Can't reject this order",
                });
            }
            const result = yield order_model_1.default.updateOne({ orderId: data.orderId }, {
                $set: {
                    status: "rejected",
                    updatedAt: new Date(),
                },
                $push: {
                    statusHistory: {
                        status: "rejected",
                        timestamp: new Date(),
                        by: socket.id,
                        note: data.reason || "Order rejected by admin",
                    },
                },
            });
            io.to(`order-${data.orderId}`).emit("orderRejected", {
                orderId: data.orderId,
            });
            socket
                .to("admin")
                .emit("orderRejectedByAdmin", { orderId: data.orderId });
            callback({
                success: true,
                message: "Order rejected successfully",
                result,
            });
        }
        catch (error) {
            console.log(error);
            callback({
                success: false,
                message: "Something went wrong",
                error: error,
            });
        }
    }));
    //get live stats
    socket.on('getLiveStats', (data, callback) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!socket.isAdmin) {
                return callback({
                    success: false,
                    message: 'Unauthorized',
                });
            }
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const stats = {
                totalOrder: yield order_model_1.default.countDocuments({ createdAt: { $gte: today } }),
                pendingOrder: yield order_model_1.default.countDocuments({
                    status: "pending",
                    createdAt: { $gte: today },
                }),
                confirmedOrder: yield order_model_1.default.countDocuments({
                    status: "confirmed",
                    createdAt: { $gte: today },
                }),
                cancelledOrder: yield order_model_1.default.countDocuments({
                    status: "cancelled",
                    createdAt: { $gte: today },
                }),
                preparingOrder: yield order_model_1.default.countDocuments({
                    status: "preparing",
                    createdAt: { $gte: today },
                }),
                readyOrder: yield order_model_1.default.countDocuments({
                    status: "ready",
                    createdAt: { $gte: today },
                }),
                deliveredOrder: yield order_model_1.default.countDocuments({
                    status: "delivered",
                    createdAt: { $gte: today },
                }),
                out_for_delivery: yield order_model_1.default.countDocuments({
                    status: "out_for_delivery",
                    createdAt: { $gte: today },
                }),
            };
            callback({
                success: true,
                message: 'Stats fetched successfully',
                stats
            });
        }
        catch (error) {
            console.error(error);
            callback({
                success: false,
                message: 'Something went wrong',
                error: error
            });
        }
    }));
    //disconnect
    socket.on('disconnect', () => {
        console.log(`socket disconnected ${socket.id}`);
        if (socket.isAdmin) {
            socket.to('admin').emit('adminDisconnected', { adminId: socket.id });
        }
    });
};
exports.default = orderHandler;
//# sourceMappingURL=orderHandler.js.map