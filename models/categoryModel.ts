import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for the Category document
//An interface (ICategory) that extends Document to represent the shape of a Category document.

interface ICategory extends Document {
  title: string;
  imageUrl: string;
}

// Create the schema
const categorySchema: Schema<ICategory> = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Category title is required'],
    },
    imageUrl: {
      type: String,
      default:
        'https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png',
    },
  },
  { timestamps: true }
);

// Create the model
const Category = mongoose.model<ICategory>('Category', categorySchema);

export default Category;
