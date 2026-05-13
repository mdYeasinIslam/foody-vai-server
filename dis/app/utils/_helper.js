"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidStatusTransition = exports.createOrderDocument = exports.calculateTotal = exports.generateId = exports.validator = void 0;
const validator = (data) => {
    if (!Array.isArray(data.items)) {
        return { isValid: false, message: "Items must be an array" };
    }
    return { isValid: true, message: "" };
};
exports.validator = validator;
//generate Id
const generateId = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const random = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0");
    return `ORD-${year}${month}${day}-${random}`;
};
exports.generateId = generateId;
//calculate total amount
const calculateTotal = (items) => {
    const subTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subTotal * 0.10;
    const delivery = 50;
    const total = subTotal + tax + delivery;
    return {
        subTotal,
        tax,
        delivery,
        totalAmount: total,
    };
};
exports.calculateTotal = calculateTotal;
// create order document
const createOrderDocument = (orderData, orderId, totals) => {
    var _a, _b;
    return {
        customerPhone: (_a = orderData.customerPhone) === null || _a === void 0 ? void 0 : _a.trim(),
        customerAddress: (_b = orderData.customerAddress) === null || _b === void 0 ? void 0 : _b.trim(),
        items: orderData.items,
        subtotal: totals.subTotal,
        tax: totals.tax,
        deliveryFee: totals.delivery,
        totalAmount: totals.totalAmount,
        specialNotes: orderData.specialNotes || '',
        paymentMethod: orderData.paymentMethod || 'cash',
        paymentStatus: 'pending',
        status: 'pending',
        statusHistory: [{
                status: 'pending',
                timestamp: new Date(),
                by: 'customer',
                note: 'Order placed'
            }],
        estimatedTime: null,
        createdAt: new Date(),
        updatedAt: new Date()
    };
};
exports.createOrderDocument = createOrderDocument;
const isValidStatusTransition = (currentStatus, newStatus) => {
    var _a;
    const statusTransitions = {
        pending: ["confirmed", "cancelled"],
        confirmed: ["preparing", "cancelled"],
        preparing: ["ready", "cancelled"],
        ready: ["out_for_delivery", "cancelled"],
        out_for_delivery: ["delivered"],
        delivered: [],
        cancelled: [],
    };
    return ((_a = statusTransitions[currentStatus]) === null || _a === void 0 ? void 0 : _a.includes(newStatus)) || false;
};
exports.isValidStatusTransition = isValidStatusTransition;
//# sourceMappingURL=_helper.js.map