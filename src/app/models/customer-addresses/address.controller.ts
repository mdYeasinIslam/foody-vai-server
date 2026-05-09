import express, { Request, Response } from "express";
import AddressModel from "./address.model";
import z from "zod";
export const addressRoute = express.Router();

const addressZod = z.object({
  districtId: z.string(),
  districtName: z.string().optional(),
  areaId: z.string(),
  areaName: z.string().optional(),
  contactName: z.string(),
  phone: z.string(),
  addressName: z.string(),
});

addressRoute.post("/customer-address", async (req: Request, res: Response) => {
  const body =addressZod.parseAsync(req.body);
  const address = await AddressModel.create(body);
  console.log(address);
  res.status(201).json({
    success: true,
    message: "Address is added successfully",
    data: address,
  });
});
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
