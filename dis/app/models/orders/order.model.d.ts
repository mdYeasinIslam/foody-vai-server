import mongoose from "mongoose";
declare const Order: mongoose.Model<{
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    items: any[];
    subtotal: number;
    tax: number;
    deliveryFee: number;
    totalAmount: number;
    specialNotes: string;
    paymentMethod: "cash" | "card" | "online";
    paymentStatus: "pending" | "completed" | "failed";
    status: "pending" | "confirmed" | "preparing" | "ready" | "delivered";
    statusHistory: mongoose.Types.DocumentArray<{
        status?: string | null;
        timestamp?: NativeDate | null;
        by?: string | null;
        note?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        status?: string | null;
        timestamp?: NativeDate | null;
        by?: string | null;
        note?: string | null;
    }, {}, {}> & {
        status?: string | null;
        timestamp?: NativeDate | null;
        by?: string | null;
        note?: string | null;
    }>;
    estimatedTime?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    items: any[];
    subtotal: number;
    tax: number;
    deliveryFee: number;
    totalAmount: number;
    specialNotes: string;
    paymentMethod: "cash" | "card" | "online";
    paymentStatus: "pending" | "completed" | "failed";
    status: "pending" | "confirmed" | "preparing" | "ready" | "delivered";
    statusHistory: mongoose.Types.DocumentArray<{
        status?: string | null;
        timestamp?: NativeDate | null;
        by?: string | null;
        note?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        status?: string | null;
        timestamp?: NativeDate | null;
        by?: string | null;
        note?: string | null;
    }, {}, {}> & {
        status?: string | null;
        timestamp?: NativeDate | null;
        by?: string | null;
        note?: string | null;
    }>;
    estimatedTime?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    versionKey: false;
    timestamps: true;
}> & Omit<{
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    items: any[];
    subtotal: number;
    tax: number;
    deliveryFee: number;
    totalAmount: number;
    specialNotes: string;
    paymentMethod: "cash" | "card" | "online";
    paymentStatus: "pending" | "completed" | "failed";
    status: "pending" | "confirmed" | "preparing" | "ready" | "delivered";
    statusHistory: mongoose.Types.DocumentArray<{
        status?: string | null;
        timestamp?: NativeDate | null;
        by?: string | null;
        note?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        status?: string | null;
        timestamp?: NativeDate | null;
        by?: string | null;
        note?: string | null;
    }, {}, {}> & {
        status?: string | null;
        timestamp?: NativeDate | null;
        by?: string | null;
        note?: string | null;
    }>;
    estimatedTime?: NativeDate | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    versionKey: false;
    timestamps: true;
}, {
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    items: any[];
    subtotal: number;
    tax: number;
    deliveryFee: number;
    totalAmount: number;
    specialNotes: string;
    paymentMethod: "cash" | "card" | "online";
    paymentStatus: "pending" | "completed" | "failed";
    status: "pending" | "confirmed" | "preparing" | "ready" | "delivered";
    statusHistory: mongoose.Types.DocumentArray<{
        status?: string | null;
        timestamp?: NativeDate | null;
        by?: string | null;
        note?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        status?: string | null;
        timestamp?: NativeDate | null;
        by?: string | null;
        note?: string | null;
    }, {}, {}> & {
        status?: string | null;
        timestamp?: NativeDate | null;
        by?: string | null;
        note?: string | null;
    }>;
    estimatedTime?: NativeDate | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    items: any[];
    subtotal: number;
    tax: number;
    deliveryFee: number;
    totalAmount: number;
    specialNotes: string;
    paymentMethod: "cash" | "card" | "online";
    paymentStatus: "pending" | "completed" | "failed";
    status: "pending" | "confirmed" | "preparing" | "ready" | "delivered";
    statusHistory: mongoose.Types.DocumentArray<{
        status?: string | null;
        timestamp?: NativeDate | null;
        by?: string | null;
        note?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        status?: string | null;
        timestamp?: NativeDate | null;
        by?: string | null;
        note?: string | null;
    }, {}, {}> & {
        status?: string | null;
        timestamp?: NativeDate | null;
        by?: string | null;
        note?: string | null;
    }>;
    estimatedTime?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps" | "versionKey"> & {
    versionKey: false;
    timestamps: true;
}> & Omit<{
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    items: any[];
    subtotal: number;
    tax: number;
    deliveryFee: number;
    totalAmount: number;
    specialNotes: string;
    paymentMethod: "cash" | "card" | "online";
    paymentStatus: "pending" | "completed" | "failed";
    status: "pending" | "confirmed" | "preparing" | "ready" | "delivered";
    statusHistory: mongoose.Types.DocumentArray<{
        status?: string | null;
        timestamp?: NativeDate | null;
        by?: string | null;
        note?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        status?: string | null;
        timestamp?: NativeDate | null;
        by?: string | null;
        note?: string | null;
    }, {}, {}> & {
        status?: string | null;
        timestamp?: NativeDate | null;
        by?: string | null;
        note?: string | null;
    }>;
    estimatedTime?: NativeDate | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
}, "id"> & {
    id: string;
}, unknown, {
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    items: any[];
    subtotal: number;
    tax: number;
    deliveryFee: number;
    totalAmount: number;
    specialNotes: string;
    paymentMethod: "cash" | "card" | "online";
    paymentStatus: "pending" | "completed" | "failed";
    status: "pending" | "confirmed" | "preparing" | "ready" | "delivered";
    statusHistory: mongoose.Types.DocumentArray<{
        status?: string | null;
        timestamp?: NativeDate | null;
        by?: string | null;
        note?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        status?: string | null;
        timestamp?: NativeDate | null;
        by?: string | null;
        note?: string | null;
    }, {}, {}> & {
        status?: string | null;
        timestamp?: NativeDate | null;
        by?: string | null;
        note?: string | null;
    }>;
    estimatedTime?: NativeDate | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    items: any[];
    subtotal: number;
    tax: number;
    deliveryFee: number;
    totalAmount: number;
    specialNotes: string;
    paymentMethod: "cash" | "card" | "online";
    paymentStatus: "pending" | "completed" | "failed";
    status: "pending" | "confirmed" | "preparing" | "ready" | "delivered";
    statusHistory: mongoose.Types.DocumentArray<{
        status?: string | null;
        timestamp?: NativeDate | null;
        by?: string | null;
        note?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        status?: string | null;
        timestamp?: NativeDate | null;
        by?: string | null;
        note?: string | null;
    }, {}, {}> & {
        status?: string | null;
        timestamp?: NativeDate | null;
        by?: string | null;
        note?: string | null;
    }>;
    estimatedTime?: NativeDate | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default Order;
//# sourceMappingURL=order.model.d.ts.map