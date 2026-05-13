import { Schema } from "mongoose";
declare const AddressModel: import("mongoose").Model<{
    districtId: string;
    areaId: string;
    contactName: string;
    phone: string;
    addressName: "office" | "home" | "other";
    address: string;
    districtName?: string | null;
    areaName?: string | null;
}, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    districtId: string;
    areaId: string;
    contactName: string;
    phone: string;
    addressName: "office" | "home" | "other";
    address: string;
    districtName?: string | null;
    areaName?: string | null;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    districtId: string;
    areaId: string;
    contactName: string;
    phone: string;
    addressName: "office" | "home" | "other";
    address: string;
    districtName?: string | null;
    areaName?: string | null;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    districtId: string;
    areaId: string;
    contactName: string;
    phone: string;
    addressName: "office" | "home" | "other";
    address: string;
    districtName?: string | null;
    areaName?: string | null;
}, import("mongoose").Document<unknown, {}, {
    districtId: string;
    areaId: string;
    contactName: string;
    phone: string;
    addressName: "office" | "home" | "other";
    address: string;
    districtName?: string | null;
    areaName?: string | null;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    districtId: string;
    areaId: string;
    contactName: string;
    phone: string;
    addressName: "office" | "home" | "other";
    address: string;
    districtName?: string | null;
    areaName?: string | null;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    districtId: string;
    areaId: string;
    contactName: string;
    phone: string;
    addressName: "office" | "home" | "other";
    address: string;
    districtName?: string | null;
    areaName?: string | null;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>, {
    districtId: string;
    areaId: string;
    contactName: string;
    phone: string;
    addressName: "office" | "home" | "other";
    address: string;
    districtName?: string | null;
    areaName?: string | null;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export default AddressModel;
//# sourceMappingURL=address.model.d.ts.map