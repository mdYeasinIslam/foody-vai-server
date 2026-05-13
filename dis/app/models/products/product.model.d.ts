import { Schema } from "mongoose";
declare const ProductModel: import("mongoose").Model<{
    name: string;
    prices: import("mongoose").Types.DocumentArray<{
        weight: number;
        price: number;
        originalPrice: number;
        weightName: string;
        currency: string;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
        weight: number;
        price: number;
        originalPrice: number;
        weightName: string;
        currency: string;
    }, {}, {}> & {
        weight: number;
        price: number;
        originalPrice: number;
        weightName: string;
        currency: string;
    }>;
    category: string;
    img: string;
    description?: string | null;
    subCategory?: string | null;
} & import("mongoose").DefaultTimestampProps, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    name: string;
    prices: import("mongoose").Types.DocumentArray<{
        weight: number;
        price: number;
        originalPrice: number;
        weightName: string;
        currency: string;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
        weight: number;
        price: number;
        originalPrice: number;
        weightName: string;
        currency: string;
    }, {}, {}> & {
        weight: number;
        price: number;
        originalPrice: number;
        weightName: string;
        currency: string;
    }>;
    category: string;
    img: string;
    description?: string | null;
    subCategory?: string | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
    versionKey: false;
}> & Omit<{
    name: string;
    prices: import("mongoose").Types.DocumentArray<{
        weight: number;
        price: number;
        originalPrice: number;
        weightName: string;
        currency: string;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
        weight: number;
        price: number;
        originalPrice: number;
        weightName: string;
        currency: string;
    }, {}, {}> & {
        weight: number;
        price: number;
        originalPrice: number;
        weightName: string;
        currency: string;
    }>;
    category: string;
    img: string;
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
    prices: import("mongoose").Types.DocumentArray<{
        weight: number;
        price: number;
        originalPrice: number;
        weightName: string;
        currency: string;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
        weight: number;
        price: number;
        originalPrice: number;
        weightName: string;
        currency: string;
    }, {}, {}> & {
        weight: number;
        price: number;
        originalPrice: number;
        weightName: string;
        currency: string;
    }>;
    category: string;
    img: string;
    description?: string | null;
    subCategory?: string | null;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    name: string;
    prices: import("mongoose").Types.DocumentArray<{
        weight: number;
        price: number;
        originalPrice: number;
        weightName: string;
        currency: string;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
        weight: number;
        price: number;
        originalPrice: number;
        weightName: string;
        currency: string;
    }, {}, {}> & {
        weight: number;
        price: number;
        originalPrice: number;
        weightName: string;
        currency: string;
    }>;
    category: string;
    img: string;
    description?: string | null;
    subCategory?: string | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, Omit<import("mongoose").DefaultSchemaOptions, "timestamps" | "versionKey"> & {
    timestamps: true;
    versionKey: false;
}> & Omit<{
    name: string;
    prices: import("mongoose").Types.DocumentArray<{
        weight: number;
        price: number;
        originalPrice: number;
        weightName: string;
        currency: string;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
        weight: number;
        price: number;
        originalPrice: number;
        weightName: string;
        currency: string;
    }, {}, {}> & {
        weight: number;
        price: number;
        originalPrice: number;
        weightName: string;
        currency: string;
    }>;
    category: string;
    img: string;
    description?: string | null;
    subCategory?: string | null;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
}, "id"> & {
    id: string;
}, unknown, {
    name: string;
    prices: import("mongoose").Types.DocumentArray<{
        weight: number;
        price: number;
        originalPrice: number;
        weightName: string;
        currency: string;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
        weight: number;
        price: number;
        originalPrice: number;
        weightName: string;
        currency: string;
    }, {}, {}> & {
        weight: number;
        price: number;
        originalPrice: number;
        weightName: string;
        currency: string;
    }>;
    category: string;
    img: string;
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
    prices: import("mongoose").Types.DocumentArray<{
        weight: number;
        price: number;
        originalPrice: number;
        weightName: string;
        currency: string;
    }, import("mongoose").Types.Subdocument<import("bson").ObjectId, unknown, {
        weight: number;
        price: number;
        originalPrice: number;
        weightName: string;
        currency: string;
    }, {}, {}> & {
        weight: number;
        price: number;
        originalPrice: number;
        weightName: string;
        currency: string;
    }>;
    category: string;
    img: string;
    description?: string | null;
    subCategory?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export default ProductModel;
//# sourceMappingURL=product.model.d.ts.map