"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressRoute = void 0;
const express_1 = __importDefault(require("express"));
const address_model_1 = __importDefault(require("./address.model"));
const zod_1 = __importDefault(require("zod"));
exports.addressRoute = express_1.default.Router();
const AddressZod = zod_1.default.object({
    districtId: zod_1.default.string(),
    // districtName: z.string().nullable(),
    areaId: zod_1.default.string(),
    // areaName: z.string().nullable(),
    contactName: zod_1.default.string(),
    phone: zod_1.default.string(),
    addressName: zod_1.default.string(),
    address: zod_1.default.string(),
});
exports.addressRoute.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = yield AddressZod.parseAsync(req.body);
    const address = yield address_model_1.default.create(body);
    console.log(address);
    res.status(201).json({
        success: true,
        message: "Address is added successfully",
        data: address,
    });
}));
exports.addressRoute.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const address = yield address_model_1.default.find();
        res.status(201).json({
            success: true,
            message: "Address is fetched successfully",
            data: address,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
        });
    }
}));
// export const foodRoute = express.Router();
// foodRoute.post("/add-food", async (req: Request, res: Response) => {
//   //approach ----1
//   // const breakFast = new FoodModel({
//   //     name: 'Ruti',
//   //     category: "Karbo-Hydred",
//   //     isAvailable: true,
//   //     taste:"Mildly nutty and slightly sweet, with a wheat flavor"
//   // })
//   // await breakFast.save()
//   // approach---2
//   const body = req.body;
//   const foods = await FoodModel.create(body);
//   res.status(201).json({
//     success: true,
//     message: "Breakfast food is added",
//     foods: foods,
//   });
// });
// foodRoute.get("/", async (req, res) => {
//   const foods = await FoodModel.find();
//   res.status(201).json({
//     success: true,
//     message: "Breakfast food is added",
//     data: foods,
//   });
// });
// const app = express();
// app.use(express.json());
// app.use("/foods", foodRoute);
// app.use("/users", userRouter);
// const notePadSchema = new Schema({
//   title: String,
//   content: String,
// });
// const NotePad = model("NotePad", notePadSchema);
// app.post("/create-note", async (req, res) => {
//   const myNote = new NotePad({
//     title: "Mongoose Practice",
//     content: "I am learinng mongoose for the first time",
//   });
//   await myNote.save();
//   res.status(201).json({
//     success: true,
//     message: "Note is created Succesfully",
//     data: myNote,
//   });
// });
//# sourceMappingURL=address.controller.js.map