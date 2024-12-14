import { Request, Response } from 'express';
import foodModal from '../models/foodModels';
import orderModel from '../models/orderModel';

interface Food {
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
  foodTags?: string[];
  catgeory?: string;
  code?: string;
  isAvailabe?: boolean;
  resturnat: string;
  rating?: number;
}

interface CartItem {
  price: number;
}

interface Order {
  foods: CartItem[];
  payment: number;
  buyer: string;
}

const createFoodController = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      resturnat,
      rating,
    }: Food = req.body;

    if (!title || !description || !price || !resturnat) {
      res.status(500).send({
        success: false,
        message: "Please Provide all fields",
      });
      return;
    }
    const newFood = new foodModal({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      resturnat,
      rating,
    });

    await newFood.save();
    res.status(201).send({
      success: true,
      message: "New Food Item Created",
      newFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create food api",
      error,
    });
  }
};

const getAllFoodsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const foods = await foodModal.find({});
    if (!foods) {
      res.status(404).send({
        success: false,
        message: "no food items was found",
      });
      return;
    }
    res.status(200).send({
      success: true,
      totalFoods: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erro In Get ALL Foods API",
      error,
    });
  }
};

const getSingleFoodController = async (req: Request, res: Response): Promise<void> => {
  try {
    const foodId: string = req.params.id;
    if (!foodId) {
      res.status(404).send({
        success: false,
        message: "please provide id",
      });
      return;
    }
    const food = await foodModal.findById(foodId);
    if (!food) {
      res.status(404).send({
        success: false,
        message: "No Food Found with this id",
      });
      return;
    }
    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In get Single Food API",
      error,
    });
  }
};

const getFoodByResturantController = async (req: Request, res: Response): Promise<void> => {
  try {
    const resturantId: string = req.params.id;
    if (!resturantId) {
      res.status(404).send({
        success: false,
        message: "please provide id",
      });
      return;
    }
    const food = await foodModal.find({ resturnat: resturantId });
    if (!food) {
      res.status(404).send({
        success: false,
        message: "No Food Found with this id",
      });
      return;
    }
    res.status(200).send({
      success: true,
      message: "food base on restaurant",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In get Single Food API",
      error,
    });
  }
};

const updateFoodController = async (req: Request, res: Response): Promise<void> => {
  try {
    const foodID: string = req.params.id;
    if (!foodID) {
      res.status(404).send({
        success: false,
        message: "no food id was found",
      });
      return;
    }
    const food = await foodModal.findById(foodID);
    if (!food) {
      res.status(404).send({
        success: false,
        message: "No Food Found",
      });
      return;
    }
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      resturnat,
      rating,
    }: Food = req.body;
    const updatedFood = await foodModal.findByIdAndUpdate(
      foodID,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        catgeory,
        code,
        isAvailabe,
        resturnat,
        rating,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Food Item Was Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Update Food API",
      error,
    });
  }
};

const deleteFoodController = async (req: Request, res: Response): Promise<void> => {
  try {
    const foodId: string = req.params.id;
    if (!foodId) {
      res.status(404).send({
        success: false,
        message: "provide food id",
      });
      return;
    }
    const food = await foodModal.findById(foodId);
    if (!food) {
      res.status(404).send({
        success: false,
        message: "No Food Found with id",
      });
      return;
    }
    await foodModal.findByIdAndDelete(foodId);
    res.status(200).send({
      success: true,
      message: "Food Item Deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Delete Food API",
      error,
    });
  }
};

const placeOrderController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cart }: { cart: CartItem[] } = req.body;
    if (!cart) {
      res.status(500).send({
        success: false,
        message: "please food cart or payment method",
      });
      return;
    }
    let total: number = 0;
    cart.map((i: CartItem) => {
      total += i.price;
    });

    const newOrder = new orderModel({
      foods: cart,
      payment: total,
      buyer: req.body.id,
    });
    await newOrder.save();
    res.status(201).send({
      success: true,
      message: "Order Placed successfully",
      newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Place Order API",
      error,
    });
  }
};

const orderStatusController = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderId: string = req.params.id;
    if (!orderId) {
      res.status(404).send({
        success: false,
        message: "Please Provide valid order id",
      });
      return;
    }
    const { status }: { status: string } = req.body;
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Order Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Order Status API",
      error,
    });
  }
};

export {
  createFoodController,
  getAllFoodsController,
  getSingleFoodController,
  getFoodByResturantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
};