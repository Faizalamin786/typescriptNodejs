import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for the Restaurant document
interface IRestaurant extends Document {
  title: string;
  imageUrl?: string;
  foods: string; // Replace 'any' with a more specific type if known
  time?: string;
  pickup?: boolean;
  delivery?: boolean;
  isOpen?: boolean;
  logoUrl?: string;
  rating?: number;
  ratingCount?: string;
  code?: string;
  coords?: {
    id?: string;
    latitude?: number;
    latitudeDelta?: number;
    longitude?: number;
    longitudeDelta?: number;
    address?: string;
    title?: string;
  };
}

// Create the schema
const restaurantSchema: Schema<IRestaurant> = new Schema(
  {
    title: {
      type: String,
      required: [true, "Restaurant title is required"],
    },
    imageUrl: {
      type: String,
    },
    foods: {
      type: String,
    },
    time: {
      type: String,
    },
    pickup: {
      type: Boolean,
      default: true,
    },
    delivery: {
      type: Boolean,
      default: true,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    logoUrl: {
      type: String,
    },
    rating: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: String,
    },
    code: {
      type: String,
    },
    coords: {
      id: { type: String },
      latitude: { type: Number },
      latitudeDelta: { type: Number },
      longitude: { type: Number },
      longitudeDelta: { type: Number },
      address: { type: String },
      title: { type: String },
    },
  },
  { timestamps: true }
);

// Create the model
const Restaurant = mongoose.model<IRestaurant>('Restaurant', restaurantSchema);

export default Restaurant;
