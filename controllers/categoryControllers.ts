import { Request, Response } from 'express';
import categoryModel from '../models/categoryModel';

interface CreateCatRequest extends Request {
  body: {
    title: string;
    imageUrl?: string;
  };
}

interface UpdateCatRequest extends Request {
  params: {
    id: string;
  };
  body: {
    title?: string;
    imageUrl?: string;
  };
}

// CREATE CAT
const createCatController = async (req: CreateCatRequest, res: Response): Promise<void> => {
  try {
    const { title, imageUrl } = req.body;
    if (!title) {
      res.status(500).send({
        success: false,
        message: "please provide category title or image",
      });
      return;
    }
    const newCategory = new categoryModel({ title, imageUrl });
    await newCategory.save();
    res.status(201).send({
      success: true,
      message: "category created",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Create Cat API",
      error,
    });
  }
};

// GET ALL CAT
const getAllCatController = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await categoryModel.find({});
    if (!categories) {
      res.status(404).send({
        success: false,
        message: "No Categories found",
      });
      return;
    }
    res.status(200).send({
      success: true,
      totalCat: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get All Category API",
      error,
    });
  }
};

// UPDATE CATE
const updateCatController = async (req: UpdateCatRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true }
    );
    if (!updatedCategory) {
      res.status(500).send({
        success: false,
        message: "No Category Found",
      });
      return;
    }
    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in update cat api",
      error,
    });
  }
};

// DELETE CAT
const deleteCatController = async (req: UpdateCatRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(500).send({
        success: false,
        message: "Please provide Category ID",
      });
      return;
    }
    const category = await categoryModel.findById(id);
    if (!category) {
      res.status(500).send({
        success: false,
        message: "No Category Found With this id",
      });
      return;
    }
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "category Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in Delete Cat API",
      error,
    });
  }
};

export {
  createCatController,
  getAllCatController,
  updateCatController,
  deleteCatController,
};