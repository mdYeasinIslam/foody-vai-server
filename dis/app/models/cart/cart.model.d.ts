import { Schema } from "mongoose";
declare const CartModel: import("mongoose").Model<{
    name: string;
    price: {
        weight: number;
        price: number;
        originalPrice: number;
        weightName: string;
        currency: string;
    };
    category: string;
    img: string;
    productId: string;
    quantity: number;
    description?: string | null;
    subCategory?: string | null;
} & import("mongoose").DefaultTimestampProps, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    name: string;
    price: {
        weight: number;
        price: number;
        originalPrice: number;
        weightName: string;
        currency: string;
    };
    category: string;
    img: string;
    productId: string;
    quantity: number;
    description?: string | null;
    subCategory?: string | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
    versionKey: false;
}> & Omit<{
    name: string;
    price: {
        weight: number;
        price: number;
        originalPrice: number;
        weightName: string;
        currency: string;
    };
    category: string;
    img: string;
    productId: string;
    quantity: number;
    description?: string | null;
    subCategory?: string | null;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
}, "id"> & {
    id: string;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    versionKey: false;
}, {
    name: string;
    price: {
        weight: number;
        price: number;
        originalPrice: number;
        weightName: string;
        currency: string;
    };
    category: string;
    img: string;
    productId: string;
    quantity: number;
    description?: string | null;
    subCategory?: string | null;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    name: string;
    price: {
        weight: number;
        price: number;
        originalPrice: number;
        weightName: string;
        currency: string;
    };
    category: string;
    img: string;
    productId: string;
    quantity: number;
    description?: string | null;
    subCategory?: string | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, Omit<import("mongoose").DefaultSchemaOptions, "timestamps" | "versionKey"> & {
    timestamps: true;
    versionKey: false;
}> & Omit<{
    name: string;
    price: {
        weight: number;
        price: number;
        originalPrice: number;
        weightName: string;
        currency: string;
    };
    category: string;
    img: string;
    productId: string;
    quantity: number;
    description?: string | null;
    subCategory?: string | null;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
}, "id"> & {
    id: string;
}, unknown, {
    name: string;
    price: {
        weight: number;
        price: number;
        originalPrice: number;
        weightName: string;
        currency: string;
    };
    category: string;
    img: string;
    productId: string;
    quantity: number;
    description?: string | null;
    subCategory?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>, {
    name: string;
    price: {
        weight: number;
        price: number;
        originalPrice: number;
        weightName: string;
        currency: string;
    };
    category: string;
    img: string;
    productId: string;
    quantity: number;
    description?: string | null;
    subCategory?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export default CartModel;
//# sourceMappingURL=cart.model.d.ts.map