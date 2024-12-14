import { Request, Response } from 'express';
import resturantModel from '../models/resturantModel';

interface CreateResturantRequestBody {
  title: string;
  imageUrl?: string;
  foods?: string[];
  time?: string;
  pickup?: boolean;
  delivery?: boolean;
  isOpen?: boolean;
  logoUrl?: string;
  rating?: number;
  ratingCount?: number;
  code?: string;
  coords: string;
}

const createResturantController = async (req: Request<{}, {}, CreateResturantRequestBody>, res: Response): Promise<void> => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;

    if (!title || !coords) {
      res.status(500).send({
        success: false,
        message: "please provide title and address",
      });
      return;
    }

    const newResturant = new resturantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    await newResturant.save();

    res.status(201).send({
      success: true,
      message: "New Resturant Created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Create Resturant api",
      error,
    });
  }
};

const getAllResturantController = async (req: Request, res: Response): Promise<void> => {
  try {
    const resturants = await resturantModel.find({});
    if (!resturants) {
      res.status(404).send({
        success: false,
        message: "No Resturant Availible",
      });
      return;
    }
    res.status(200).send({
      success: true,
      totalCount: resturants.length,
      resturants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get ALL Resturat API",
      error,
    });
  }
};

const getResturantByIdController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const resturantId: string = req.params.id;
    if (!resturantId) {
      res.status(404).send({
        success: false,
        message: "Please Provide Resturnat ID",
      });
      return;
    }

    const resturant = await resturantModel.findById(resturantId);
    if (!resturant) {
      res.status(404).send({
        success: false,
        message: "no resturant found",
      });
      return;
    }
    res.status(200).send({
      success: true,
      resturant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get Resturarnt by id api",
      error,
    });
  }
};

const deleteResturantController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const resturantId: string = req.params.id;
    if (!resturantId) {
      res.status(404).send({
        success: false,
        message: "No Resturant Found OR Provide Resturant ID",
      });
      return;
    }
    await resturantModel.findByIdAndDelete(resturantId);
    res.status(200).send({
      success: true,
      message: "Resturant Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror in delete resturant api",
      error,
    });
  }
};

export {
  createResturantController,
  getAllResturantController,
  getResturantByIdController,
  deleteResturantController,
};