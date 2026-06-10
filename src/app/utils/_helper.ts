import { IOrderCreate, ITotals, OrderInfo, Product } from "./interface";

export const validator = (data: any) => {
  if (!Array.isArray(data?.items)) {
    return { isValid: false, message: "Items must be an array" };
  }

  return { isValid: true, message: "" };
};

//generate Id
export const generateId = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");

  return `ORD-${year}${month}${day}-${random}`;
};

//calculate total amount
export const calculateTotal = (items: Product[]) => {
  const subTotal = items?.reduce(
    (acc, item) => acc + item.price.price * item.quantity,
    0,
  );
  const tax = (subTotal * 0.1).toFixed(2);
  const delivery = 50;
  const total = subTotal + tax + delivery;

  return {
    subTotal,
    tax,
    delivery,
    totalAmount: total,
  };
};

// create order document
export const createOrderDocument = (
  orderData: IOrderCreate,
  orderId: string,
  totals: ITotals,
) => {
  return {
    customerName: orderData?.customerName?.trim(),
    orderId: orderId,
    customerPhone: orderData?.customerPhone?.trim(),
    customerAddress: orderData.customerAddress?.trim(),
    items: orderData.items, //need to update
    subtotal: totals.subTotal,
    tax: totals.tax,
    deliveryFee: totals.deliveryFee,
    totalAmount: totals.totalAmount,
    specialNote: orderData.specialNote || "",
    paymentMethod: orderData.paymentMethod || "cod",
    paymentStatus: "pending",
    status: "pending",
    statusHistory: [
      {
        status: "pending",
        timestamp: new Date(),
        by: "customer",
        note: "Order placed",
      },
    ],
    estimatedTime: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

export const isValidStatusTransition = (
  currentStatus: string,
  newStatus: string,
) => {
  const statusTransitions: { [key: string]: string[] } = {
    pending: ["confirmed", "cancelled"],
    confirmed: ["preparing", "cancelled"],
    preparing: ["ready", "cancelled"],
    ready: ["out_for_delivery", "cancelled"],
    out_for_delivery: ["delivered"],
    delivered: [],
    cancelled: [],
  };

  return statusTransitions[currentStatus]?.includes(newStatus) || false;
};
