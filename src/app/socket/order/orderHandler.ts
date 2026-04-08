import Order from "../../models/orders/order.model";
import {
  calculateTotal,
  createOrderDocument,
  generateId,
  isValidStatusTransition,
  validator,
} from "../../utils/_helper";

const orderHandler = (io: any, socket: any) => {
  //place order
  socket.on("placeOrder", async (data: any, callback: any) => {
    try {
      console.log("place order id", socket.id);
      const validate = validator(data);

      if (!validate.isValid) {
        callback({ success: false, message: validate.message });
      }
      const total = calculateTotal(data?.items);
      const orderId = generateId();
      const orderData = createOrderDocument(data, orderId, total);

      const newOrder = await Order.create(orderData);

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
        socket.join("admins");
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
        return callback({ success: false, message: "Order not found" })
      }
      if (!isValidStatusTransition(order.status, data.newStatus)) {
        return callback({ success: false, message: "Invalid status transition" })
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
        updateOrder, status: data.newStatus
      });
      socket.io('admin').emit('orderStatusChanged', { orderId: data.orderId, status: data.newStatus })
      callback({ success: true, message: "Order status updated successfully", result:updateOrder})
    } catch (error) {
      console.log(error)
      callback({success:false,message:"Something went wrong",error:error})
    }
  })
};
export default orderHandler;
