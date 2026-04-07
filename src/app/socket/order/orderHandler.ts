import Order from "../../models/orders/order.model";
import {
  calculateTotal,
  createOrderDocument,
  generateId,
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
        callback({ success: false, message: "Order not found" });
      }
      if (!["pending", "confirmed"]?.includes(order?.status || "")) {
        callback({ success: false, message: "Order cannot be cancelled" });
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
      callback({
        success: false,
        message: "Something went wrong",
        error: error,
      });
    }
  });
};
export default orderHandler;
