import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for the Order document
interface IOrder extends Document {
  foods: mongoose.Types.ObjectId[];
  payment: Record<string, any>; // You can replace 'any' with a more specific type if you have the structure for payment.
  buyer: mongoose.Types.ObjectId;
  status: 'preparing' | 'prepare' | 'on the way' | 'delivered';
}

// Create the schema
const ordersSchema: Schema<IOrder> = new Schema(
  {
    foods: [{ type: mongoose.Schema.Types.ObjectId, ref: "Foods" }],
    payment: {
      type: Object,
      default: {},
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["preparing", "prepare", "on the way", "delivered"],
      default: "preparing",
    },
  },
  { timestamps: true }
);

// Create the model
const Order = mongoose.model<IOrder>('Order', ordersSchema);

export default Order;
