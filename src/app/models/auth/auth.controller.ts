import { Request, Response, Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AuthModel from "./auth.model";

//auth router
export const authRoute = Router();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

authRoute.post("/create-user", async (req: Request, res: Response) => {
  try {
    const { userName, email, password, role } = req.body;
    const existingUser = await AuthModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    // hash password — never store plain text
    const hashedPassword = await bcrypt.hash(password, 12);

    // create user
    const newUser = await AuthModel.create({
      userName,
      email,
      password: hashedPassword,
      role: role ?? "user",
    });

    //generate token
    // const token = jwt.sign(
    //   { id: newUser._id, email: newUser.email, role: newUser.role },
    //   JWT_SECRET,
    //   { expiresIn: JWT_EXPIRES_IN },
    // );
    const token = "hi";
    // return user without password
    const { password: _, ...userWithoutPassword } = newUser.toObject();

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
});

authRoute.post("/signIn", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    //find user by email — select password explicitly (excluded by default below)
    const user = await AuthModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email",
      });
    }

    //compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // generate token
    // const token = jwt.sign(
    //   { id: user._id, email: user.email, role: user.role },
    //   JWT_SECRET,
    //   { expiresIn: JWT_EXPIRES_IN },
    // );
    const token = "hi";
    //return user without password
    const { password: _, ...userWithoutPassword } = user.toObject();

    return res.status(200).json({
      success: true,
      message: "Signed in successfully",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
});
