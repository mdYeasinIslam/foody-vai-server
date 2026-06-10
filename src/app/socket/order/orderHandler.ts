import Order from "../../models/orders/order.model";
import {
  createOrderDocument,
  generateId,
  isValidStatusTransition,
  validator,
} from "../../utils/_helper";

const orderHandler = (io: any, socket: any) => {
  //place order
  socket.on("placeOrder", async (data: any, callback: any) => {
    try {
      // console.log("place order id", data?.data);
      const validate = validator(data?.data);

      if (!validate.isValid) {
        callback({ success: false, message: validate.message });
      }
      // const totals = calculateTotal(data?.data?.items);
      const orderId = generateId();
      const orderData = createOrderDocument(
        data?.data,
        orderId,
        data?.data?.totals,
      );
      const newOrder = await Order.create(orderData);

      // console.log("order id", orderData);
      socket.join(`order-${orderId}`);
      socket.join("customers");

      io.to("admin").emit("newOrder", newOrder);

      callback({
        success: true,
        message: "Order placed successfully",
        orderData: newOrder,
      });
    } catch (error) {
      console.log(error);
      callback({
        success: false,
        message: "Something went wrong",
        error: error,
      });
    }
  });

  // track order
  socket.on("trackOder", async (data: any, callback: any) => {
    try {
      const order = await Order.findOne({ orderId: data?.orderId });
      if (!order) {
        return callback({ success: false, message: "Order not found" });
      }
      socket.join(`order-${data?.orderId}`);
      callback({ success: true, message: "Order tracked successfully", order });
    } catch (error) {
      console.log(error);

      callback({
        success: false,
        message: "Something went wrong",
        error: error,
      });
    }
  });

  // cancel order
  socket.on("cancelOrder", async (data: any, callback: any) => {
    try {
      const order = await Order.findOne({ orderId: data?.orderId });
      if (!order) {
        return callback({ success: false, message: "Order not found" });
      }
      if (!["pending", "confirmed"]?.includes(order?.status || "")) {
        return callback({
          success: false,
          message: "Order cannot be cancelled",
        });
      }

      await Order.updateOne(
        { orderId: data?.orderId },
        {
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
        },
      );
      io.to(`order-${data?.orderId}`).emit("orderCancelled", {
        orderId: data.orderId,
      });
      io.to("admin").emit("orderCancelled", { orderId: data.orderId });
      callback({ success: true, message: "Order cancelled successfully" });
    } catch (error) {
      console.log(error);
      callback({
        success: false,
        message: "Something went wrong",
        error: error,
      });
    }
  });

  //get my order
  socket.on("getMyOrder", async (data: any, callback: any) => {
    try {
      const orders = await Order.find({ customerPhone: data?.customerPhone })
        .sort({ createdAt: -1 })
        .limit(20);

      if (orders.length <= 0) {
        callback({ success: false, message: "Order not found" });
      }

      callback({ success: true, message: "Order found successfully", orders });
    } catch (error) {
      console.log(error);

      callback({
        success: false,
        message: "Something went wrong",
        error: error,
      });
    }
  });

  //admin login
  socket.on("adminLogin", async (data: any, callback: any) => {
    try {
      if (data.password === process.env.ADMIN_PASSWORD) {
        socket.isAdmin = true;
        socket.join("admin");
        callback({ success: true, message: "Login successful" });
      } else {
        callback({ success: false, message: "Invalid password" });
      }
    } catch (error) {
      console.log(error);

      callback({
        success: true,
        message: "Something went wrong",
        error: error,
      });
    }
  });

  //get all order for admin
  socket.on("getAllOrders", async (data: any, callback: any) => {
    try {
      if (!socket.isAdmin) {
        return callback({ success: false, message: "Unauthorized" });
      }
      const filter = data?.status ? { status: data?.status } : {};
      const getAllOrders = await Order.find(filter)
        .sort({ createdAt: -1 })
        .limit(20);
      callback({
        success: true,
        message: "Orders fetched successfully",
        orders: getAllOrders,
      });
    } catch (error) {
      console.log(error);
      callback({
        success: false,
        message: "Something went wrong",
        error: error,
      });
    }
  });

  //update order status
  socket.on("updateOrderStatus", async (data: any, callback: any) => {
    try {
      const order = await Order.findOne({ orderId: data?.orderId });
      if (!order) {
        return callback({ success: false, message: "Order not found" });
      }
      if (!isValidStatusTransition(order.status, data.newStatus)) {
        return callback({
          success: false,
          message: "Invalid status transition",
        });
      }

      const updateOrder = await Order.updateOne(
        { orderId: data?.orderId },
        {
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
        },
      );
      io.to(`order-${data?.orderId}`).emit("statusUpdated", {
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
    } catch (error) {
      console.log(error);
      callback({
        success: false,
        message: "Something went wrong",
        error: error,
      });
    }
  });

  //accept order
  socket.on("acceptOrder", async (data: any, callback: any) => {
    try {
      if (!socket.isAdmin) {
        return callback({ success: false, message: "Unauthorized" });
      }
      const order = await Order.findOne({ orderId: data.orderId });

      if (!order || order.status !== "pending") {
        return callback({
          success: false,
          message: "Can't accept this order",
        });
      }
      const estimatedTime = data.estimatedTime || 30;
      const result = await Order.updateOne(
        { orderId: data.orderId },
        {
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
        },
      );
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
    } catch (error) {
      console.log(error);
      callback({
        success: false,
        message: "Something went wrong",
        error: error,
      });
    }
  });

  //reject order
  socket.on("rejectOrder", async (data: any, callback: any) => {
    try {
      if (!socket.isAdmin) {
        return callback({ success: false, message: "Unauthorized" });
      }
      const order = await Order.findOne({ orderId: data.orderId });
      if (!order || order.status !== "pending") {
        return callback({
          success: false,
          message: "Can't reject this order",
        });
      }
      const result = await Order.updateOne(
        { orderId: data.orderId },
        {
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
        },
      );
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
    } catch (error) {
      console.log(error);
      callback({
        success: false,
        message: "Something went wrong",
        error: error,
      });
    }
  });

  //get live stats
  socket.on("getLiveStats", async (data: any, callback: any) => {
    try {
      if (!socket.isAdmin) {
        return callback({
          success: false,
          message: "Unauthorized",
        });
      }
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const stats = {
        totalOrder: await Order.countDocuments({ createdAt: { $gte: today } }),
        pendingOrder: await Order.countDocuments({
          status: "pending",
          createdAt: { $gte: today },
        }),
        confirmedOrder: await Order.countDocuments({
          status: "confirmed",
          createdAt: { $gte: today },
        }),
        cancelledOrder: await Order.countDocuments({
          status: "cancelled",
          createdAt: { $gte: today },
        }),
        preparingOrder: await Order.countDocuments({
          status: "preparing",
          createdAt: { $gte: today },
        }),
        readyOrder: await Order.countDocuments({
          status: "ready",
          createdAt: { $gte: today },
        }),
        deliveredOrder: await Order.countDocuments({
          status: "delivered",
          createdAt: { $gte: today },
        }),
        out_for_delivery: await Order.countDocuments({
          status: "out_for_delivery",
          createdAt: { $gte: today },
        }),
      };
      callback({
        success: true,
        message: "Stats fetched successfully",
        stats,
      });
    } catch (error) {
      console.error(error);
      callback({
        success: false,
        message: "Something went wrong",
        error: error,
      });
    }
  });

  //disconnect
  socket.on("disconnect", () => {
    console.log(`socket disconnected ${socket.id}`);
    if (socket.isAdmin) {
      socket.to("admin").emit("adminDisconnected", { adminId: socket.id });
    }
  });
};
export default orderHandler;
