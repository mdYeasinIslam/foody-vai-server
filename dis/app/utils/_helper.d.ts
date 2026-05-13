export declare const validator: (data: any) => {
    isValid: boolean;
    message: string;
};
export declare const generateId: () => string;
export declare const calculateTotal: (items: any[]) => {
    subTotal: any;
    tax: number;
    delivery: number;
    totalAmount: any;
};
export declare const createOrderDocument: (orderData: any, orderId: string, totals: any) => {
    customerPhone: any;
    customerAddress: any;
    items: any;
    subtotal: any;
    tax: any;
    deliveryFee: any;
    totalAmount: any;
    specialNotes: any;
    paymentMethod: any;
    paymentStatus: string;
    status: string;
    statusHistory: {
        status: string;
        timestamp: Date;
        by: string;
        note: string;
    }[];
    estimatedTime: null;
    createdAt: Date;
    updatedAt: Date;
};
export declare const isValidStatusTransition: (currentStatus: string, newStatus: string) => boolean;
//# sourceMappingURL=_helper.d.ts.map