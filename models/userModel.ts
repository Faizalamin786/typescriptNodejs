import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for the User document
interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  address?: string[];
  phone: string;
  usertype: 'clinet' | 'admin' | 'vendor' | 'driver';
  profile?: string;
  answer: string;
}

// Schema definition
const userSchema: Schema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "user name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    address: {
      type: [String],
    },
    phone: {
      type: String,
      required: [true, "phone number is required"],
    },
    usertype: {
      type: String,
      required: [true, "user type is required"],
      default: "clinet",
      enum: ["clinet", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png",
    },
    answer: {
      type: String,
      required: [true, "answer is required"],
    },
  },
  { timestamps: true }
);

// Export the model
const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;
