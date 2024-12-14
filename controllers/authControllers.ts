import { Request, Response } from 'express';
import userModel from '../models/userModel';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

interface RegisterRequestBody {
  userName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  answer: string;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

// REGISTER
const registerController = async (req: Request<{}, {}, RegisterRequestBody>, res: Response): Promise<void> => {
  try {
    const { userName, email, password, phone, address, answer } = req.body;
    //validation
    if (!userName || !email || !password || !address || !phone || !answer) {
      res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
      return;
    }
    // check user
    const existing = await userModel.findOne({ email });
    if (existing) {
      res.status(500).send({
        success: false,
        message: "Email Already Registered please Login",
      });
      return;
    }
    //hashing password
    const salt: string = bcrypt.genSaltSync(10);
    const hashedPassword: string = await bcrypt.hash(password, salt);
    //create new user
    const user = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      address,
      phone,
      answer,
    });
    res.status(201).send({
      success: true,
      message: "Successfully Registered",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Register API",
      error,
    });
  }
};

// LOGIN
const loginController = async (req: Request<{}, {}, LoginRequestBody>, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      res.status(500).send({
        success: false,
        message: "Please Provide Email OR Password",
      });
      return;
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(404).send({
        success: false,
        message: "User Not Found",
      });
      return;
    }
    //check user password  | compare password
    const isMatch: boolean = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(500).send({
        success: false,
        message: "Invalid Credentials",
      });
      return;
    }
    // token
    const token: string = JWT.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "7d",
    });
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Login API",
      error,
    });
  }
};

export { registerController, loginController };