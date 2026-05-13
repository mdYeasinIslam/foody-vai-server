"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const addressSchema = new mongoose_1.Schema({
    districtId: {
        type: String,
        required: true,
        trim: true,
    },
    districtName: {
        type: String,
        trim: true,
    },
    areaId: {
        type: String,
        required: true,
        trim: true,
    },
    areaName: {
        type: String,
        trim: true
    },
    contactName: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        minlength: [10, 'Phone number should be a valid Bangladeshi phone number'],
        trim: true
    },
    addressName: {
        type: String,
        required: true,
        enum: ["office", "home", "other"],
    },
    address: {
        type: String,
        required: true,
    },
});
const AddressModel = (0, mongoose_1.model)("Address", addressSchema);
exports.default = AddressModel;
//# sourceMappingURL=address.model.js.map