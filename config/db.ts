import mongoose from "mongoose";
import colors from "colors";

const connectDb = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log(`Connected To Database ${mongoose.connection.host} `.bgBlue);
  } catch (error: unknown) {
    console.log("DB Error", error);
  }
};

export default connectDb;