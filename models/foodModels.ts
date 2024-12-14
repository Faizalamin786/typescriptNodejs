import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for the Food document
interface IFood extends Document {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  foodTags?: string;
  category?: string;
  code?: string;
  isAvailable: boolean;
  restaurant: mongoose.Types.ObjectId;
  rating: number;
  ratingCount?: string;
}

// Create the schema
const foodSchema: Schema<IFood> = new Schema(
  {
    title: {
      type: String,
      required: [true, "Food Title is required"],
    },
    description: {
      type: String,
      required: [true, "Food description is required"],
    },
    price: {
      type: Number,
      required: [true, "Food price is required"],
    },
    imageUrl: {
      type: String,
      default:
        "https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png",
    },
    foodTags: {
      type: String,
    },
    category: {
      type: String,
    },
    code: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: String,
    },
  },
  { timestamps: true }
);

// Create the model
const Food = mongoose.model<IFood>('Food', foodSchema);

export default Food;
